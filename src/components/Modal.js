import React from "react";
import '../Modal.css';

const Modal = ({show, onClose}) => {
    if (!show) {
        return null;
    }
    
    return (
    <div className="modal-overlay">
        <div className="modal-content">
        <button className="modal-close" onClick={onClose}>X</button>
        <h2>Contenu de la modale</h2>
        <p>Ceci est une fenêtre modale simple.</p>
        </div>
    </div>
    );

}

export default Modal;