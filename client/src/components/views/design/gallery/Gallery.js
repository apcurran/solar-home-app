import "./Gallery.css";

function Gallery({ solarDeviceImg }) {
    return (
        <figure className="design__gallery">
            <img className="design__galery__img" src={solarDeviceImg} alt="Solar-roofed home" width="1920" height="1280"/>
        </figure>
    );
}

export default Gallery;
