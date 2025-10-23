// React imports
import React, { useContext } from "react";

// Components
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

// Contexts
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

// Styles
import "./Main.css";

function Main({ weatherData, clothingItems = [], onItemClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  // Filter clothing items based on current weather type
  const filteredClothingItems = clothingItems.filter(
    (item) => item.weather === weatherData.condition
  );

  return (
    <main className="main">
      <div className="main__weather-section">
        <WeatherCard weatherData={weatherData} />
      </div>

      <div className="main__clothing-section">
        <p className="main__clothing-prompt">
          Today is {weatherData.temperature[currentTemperatureUnit]}°{" "}
          {currentTemperatureUnit} / You may want to wear:
        </p>

        <ul className="cards_list">
          {filteredClothingItems.length > 0 ? (
            filteredClothingItems.map((item) => (
              <ItemCard key={item._id} item={item} onItemClick={onItemClick} />
            ))
          ) : (
            <p className="main__no-items">
              No clothing items available for {weatherData.condition} weather.
              Please check if the API server is running on port 3001.
            </p>
          )}
        </ul>
      </div>
    </main>
  );
}

export default Main;
