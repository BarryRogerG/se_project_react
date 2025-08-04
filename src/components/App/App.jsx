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

  const handleAddClothesClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <Header onAddClothesClick={handleAddClothesClick} />
      <Main weatherData={weatherData} />
      <Footer />
      <ModalWithForm isOpen={isModalOpen} onClose={handleCloseModal} />
      <ItemModal />
    </div>
  );
}

export default App;
