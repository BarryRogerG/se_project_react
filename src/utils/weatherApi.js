import { WEATHER_API_KEY, WEATHER_COORDS } from "./constants.js";

// Function to determine weather type based on temperature
const getWeatherType = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
};

// Function to extract needed data from API response
const extractWeatherData = (apiResponse) => {
  const cityName = apiResponse.name;
  const temperature = Math.round(apiResponse.main.temp); // Convert to Fahrenheit if needed
  const weatherType = getWeatherType(temperature);

  return {
    city: cityName,
    temperature: temperature,
    weatherType: weatherType,
  };
};

// Main function to fetch weather data
export const fetchWeatherData = async () => {
  try {
    const { latitude, longitude } = WEATHER_COORDS;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${WEATHER_API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return extractWeatherData(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    // Return fallback data if API fails
    return {
      city: "Tel Aviv-Yafo",
      temperature: 75,
      weatherType: "warm",
    };
  }
};
