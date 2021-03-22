import "./Design.css";

import Header from  "../../layout/header/Header";
import Gallery from "../../views/design/gallery/Gallery";
import CustomizerUi from "../../views/design/customizer-ui/CustomizerUi";

function Design() {
    return (
        <div className="design-container">
            <Header headerDesign="header-design" />
            <Gallery />
            <CustomizerUi />
        </div>
    );
}

export default Design;
