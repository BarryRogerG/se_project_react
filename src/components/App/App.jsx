// React imports
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

// Components
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

// Utils/API
import { fetchWeatherData } from "../../utils/weatherApi";
import {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import { signup, signin, checkToken, updateUserProfile } from "../../utils/auth";

// Contexts
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

// Styles
import "./App.css";

function App() {
  console.log('App component rendering');
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  // Check token on mount
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      const checkUserToken = async () => {
        try {
          const userData = await checkToken(token);
          setUser(userData);
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Token check failed:", error);
          localStorage.removeItem("jwt");
          setUser(null);
          setIsLoggedIn(false);
        }
      };
      checkUserToken();
    }
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

  // Handle registration
  const handleRegisterSubmit = async ({ name, avatar, email, password }) => {
    try {
      // Register the user
      await signup({ name, avatar, email, password });
      
      // Close the register modal
      setIsRegisterModalOpen(false);
      
      // Immediately sign the user in
      handleLoginSubmit({ email, password });
    } catch (error) {
      console.error("Registration failed:", error);
      // You could add error handling here (show error message to user)
    }
  };

  // Handle login
  const handleLoginSubmit = async ({ email, password }) => {
    try {
      // Sign in the user
      const response = await signin({ email, password });
      
      // Store the token in localStorage
      if (response.token) {
        localStorage.setItem("jwt", response.token);
        
        // Check the token to get user data
        const userData = await checkToken(response.token);
        setUser(userData);
        setIsLoggedIn(true);
        
        // Close the login modal
        setIsLoginModalOpen(false);
        
        // Navigate to the main page
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      // You could add error handling here (show error message to user)
    }
  };

  // Handle opening register modal
  const handleRegisterClick = () => {
    setIsRegisterModalOpen(true);
  };

  // Handle opening login modal
  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  // Handle closing register modal
  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  // Handle closing login modal
  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  // Handle sign out
  const handleSignOut = () => {
    // Remove token from localStorage
    localStorage.removeItem("jwt");
    // Set isLoggedIn to false
    setIsLoggedIn(false);
    // Clear user data
    setUser(null);
    // Navigate to the main page
    navigate("/");
  };

  // Handle opening edit profile modal
  const handleEditProfileClick = () => {
    setIsEditProfileModalOpen(true);
  };

  // Handle closing edit profile modal
  const handleCloseEditProfileModal = () => {
    setIsEditProfileModalOpen(false);
  };

  // Handle edit profile submit
  const handleEditProfileSubmit = async ({ name, avatar }) => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        console.error("No token found");
        return;
      }

      // Update the user profile on the server
      const updatedUser = await updateUserProfile(token, { name, avatar });

      // Update the user state with the new data
      setUser(updatedUser);

      // Close the modal
      handleCloseEditProfileModal();
    } catch (error) {
      console.error("Failed to update profile:", error);
      // You could add error handling here (show error message to user)
    }
  };

  // Handle card like/unlike
  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    // if not liked, send a request to add the user's id to the card's likes array
    // if so, send a request to remove the user's id from the card's likes array
    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <CurrentUserContext.Provider value={user}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header
            onAddClothesClick={handleAddClothesClick}
            location={weatherData.location}
            currentTemperatureUnit={currentTemperatureUnit}
            onToggleSwitchChange={handleToggleSwitchChange}
            onRegisterClick={handleRegisterClick}
            onLoginClick={handleLoginClick}
            isLoggedIn={isLoggedIn}
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
                onCardLike={handleCardLike}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile
                  clothingItems={clothingItems}
                  onAddItem={handleAddClothesClick}
                  onItemClick={handleItemClick}
                  onEditProfile={handleEditProfileClick}
                  onSignOut={handleSignOut}
                  onCardLike={handleCardLike}
                />
              </ProtectedRoute>
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
        <RegisterModal
          isOpen={isRegisterModalOpen}
          onRegister={handleRegisterSubmit}
          onCloseModal={handleCloseRegisterModal}
        />
        <LoginModal
          isOpen={isLoginModalOpen}
          onLogin={handleLoginSubmit}
          onCloseModal={handleCloseLoginModal}
        />
        <EditProfileModal
          isOpen={isEditProfileModalOpen}
          onEditProfile={handleEditProfileSubmit}
          onCloseModal={handleCloseEditProfileModal}
        />
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
