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
    console.log("handleItemClick called with:", item);
    setSelectedItem(item);
    setIsItemModalOpen(true);
    console.log("Modal should now be open");
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
    console.log("Form submitted:", formData);
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
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
      <ItemModal
        isOpen={isItemModalOpen}
        onClose={handleCloseItemModal}
        item={selectedItem}
      />
    </div>
  );
}

export default App;
