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
    const [homeSize, setHomeSize] = useState("");

    // Stripe State
    const [message, setMessage] = useState(""); // Err message or success message
    const [isProcessing, setIsProcessing] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
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

    // useEffect(() => {
    //     const query = new URLSearchParams(window.location.search);

    //     if (query.get("success")) {
    //         setMessage("Order placed! You will receive an email confirmation shortly.");
    //     } else if (query.get("canceled")) {
    //         setMessage("Order canceled. Please continue to shop around and checkout when you're ready.");
    //     }
    // }, []);

    function phoneHandler(event) {
        const inputVal = event.target.value;
        const validatedInputval = inputVal.replace(/[^0-9]/g, "");
        
        setPhone(validatedInputval);
    }

    function createItemsArr() {
        // Pull items from local state
        let itemsArr = [];

        const mySolarDevice = {
            name: solarDevice,
            qty: Math.round(homeSize / 500) // Calc qty from homeSize div by 500, rounded up
        };

        itemsArr.push(mySolarDevice);

        if (isBatteryPack) {
            const myBatteryPack = {
                name: "batteryPack",
                qty: 1
            };

            itemsArr.push(myBatteryPack);
        }

        return itemsArr;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const myItems = createItemsArr();

        try {
            // Make fetch req
            const response = await fetch("/api/orders/create-checkout-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    itemsArr: myItems
                })
            });

            const session = await response.json();
            const result = await stripe.redirectToCheckout({
                sessionId: session.id
            });
            
            if (result.error) {
                setMessage(result.error.message);
            }

            // After a successful payment, make API req to create order on db

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <main onSubmit={handleSubmit} className="design__customizer">
            <form className="design__customizer__form">
                <h1 className="design__customizer__form__title">Pick Your Style</h1>
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
                <h1 className="design__customizer__form__title title--note-included">Add Battery Pack</h1>
                <span className="design__customizer__form__title-note">(Optional)</span>
                <div className="design__customizer__form__controls-container">
                    <label htmlFor="battery" className="design__customizer__form__label battery-checkbox-label">
                        <input onChange={(event) => setIsBatteryPack(event.target.checked)} type="checkbox" name="battery" id="battery" className="design__customizer__form__input battery-checkbox sr-only"/>
                        <span className="battery-checkbox--fake"></span>
                        Include Battery Pack?
                    </label>
                </div>
                <h1 className="design__customizer__form__title">Personal Info</h1>
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
                <h1 className="design__customizer__form__title">Payment Details</h1>
                <CardElement options={cardElementOptions} />
                <button className="design__customizer__form__submit-btn" type="submit">Pay Now</button>
                {/* <div className="design__customizer__form__controls-container">
                    <label htmlFor="card-name" className="design__customizer__form__label">Name on Card</label>
                    <input type="text" name="card-name" id="card-name" className="design__customizer__form__input" required/>
                </div> */}
                {/* <div className="design__customizer__form__controls-container">
                    <label htmlFor="card-number" className="design__customizer__form__label">Card Number</label>
                    <input type="number" name="card-number" id="card-number" className="design__customizer__form__input" required/>
                </div>
                <div className="design__customizer__form__controls-container">
                    <label htmlFor="card-expiration-month" className="design__customizer__form__label">Expiration Month</label>
                    <input type="text" name="card-expiration-month" id="card-expiration-month" className="design__customizer__form__input col--half-width" required/>
                </div>
                <div className="design__customizer__form__controls-container">
                    <label htmlFor="card-expiration-year" className="design__customizer__form__label">Expiration Year</label>
                    <input type="number" name="card-expiration-year" id="card-expiration-year" className="design__customizer__form__input col--half-width" minLength="4" maxLength="4" required/>
                </div>
                <div className="design__customizer__form__controls-container">
                    <label htmlFor="card-expiration-cvv" className="design__customizer__form__label">CVV</label>
                    <input type="number" name="card-expiration-cvv" id="card-expiration-cvv" className="design__customizer__form__input col--half-width" minLength="3" maxLength="3" required/>
                </div>
                <div className="design__customizer__form__controls-container">
                    <label htmlFor="billing-zip" className="design__customizer__form__label">Billing Zip Code</label>
                    <input type="number" name="billing-zip" id="billing-zip" className="design__customizer__form__input col--half-width" minLength="5" maxLength="5" required/>
                </div> */}
            </form>
            {message ? <p>{message}</p> : null}
        </main>
    );
}

export default CustomizerUi;
