import React from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

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

        <ul className="cards_list">
          {defaultClothingItems.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </ul>
      </div>
    </main>
  );
}

export default Main;
