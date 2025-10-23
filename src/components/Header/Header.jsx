// React imports
import React from "react";
import { Link } from "react-router-dom";

// Components
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

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
}) {
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
        <button
          type="button"
          className="header__add-clothes-btn"
          onClick={onAddClothesClick}
        >
          + Add clothes
        </button>
        <Link to="/profile" className="header__user">
          <p className="header__username">Terrence Tegegne</p>
          <img
            className="header__avatar"
            src={userAvatar}
            alt="Terrence Tegegne"
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;
