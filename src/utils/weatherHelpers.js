// Day weather backgrounds
import sunnyDay from "../assets/day/sunny.png";
import cloudyDay from "../assets/day/Cloudy.png";
import rainDay from "../assets/day/rain.png";
import stormDay from "../assets/day/storm.png";
import snowDay from "../assets/day/snow.png";
import fogDay from "../assets/day/fog.png";
import defaultDay from "../assets/day/default.png";

// Night weather backgrounds
import sunnyNight from "../assets/night/clear.png";
import cloudyNight from "../assets/night/cloudy.png";
import rainNight from "../assets/night/rain.png";
import stormNight from "../assets/night/storm.png";
import snowNight from "../assets/night/snow.png";
import fogNight from "../assets/night/fog.png";
import defaultNight from "../assets/night/default.png";

/**
 * Get the appropriate background image based on weather condition and time
 * @param {Object} weatherData - Object containing weatherCondition and isDay
 * @param {string} weatherData.weatherCondition - The weather condition (sunny, cloudy, rain, etc.)
 * @param {boolean} weatherData.isDay - Whether it's day or night
 * @returns {string} - The path to the appropriate background image
 */
export const getWeatherBackground = (weatherData) => {
  const { weatherCondition, isDay } = weatherData;

  // Day weather conditions
  if (isDay) {
    switch (weatherCondition) {
      case "sunny":
        return sunnyDay;
      case "cloudy":
        return cloudyDay;
      case "rain":
        return rainDay;
      case "storm":
        return stormDay;
      case "snow":
        return snowDay;
      case "fog":
        return fogDay;
      default:
        return defaultDay;
    }
  }
  // Night weather conditions
  else {
    switch (weatherCondition) {
      case "sunny":
        return sunnyNight;
      case "cloudy":
        return cloudyNight;
      case "rain":
        return rainNight;
      case "storm":
        return stormNight;
      case "snow":
        return snowNight;
      case "fog":
        return fogNight;
      default:
        return defaultNight;
    }
  }
};

/**
 * Convert Fahrenheit to Celsius
 * @param {number} fahrenheit - Temperature in Fahrenheit
 * @returns {number} - Temperature in Celsius
 */
export const fahrenheitToCelsius = (fahrenheit) => {
  return Math.round(((fahrenheit - 32) * 5) / 9);
};

/**
 * Convert Celsius to Fahrenheit
 * @param {number} celsius - Temperature in Celsius
 * @returns {number} - Temperature in Fahrenheit
 */
export const celsiusToFahrenheit = (celsius) => {
  return Math.round((celsius * 9) / 5 + 32);
};

/**
 * Format temperature based on unit preference
 * @param {number} temperature - Temperature value
 * @param {boolean} isCelsius - Whether to display in Celsius
 * @returns {string} - Formatted temperature string
 */
export const formatTemperature = (temperature, isCelsius) => {
  if (isCelsius) {
    const celsius = fahrenheitToCelsius(temperature);
    return `${celsius}°C`;
  }
  return `${temperature}°F`;
};
