import { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import "./CustomizerUi.css";

function CustomizerUi({ handleImgChange }) {
    const [solarDevice, setSolarDevice] = useState("");
    const [isBatteryPack, setIsBatteryPack] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [usStateAbbrev, setUsStateAbbrev] = useState("");
    const [zip, setZip] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [homeSize, setHomeSize] = useState(0);

    const [cartItems, setCartItems] = useState([]);
    const [grandTotal, setGrandTotal] = useState(0);

    // Stripe State
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    // Stripe
    const stripe = useStripe();
    const elements = useElements();
    const cardElementOptions = {
        style: {
            base: {
                fontSize: "18px",
                color: "#3730a3",
                "::placeholder": {
                    color: "#818cf8"
                }
            }
        },
        hidePostalCode: true
    };

    useEffect(() => {
        handleImgChange(solarDevice);
    }, [solarDevice]);

    useEffect(() => {
        const myItems = createItemsArr();
        const myItemsGrandTotal = calcGrandTotal(myItems);
        // Set comp-level state
        setCartItems(myItems);
        setGrandTotal(myItemsGrandTotal);

    }, [solarDevice, isBatteryPack, homeSize]);

    function phoneHandler(event) {
        const inputVal = event.target.value;
        const validatedInputval = inputVal.replace(/[^0-9]/g, "");
        
        setPhone(validatedInputval);
    }

    function calcGrandTotal(itemsArr) {
        return itemsArr.reduce((grandTotal, currItem) => grandTotal + currItem.total, 0);
    }

    function createItemsArr() {
        // Pull items from local state
        let itemsArr = [];

        const mySolarDeviceUnitAmt = solarDevice === "solarTiles" ? 10000 : 2500; // Re-calced server-side to prevent tampering
        const mySolarDeviceQty = Math.round(homeSize / 500); // Calc qty from homeSize div by 500, rounded up
        const mySolarDevice = {
            name: solarDevice,
            qty: mySolarDeviceQty,
            total: mySolarDeviceUnitAmt * mySolarDeviceQty
        };
        
        itemsArr.push(mySolarDevice);
        
        if (isBatteryPack) {
            const myBatteryPack = {
                name: "batteryPack",
                qty: 1,
                total: 6000
            };

            itemsArr.push(myBatteryPack);
        }

        return itemsArr;
    }

    async function createOrder(paymentId, paymentAmt) {
        try {
            const response = await fetch("/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    paymentId,
                    firstName,
                    lastName,
                    email,
                    phone,
                    street: streetAddress,
                    state: usStateAbbrev,
                    zip,
                    selectedSolarDevice: solarDevice,
                    accessoryBatteryPack: isBatteryPack,
                    homeSqFt: homeSize,
                    orderTotal: paymentAmt
                })
            });

            // TODO: Create err if !response.ok
            const data = await response.json();

        } catch (err) {
            setErrorMessage(err.message);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setIsProcessing(true);
        // Reset any previous messages
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const response = await fetch("/api/orders/create-payment-intent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    itemsArr: cartItems // Pulled from comp-level state
                })
            });

            const { clientSecret } = await response.json();
            const payload = await stripe.confirmCardPayment(clientSecret, {
                receipt_email: email,
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            });
            const paymentId = payload.paymentIntent.id;
            const paymentAmt = payload.paymentIntent.amount;

            if (payload.error) {
                setErrorMessage(`Payment failed ${payload.error.message}`);
                setIsProcessing(false);
              } else {
                setSuccessMessage("Success! You should receive an email confirmation shortly.");
                setIsProcessing(false);
                createOrder(paymentId, paymentAmt);
            }

        } catch (err) {
            setErrorMessage(err.message);
        }
    }

    function handleStripeCardChange(event) {
        setErrorMessage(event.error ? event.error.message : "");
    }

    return (
        <main onSubmit={handleSubmit} className="design__customizer">
            <form className="design__customizer__form">
                <h2 className="design__customizer__form__title">Pick Your Style</h2>
                <div className="radio-btn-controls-container">
                    <label htmlFor="tiles" className="design__customizer__form__label radio-label">
                        <input value="solarTiles" onChange={(event) => setSolarDevice(event.target.value)} name="selected-solar-device" id="tiles" type="radio" className="design__customizer__form__radio-btn radio-btn sr-only" required/>
                        <span className="radio-btn--fake"></span>
                        Solar Tiles
                    </label>
                    <label htmlFor="panels" className="design__customizer__form__label radio-label">
                        <input value="solarPanels" onChange={(event) => setSolarDevice(event.target.value)} name="selected-solar-device" id="panels" type="radio" className="design__customizer__form__radio-btn radio-btn sr-only" required/>
                        <span className="radio-btn--fake"></span>
                        Solar Panels
                    </label>
                </div>
                <h2 className="design__customizer__form__title title--note-included">Add Battery Pack</h2>
                <span className="design__customizer__form__title-note">(Optional)</span>
                <div className="design__customizer__form__controls-container">
                    <label htmlFor="battery" className="design__customizer__form__label battery-checkbox-label">
                        <input onChange={(event) => setIsBatteryPack(event.target.checked)} type="checkbox" name="battery" id="battery" className="design__customizer__form__input battery-checkbox sr-only"/>
                        <span className="battery-checkbox--fake"></span>
                        Include Battery Pack?
                    </label>
                </div>
                <h2 className="design__customizer__form__title">Personal Info</h2>
                <div className="design__customizer__form__controls-container">
                    <label htmlFor="first-name" className="design__customizer__form__label">First Name</label>
                    <input value={firstName} onChange={(event) => setFirstName(event.target.value)} type="text" name="first-name" id="first-name" className="design__customizer__form__input" required/>
                </div>
                <div className="design__customizer__form__controls-container">
                    <label htmlFor="last-name" className="design__customizer__form__label">Last Name</label>
                    <input value={lastName} onChange={(event) => setLastName(event.target.value)} type="text" name="last-name" id="last-name" className="design__customizer__form__input" required/>
                </div>
                <div className="design__customizer__form__controls-container">
                    <label htmlFor="street" className="design__customizer__form__label">Street Address</label>
                    <input value={streetAddress} onChange={(event) => setStreetAddress(event.target.value)} type="text" name="street" id="street" className="design__customizer__form__input" required/>
                </div>
                <div className="design__customizer__form__controls-container">
                    <label htmlFor="state" className="design__customizer__form__label">State <span className="design__customizer__form__label-note">(2 Characters)</span></label>
                    <input value={usStateAbbrev} onChange={(event) => setUsStateAbbrev(event.target.value)} type="text" name="state" id="state" className="design__customizer__form__input col--half-width" minLength="2" maxLength="2" required/>
                </div>
                <div className="design__customizer__form__controls-container">
                    <label htmlFor="zip" className="design__customizer__form__label">Zip Code <span className="design__customizer__form__label-note">(5 Characters)</span></label>
                    <input value={zip} onChange={(event) => setZip(event.target.value)} type="number" name="zip" id="zip" className="design__customizer__form__input col--half-width" minLength="5" maxLength="5" required/>
                </div>
                <div className="design__customizer__form__controls-container">
                    <label htmlFor="email" className="design__customizer__form__label">Email</label>
                    <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" name="email" id="email" className="design__customizer__form__input" required/>
                </div>
                <div className="design__customizer__form__controls-container">
                    <label htmlFor="phone" className="design__customizer__form__label">Phone Number</label>
                    <input onChange={phoneHandler} type="tel" name="phone" id="phone" className="design__customizer__form__input" required/>
                </div>
                <div className="design__customizer__form__controls-container">
                    <label htmlFor="home-size" className="design__customizer__form__label">Home Size <span className="design__customizer__form__label-note">(sq. ft.)</span></label>
                    <input value={homeSize} onChange={(event) => setHomeSize(event.target.value)} type="number" name="home-size" id="home-size" className="design__customizer__form__input col--half-width" required/>
                </div>
                <h2 className="design__customizer__form__title design__customizer__form__title--total">Total:<span className="grand-total">${grandTotal}</span></h2>
                <h2 className="design__customizer__form__title">Payment Details</h2>
                <CardElement options={cardElementOptions} onChange={handleStripeCardChange} />
                <button disabled={isProcessing || successMessage} className="design__customizer__form__submit-btn" type="submit">{isProcessing ? "Processing" : "Pay Now"}</button>
            </form>
            {successMessage ? <p className="message message--success">{successMessage}</p> : null}
            {errorMessage ? <p className="message message--error">{errorMessage}</p> : null}
        </main>
    );
}

export default CustomizerUi;
