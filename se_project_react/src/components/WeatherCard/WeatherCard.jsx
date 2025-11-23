import React, { useContext } from "react";
import "./WeatherCard.css";
import { getWeatherBackground } from "../../utils/weatherHelpers";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <section className="weather-card">
      <img
        src={getWeatherBackground(weatherData)}
        alt={`${weatherData.weatherCondition} ${
          weatherData.isDay ? "day" : "night"
        } weather background`}
        className="weather-card__background"
      />
      <p className="weather-card__temperature">
        {weatherData.temperature[currentTemperatureUnit]}°
        {currentTemperatureUnit}
      </p>
    </section>
  );
}

export default WeatherCard;
