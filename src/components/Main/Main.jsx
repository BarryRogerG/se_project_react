import React from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import { clothingItems } from "../../utils/constants";

function Main({ weatherData }) {
  return (
    <main className="main">
      <div className="main__weather-section">
        <WeatherCard weatherData={weatherData} />
      </div>

      <div className="main__clothing-section">
        <p className="main__clothing-prompt">
          Today is {weatherData.temperature}° F / You may want to wear:
        </p>

        <ul className="main__clothing-cards">
          {clothingItems.map((item) => (
            <li key={item.id} className="main__clothing-card">
              <img
                src={item.image}
                alt={item.alt}
                className="main__clothing-card-image"
              />
              <p className="main__clothing-card-name">{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default Main;
