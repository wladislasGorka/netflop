import React from "react";
import { CSSTransition } from 'react-transition-group';
import '../Modal.css';

const Modal = ({show, onClose}) => {
    // if (!show) {
    //     return null;
    // }
    
    return (
        <CSSTransition
        in={show}
        timeout={300}
        classNames="modal"
        unmountOnExit
        >
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={onClose}>X</button>
            <h2>Contenu de la modale</h2>
            <p>Ceci est une fenêtre modale avec animation.</p>
          </div>
        </div>
      </CSSTransition>
    );

}

export default Modal;