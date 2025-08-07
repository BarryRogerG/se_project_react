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

// Function to determine weather condition category based on API code
const getWeatherCondition = (weatherCode) => {
  // Group 2xx: Thunderstorm
  if (weatherCode >= 200 && weatherCode < 300) {
    return "storm";
  }
  // Group 3xx: Drizzle
  else if (weatherCode >= 300 && weatherCode < 400) {
    return "rain";
  }
  // Group 5xx: Rain
  else if (weatherCode >= 500 && weatherCode < 600) {
    return "rain";
  }
  // Group 6xx: Snow
  else if (weatherCode >= 600 && weatherCode < 700) {
    return "snow";
  }
  // Group 7xx: Atmosphere (fog, mist, etc.)
  else if (weatherCode >= 700 && weatherCode < 800) {
    return "fog";
  }
  // Group 800: Clear
  else if (weatherCode === 800) {
    return "sunny";
  }
  // Group 80x: Clouds
  else if (weatherCode >= 801 && weatherCode < 900) {
    return "cloudy";
  }
  // Default
  else {
    return "sunny";
  }
};

// Function to determine if it's day or night
const isDayTime = (currentTime, sunrise, sunset) => {
  // Convert sunrise and sunset from seconds to milliseconds
  const sunriseMs = sunrise * 1000;
  const sunsetMs = sunset * 1000;

  return currentTime >= sunriseMs && currentTime <= sunsetMs;
};

// Function to extract needed data from API response
const extractWeatherData = (apiResponse) => {
  const cityName = apiResponse.name;
  console.log("API returned city name:", cityName); // Debug log
  const temperature = Math.round(apiResponse.main.temp);
  const weatherType = getWeatherType(temperature);
  const weatherCode = apiResponse.weather[0].id;
  const weatherCondition = getWeatherCondition(weatherCode);
  const sunrise = apiResponse.sys.sunrise;
  const sunset = apiResponse.sys.sunset;
  const currentTime = Date.now();
  const isDay = isDayTime(currentTime, sunrise, sunset);

  return {
    city: cityName,
    temperature: temperature,
    weatherType: weatherType,
    weatherCondition: weatherCondition,
    isDay: isDay,
    weatherCode: weatherCode,
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
      weatherCondition: "sunny",
      isDay: true,
      weatherCode: 800,
    };
  }
};
