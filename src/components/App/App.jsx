import React, { useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [weatherData, setWeatherData] = useState({
    temperature: 75,
    location: "New York",
    condition: "sunny",
  });

  // Form data state moved from ModalWithForm
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    weather: "hot",
  });

  const handleAddClothesClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
      <Header onAddClothesClick={handleAddClothesClick} />
      <Main weatherData={weatherData} />
      <Footer />
      <ModalWithForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
      <ItemModal />
    </div>
  );
}

export default App;
