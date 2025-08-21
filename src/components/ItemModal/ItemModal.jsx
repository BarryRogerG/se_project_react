import React from "react";
import "./ItemModal.css";
import closeIcon from "../../assets/close.png";

function ItemModal({ isOpen, onClose, item }) {
  if (!isOpen || !item) {
    return null;
  }

  return (
    <div className="item-modal-overlay" onClick={onClose}>
      <div className="item-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="item-modal__close-btn"
          onClick={onClose}
        >
          <img src={closeIcon} alt="Close" className="item-modal__close-icon" />
        </button>

        <div className="item-modal__content">
          <img
            className="item-modal__image"
            src={item.imageUrl || item.link}
            alt={item.name}
          />
          <h2 className="item-modal__title">{item.name}</h2>
          <p className="item-modal__weather">Weather: {item.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
