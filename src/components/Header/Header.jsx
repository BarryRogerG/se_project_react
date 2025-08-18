import React from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import userAvatar from "../../assets/avatar.png";
import ToggleSwitch from "../App/ToggleSwitch/ToggleSwitch";

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
        <img className="header__logo" src={logo} alt="WTWR Logo" />
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
        <div className="header__user">
          <p className="header__username">Terrence Tegegne</p>
          <img
            className="header__avatar"
            src={userAvatar}
            alt="Terrence Tegegne"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
