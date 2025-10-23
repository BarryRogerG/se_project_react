// React imports
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";

// Utils/API
import { fetchWeatherData } from "../../utils/weatherApi";
import {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
} from "../../utils/api";

// Contexts
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

// Styles
import "./App.css";

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
    const fetchClothingItems = async () => {
      try {
        const items = await getClothingItems();
        setClothingItems(items);
      } catch (error) {
        console.error("Failed to fetch clothing items:", error);
        // If API fails, try to use fallback data or show a message
        console.log("Using fallback data or showing error message to user");
        // You could set a fallback state here if needed
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

  const handleAddItemModalSubmit = async ({ name, imageUrl, weather }) => {
    try {
      // Add the new item to the server
      const newItem = await addClothingItem({ name, imageUrl, weather });

      // Update local state with the new item at the beginning
      // Use functional update to avoid stale closure issues
      setClothingItems((prevItems) => {
        // Check if item already exists to prevent duplication
        const itemExists = prevItems.some((item) => item._id === newItem._id);
        if (itemExists) {
          return prevItems; // Don't add if already exists
        }
        // Add new item at the beginning
        return [newItem, ...prevItems];
      });

      // Close the modal
      handleCloseModal();
    } catch (error) {
      console.error("Failed to add item:", error);
      // You could add error handling here (show error message to user)
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      // Delete the item from the server
      await deleteClothingItem(itemId);

      // Remove the item from local state using functional update
      setClothingItems((prevItems) =>
        prevItems.filter((item) => item._id !== itemId)
      );

      // Close the item modal if it's open
      if (isItemModalOpen) {
        handleCloseItemModal();
      }
    } catch (error) {
      console.error("Failed to delete item:", error);
      // You could add error handling here (show error message to user)
    }
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
          onDelete={handleDeleteItem}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
