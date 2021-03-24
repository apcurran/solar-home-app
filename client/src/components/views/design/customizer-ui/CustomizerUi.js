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
                        <label htmlFor="battery" className="design__customizer__form__label">Number of Battery Packs</label>
                        <input type="number" name="battery" id="battery" className="design__customizer__form__input battery-input"/>
                    </div>
                    <div className="design__customizer__form__controls-container">
                        <button className="design__customizer__form__btn" type="button">Add</button>
                    </div>
                </div>
            </form>
        </main>
    );
}

export default CustomizerUi;
