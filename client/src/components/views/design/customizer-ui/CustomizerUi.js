import "./CustomizerUi.css";

function CustomizerUi() {
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
            </form>
        </main>
    );
}

export default CustomizerUi;
