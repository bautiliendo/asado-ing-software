import './Modal.css';

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null; // Si está cerrado, no muestra nada

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>✕</button>
                {children}
            </div>
        </div>
    );
}

export default Modal;