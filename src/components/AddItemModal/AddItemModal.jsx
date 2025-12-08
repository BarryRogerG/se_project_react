// React imports
import React, { useEffect } from "react";

// Components
import ModalWithForm from "../ModalWithForm/ModalWithForm";

// Hooks
import { useForm } from "../../hooks/useForm";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  // Use the useForm hook to manage form state
  const { values, handleChange, resetForm } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // handleSubmit calls onAddItem with form data
  function handleSubmit(e) {
    // prevent default behavior
    e.preventDefault();
    // call onAddItem with appropriate arguments
    onAddItem(values);
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onCloseModal}
      title="New garment"
      name="add-garment"
      buttonText="Add garment"
      onSubmit={handleSubmit}
    >
      {/* the contents of the form will go in here */}
      <div className="modal__input-group">
        <label htmlFor="addItem-name" className="modal__label">
          Name
        </label>
        <input
          type="text"
          id="addItem-name"
          name="name"
          className="modal__input"
          placeholder="Name"
          value={values.name || ""}
          onChange={handleChange}
          required
        />
      </div>

      <div className="modal__input-group">
        <label htmlFor="addItem-imageUrl" className="modal__label">
          Image
        </label>
        <input
          type="url"
          id="addItem-imageUrl"
          name="imageUrl"
          className="modal__input"
          placeholder="Image URL"
          value={values.imageUrl || ""}
          onChange={handleChange}
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
              checked={values.weather === "hot"}
              onChange={handleChange}
              className="modal__radio"
            />
            <span className="modal__radio-text">Hot</span>
          </label>

          <label className="modal__radio-label">
            <input
              type="radio"
              name="weather"
              value="warm"
              checked={values.weather === "warm"}
              onChange={handleChange}
              className="modal__radio"
            />
            <span className="modal__radio-text">Warm</span>
          </label>

          <label className="modal__radio-label">
            <input
              type="radio"
              name="weather"
              value="cold"
              checked={values.weather === "cold"}
              onChange={handleChange}
              className="modal__radio"
            />
            <span className="modal__radio-text">Cold</span>
          </label>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
