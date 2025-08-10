import React from "react";
import "./WeatherCard.css";
import { getWeatherBackground } from "../../utils/weatherHelpers";

function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <img
        src={getWeatherBackground(weatherData)}
        alt={`${weatherData.weatherCondition} ${
          weatherData.isDay ? "day" : "night"
        } weather background`}
        className="weather-card__background"
      />
      <p className="weather-card__temperature">{weatherData.temperature}°F</p>
    </section>
  );
}

export default WeatherCard;
