import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { fetchWeatherData } from "../../utils/weatherApi";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [weatherData, setWeatherData] = useState({
    temperature: 75,
    location: "Tel Aviv-Yafo",
    condition: "warm",
  });

  // Form data state moved from ModalWithForm
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    weather: "hot",
  });

  // Fetch weather data when component mounts
  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const weather = await fetchWeatherData();
        setWeatherData({
          temperature: weather.temperature,
          location: weather.city,
          condition: weather.weatherType,
          weatherCondition: weather.weatherCondition,
          isDay: weather.isDay,
        });
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
        // Keep default weather data if API fails
      }
    };

    getWeatherData();
  }, []);

  const handleAddClothesClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // ItemModal handlers
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsItemModalOpen(true);
  };

  const handleCloseItemModal = () => {
    setIsItemModalOpen(false);
    setSelectedItem(null);
  };

  // Form handlers moved from ModalWithForm
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
    handleCloseModal();
    // Reset form data
    setFormData({
      name: "",
      image: "",
      weather: "hot",
    });
  };

  return (
    <div className="App">
      <Header
        onAddClothesClick={handleAddClothesClick}
        location={weatherData.location}
      />
      <Main weatherData={weatherData} onItemClick={handleItemClick} />
      <Footer />
      <ModalWithForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="New garment"
        name="add-garment"
        buttonText="Add garment"
        onSubmit={handleSubmit}
      >
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
      </ModalWithForm>
      <ItemModal
        isOpen={isItemModalOpen}
        onClose={handleCloseItemModal}
        item={selectedItem}
      />
    </div>
  );
}

export default App;
