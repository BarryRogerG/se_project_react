import React from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = ({ isChecked, onToggle }) => {
  return (
    <div className="toggle-switch">
      <input
        type="checkbox"
        id="temperature-toggle"
        className="toggle-switch__input"
        checked={isChecked}
        onChange={onToggle}
      />
      <label htmlFor="temperature-toggle" className="toggle-switch__label">
        <span className="toggle-switch__text toggle-switch__text--f">F</span>
        <span className="toggle-switch__text toggle-switch__text--c">C</span>
        <span className="toggle-switch__slider"></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
