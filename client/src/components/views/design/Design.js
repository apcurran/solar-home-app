import "./Design.css";

import Header from  "../../layout/header/Header";
import Gallery from "../../views/design/gallery/Gallery";
import CustomizerUi from "../../views/design/customizer-ui/CustomizerUi";

function Design() {
    return (
        <>
            <Header headerDesign="header-design" />
            <div className="design">
                <Gallery />
                <CustomizerUi />
            </div>
        </>
    );
}

export default Design;
