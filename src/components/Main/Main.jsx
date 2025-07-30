import React from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main() {
  return (
    <main className="main">
      <WeatherCard />
      <ItemCard />
    </main>
  );
}

export default Main;
