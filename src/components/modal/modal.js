import React from "react";
import "./modal.scss";
import close from "../../assets/img/close-24-px-2.svg";

const Modal = ({children, handleClose = () => {}, className = '', width = ''}) => {
    return <div className={`ModalWrapper ${className}`}>
        <div className="ModalContainer" style={{width: width}}>
            <img onClick={handleClose} className="Close" src={close} alt="Close"/>
            {children}
        </div>
    </div>
};

export default Modal;
