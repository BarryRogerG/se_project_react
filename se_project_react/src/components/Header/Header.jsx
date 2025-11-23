// React imports
import React, { useContext } from "react";
import { Link } from "react-router-dom";

// Components
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

// Contexts
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

// Assets
import logo from "../../assets/logo.svg";
import userAvatar from "../../assets/avatar.png";

// Styles
import "./Header.css";

function Header({
  onAddClothesClick,
  location,
  currentTemperatureUnit,
  onToggleSwitchChange,
  onRegisterClick,
  onLoginClick,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/" className="header__logo-link">
          <img className="header__logo" src={logo} alt="WTWR Logo" />
        </Link>
        <p className="header__date-location">
          {currentDate}, {location}
        </p>
      </div>

      <div className="header__right">
        <ToggleSwitch
          isChecked={currentTemperatureUnit === "C"}
          onToggle={onToggleSwitchChange}
        />
        {isLoggedIn && currentUser && (
          <button
            type="button"
            className="header__add-clothes-btn"
            onClick={onAddClothesClick}
          >
            + Add clothes
          </button>
        )}
        {isLoggedIn && currentUser ? (
          <Link to="/profile" className="header__user">
            <p className="header__username">{currentUser.name || "User"}</p>
            {currentUser.avatar ? (
              <img
                className="header__avatar"
                src={currentUser.avatar}
                alt={currentUser.name || "User"}
              />
            ) : (
              <div className="header__avatar-placeholder">
                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "U"}
              </div>
            )}
          </Link>
        ) : (
          <div className="header__auth-buttons">
            <button
              type="button"
              className="header__signup-btn"
              onClick={onRegisterClick}
            >
              Sign Up
            </button>
            <button
              type="button"
              className="header__login-btn"
              onClick={onLoginClick}
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
