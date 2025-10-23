// React imports
import React from "react";

// Styles
import "./ItemModal.css";

function ItemModal({ isOpen, onClose, item, onDelete }) {
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
          ×
        </button>

        <div className="item-modal__content">
          <img
            className="item-modal__image"
            src={item.imageUrl || item.link}
            alt={item.name}
          />
          <h2 className="item-modal__title">{item.name}</h2>
          <p className="item-modal__weather">Weather: {item.weather}</p>
          <button
            type="button"
            className="item-modal__delete-btn"
            onClick={() => onDelete(item._id)}
          >
            Delete garment
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
