import "./CustomizerUi.css";

function CustomizerUi() {
    return (
        <main className="design__customizer">
            <form className="design__customizer__form">
                <h1 className="design__customizer__form__title">Pick Your Style</h1>
                <div className="design__customizer__form__controls-container">
                    <label htmlFor="tiles" className="design__design__customizer__form__label radio-label">
                        <input name="selected-solar-device" id="tiles" type="radio" className="design__design__customizer__form__radio-btn radio-btn"/>
                        <span className="radio-btn--fake"></span>
                        Solar Tiles
                    </label>
                    <label htmlFor="panels" className="design__design__customizer__form__label radio-label">
                        <input name="selected-solar-device" id="panels" type="radio" className="design__design__customizer__form__radio-btn radio-btn"/>
                        <span className="radio-btn--fake"></span>
                        Solar Panels
                    </label>
                </div>
            </form>
        </main>
    );
}

export default CustomizerUi;
