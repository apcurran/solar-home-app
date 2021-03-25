import { useState } from "react";

import "./CustomizerUi.css";

function CustomizerUi() {
    const [phone, setPhone] = useState("");

    function phoneHandler(event) {
        const inputVal = event.target.value;
        const validatedInputval = inputVal.replace(/[^0-9]/g, "");
        
        setPhone(validatedInputval);
    }

    return (
        <main className="design__customizer">
            <form className="design__customizer__form">
                <h1 className="design__customizer__form__title">Pick Your Style</h1>
                <div className="radio-btn-controls-container">
                    <label htmlFor="tiles" className="design__customizer__form__label radio-label">
                        <input name="selected-solar-device" id="tiles" type="radio" className="design__customizer__form__radio-btn radio-btn"/>
                        <span className="radio-btn--fake"></span>
                        Solar Tiles
                    </label>
                    <label htmlFor="panels" className="design__customizer__form__label radio-label">
                        <input name="selected-solar-device" id="panels" type="radio" className="design__customizer__form__radio-btn radio-btn"/>
                        <span className="radio-btn--fake"></span>
                        Solar Panels
                    </label>
                </div>
                <h1 className="design__customizer__form__title title--note-included">Add Battery Pack</h1>
                <span className="design__customizer__form__title-note">(Optional)</span>
                <div className="design__customizer__form__controls-container-outer-wrapper">
                    <div className="design__customizer__form__controls-container">
                        <label htmlFor="battery" className="design__customizer__form__label">Battery Packs Qty.</label>
                        <input type="number" name="battery" id="battery" className="design__customizer__form__input battery-input" maxLength="1"/>
                    </div>
                    <div className="design__customizer__form__controls-container">
                        <button className="design__customizer__form__btn" type="button">Add</button>
                    </div>
                </div>
                <h1 className="design__customizer__form__title">Personal Info</h1>
                <div className="design__customizer__form__controls-container">
                    <label htmlFor="first-name" className="design__customizer__form__label">First Name</label>
                    <input type="text" name="first-name" id="first-name" className="design__customizer__form__input" required/>
                </div>
                <div className="design__customizer__form__controls-container">
                    <label htmlFor="last-name" className="design__customizer__form__label">Last Name</label>
                    <input type="text" name="last-name" id="last-name" className="design__customizer__form__input" required/>
                </div>
                <div className="design__customizer__form__controls-container">
                    <label htmlFor="street" className="design__customizer__form__label">Street Address</label>
                    <input type="text" name="street" id="street" className="design__customizer__form__input" required/>
                </div>
                <div className="design__customizer__form__controls-container">
                    <label htmlFor="state" className="design__customizer__form__label">State <span className="design__customizer__form__label-note">(2 Characters)</span></label>
                    <input type="text" name="state" id="state" className="design__customizer__form__input col--half-width" minLength="2" maxLength="2" required/>
                </div>
                <div className="design__customizer__form__controls-container">
                    <label htmlFor="zip" className="design__customizer__form__label">Zip Code <span className="design__customizer__form__label-note">(5 Characters)</span></label>
                    <input type="number" name="zip" id="zip" className="design__customizer__form__input col--half-width" minLength="5" maxLength="5" required/>
                </div>
                <div className="design__customizer__form__controls-container">
                    <label htmlFor="email" className="design__customizer__form__label">Email</label>
                    <input type="email" name="email" id="email" className="design__customizer__form__input" required/>
                </div>
                <div className="design__customizer__form__controls-container">
                    <label htmlFor="phone" className="design__customizer__form__label">Phone Number</label>
                    <input onChange={phoneHandler} type="tel" name="phone" id="phone" className="design__customizer__form__input" required/>
                </div>
                <div className="design__customizer__form__controls-container">
                    <label htmlFor="home-size" className="design__customizer__form__label">Home Size <span className="design__customizer__form__label-note">(sq. ft.)</span></label>
                    <input type="number" name="home-size" id="home-size" className="design__customizer__form__input col--half-width" required/>
                </div>
                <h1 className="design__customizer__form__title">Payment Details</h1>
                <div className="design__customizer__form__controls-container">
                    <label htmlFor="card-name" className="design__customizer__form__label">Name on Card</label>
                    <input type="text" name="card-name" id="card-name" className="design__customizer__form__input" required/>
                </div>
                <div className="design__customizer__form__controls-container">
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
                </div>
            </form>
        </main>
    );
}

export default CustomizerUi;
