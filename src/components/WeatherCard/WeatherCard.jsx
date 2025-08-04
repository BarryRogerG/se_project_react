import React from "react";
import "./WeatherCard.css";
import sunny from "../../assets/sunny.png"; // Weather card background

function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <img
        src={sunny}
        alt="Weather background"
        className="weather-card_image"
      />
      <p className="weather-card_temp">{weatherData.temperature}°F</p>
    </section>
  );
}

export default WeatherCard;
