import React from "react";
import "./ModalWithForm.css";
import closeIcon from "../../assets/close.png";

function ModalWithForm({
  isOpen,
  onClose,
  title,
  name,
  buttonText,
  children,
  onSubmit,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal modal_${name}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          <h2 className="modal__title">{title}</h2>
          <button type="button" className="modal__close-btn" onClick={onClose}>
            <img src={closeIcon} alt="Close" className="modal__close-icon" />
          </button>
        </div>

        <form className="modal__form" onSubmit={onSubmit}>
          {children}

          <button type="submit" className="modal__submit-btn">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
