import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import { fetchWeatherData } from "../../utils/weatherApi";
import { getClothingItems } from "../../utils/api";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [weatherData, setWeatherData] = useState({
    temperature: {
      F: 75,
      C: 24,
    },
    location: "Tel Aviv-Yafo",
    condition: "warm",
  });
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

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

  // Fetch clothing items from server when component mounts
  useEffect(() => {
    console.log("App component mounted, fetching clothing items...");
    const fetchClothingItems = async () => {
      try {
        const items = await getClothingItems();
        console.log("Setting clothing items in state:", items.length, "items");
        setClothingItems(items);
      } catch (error) {
        console.error("Failed to fetch clothing items:", error);
        // Keep empty array if API fails
      }
    };

    fetchClothingItems();
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

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    // update clothingItems array
    setClothingItems([{ name, link: imageUrl, weather }, ...clothingItems]);
    // close the modal
    handleCloseModal();
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => {
      const newUnit = prevUnit === "F" ? "C" : "F";
      console.log("Temperature unit changed from", prevUnit, "to", newUnit);
      return newUnit;
    });
  };

  return (
    <div className="App">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header
          onAddClothesClick={handleAddClothesClick}
          location={weatherData.location}
          currentTemperatureUnit={currentTemperatureUnit}
          onToggleSwitchChange={handleToggleSwitchChange}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                weatherData={weatherData}
                onItemClick={handleItemClick}
                currentTemperatureUnit={currentTemperatureUnit}
                clothingItems={clothingItems}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                clothingItems={clothingItems}
                onAddItem={handleAddClothesClick}
                onItemClick={handleItemClick}
              />
            }
          />
        </Routes>
        <Footer />
        <AddItemModal
          isOpen={isModalOpen}
          onAddItem={handleAddItemModalSubmit}
          onCloseModal={handleCloseModal}
        />
        <ItemModal
          isOpen={isItemModalOpen}
          onClose={handleCloseItemModal}
          item={selectedItem}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
