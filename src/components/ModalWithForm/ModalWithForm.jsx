import React from "react";
import "./ModalWithForm.css";

function ModalWithForm({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close-btn" onClick={onClose}>
          ×
        </button>
        <form className="modal__form">
          <h2 className="modal__title">Add New Clothes</h2>
          {/* Form content will be added here */}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
