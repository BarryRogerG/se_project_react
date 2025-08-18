import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  // declare state for each input field
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  // use a useEffect hook to reset the input field state to empty
  // when the modal is opened
  useEffect(() => {
    if (isOpen) {
      setName("");
      setImageUrl("");
      setWeather("");
    }
  }, [isOpen]);

  // create onChange handlers corresponding to each state variable
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  // onAddItem refers to handleAddItemSubmit, which is declared in
  // declare state for each input field
  // use a useEffect hook to reset the input field state to empty
  // the modal is opened
  // create onChange handlers corresponding to each state variabl
  function handleSubmit(e) {
    // prevent default behavior
    e.preventDefault();
    // call onAddItem with appropriate arguments
    onAddItem({ name, imageUrl, weather });
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
        <label htmlFor="name" className="modal__label">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="modal__input"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </div>

      <div className="modal__input-group">
        <label htmlFor="imageUrl" className="modal__label">
          Image
        </label>
        <input
          type="url"
          id="imageUrl"
          name="imageUrl"
          className="modal__input"
          placeholder="Image URL"
          value={imageUrl}
          onChange={handleImageUrlChange}
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
              checked={weather === "hot"}
              onChange={handleWeatherChange}
              className="modal__radio"
            />
            <span className="modal__radio-text">Hot</span>
          </label>

          <label className="modal__radio-label">
            <input
              type="radio"
              name="weather"
              value="warm"
              checked={weather === "warm"}
              onChange={handleWeatherChange}
              className="modal__radio"
            />
            <span className="modal__radio-text">Warm</span>
          </label>

          <label className="modal__radio-label">
            <input
              type="radio"
              name="weather"
              value="cold"
              checked={weather === "cold"}
              onChange={handleWeatherChange}
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
