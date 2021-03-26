import { useState } from "react";
import "./Design.css";

import Header from  "../../layout/header/Header";
import Gallery from "../../views/design/gallery/Gallery";
import CustomizerUi from "../../views/design/customizer-ui/CustomizerUi";

function Design() {
    const tileImg = "https://res.cloudinary.com/dev-project/image/upload/f_auto,q_auto/v1616421539/aperture-solar/spanish-tiled-house_mcsada.jpg";
    const panelImg = "https://res.cloudinary.com/dev-project/image/upload/f_auto,q_auto/v1616787652/aperture-solar/solar-panels-two-story_qjff5d.jpg";
    const [solarDeviceImg, setSolarDeviceImg] = useState(tileImg);

    function handleImgChange(solarDevice) {
        if (solarDevice === "panels") {
            setSolarDeviceImg(panelImg);
        } else {
            setSolarDeviceImg(tileImg);
        }
    }

    return (
        <div className="design-container">
            <Header headerDesign="header-design" />
            <Gallery solarDeviceImg={solarDeviceImg} />
            <CustomizerUi handleImgChange={handleImgChange} />
        </div>
    );
}

export default Design;
