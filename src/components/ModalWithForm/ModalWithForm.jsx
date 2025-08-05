import React, { useState } from "react";
import "./ModalWithForm.css";

function ModalWithForm({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    weather: "hot",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">New garment</h2>
          <button className="modal__close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form className="modal__form" onSubmit={handleSubmit}>
          <div className="modal__input-group">
            <label htmlFor="name" className="modal__label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="modal__input"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="modal__input-group">
            <label htmlFor="image" className="modal__label">
              Image
            </label>
            <input
              type="url"
              id="image"
              name="image"
              className="modal__input"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="modal__weather-section">
            <p className="modal__weather-title">Select the weather type:</p>
            <div className="modal__radio-group">
              <label className="modal__radio-label">
                <input
                  type="radio"
                  name="weather"
                  value="hot"
                  checked={formData.weather === "hot"}
                  onChange={handleInputChange}
                  className="modal__radio"
                />
                <span className="modal__radio-text">Hot</span>
              </label>

              <label className="modal__radio-label">
                <input
                  type="radio"
                  name="weather"
                  value="warm"
                  checked={formData.weather === "warm"}
                  onChange={handleInputChange}
                  className="modal__radio"
                />
                <span className="modal__radio-text">Warm</span>
              </label>

              <label className="modal__radio-label">
                <input
                  type="radio"
                  name="weather"
                  value="cold"
                  checked={formData.weather === "cold"}
                  onChange={handleInputChange}
                  className="modal__radio"
                />
                <span className="modal__radio-text">Cold</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="modal__submit-btn"
            disabled={!formData.name || !formData.image}
          >
            Add garment
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
