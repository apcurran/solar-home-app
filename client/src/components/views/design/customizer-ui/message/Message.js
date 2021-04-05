import "./Message.css";

function Message({ successMessage, errorMessage }) {
    const sMessage = <p className="message message--success">{successMessage}</p>;
    const eMessage = <p className="message message--error">{errorMessage}</p>;

    return (
        <>
            {successMessage ?  sMessage : eMessage}
        </>
    );
}

export default Message;
