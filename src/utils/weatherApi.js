import { WEATHER_API_KEY, WEATHER_COORDS } from "./constants.js";
import { handleApiResponse } from "./api.js";

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
  const temperatureF = Math.round(apiResponse.main.temp);
  const temperatureC = Math.round(((temperatureF - 32) * 5) / 9);
  const weatherType = getWeatherType(temperatureF);
  const weatherCode = apiResponse.weather[0].id;
  const weatherCondition = getWeatherCondition(weatherCode);
  const sunrise = apiResponse.sys.sunrise;
  const sunset = apiResponse.sys.sunset;
  const currentTime = Date.now();
  const isDay = isDayTime(currentTime, sunrise, sunset);

  return {
    city: cityName,
    temperature: {
      F: temperatureF,
      C: temperatureC,
    },
    weatherType: weatherType,
    weatherCondition: weatherCondition,
    isDay: isDay,
    weatherCode: weatherCode,
  };
};

// Function to get location from IP address (fallback when geolocation fails)
const getLocationFromIP = async () => {
  console.log('Attempting IP-based location...');
  
  // Try multiple IP geolocation services
  const services = [
    {
      url: 'https://ipapi.co/json/',
      parser: (data) => data.latitude && data.longitude ? {
        latitude: data.latitude.toString(),
        longitude: data.longitude.toString(),
      } : null
    },
    {
      url: 'https://ipgeolocation.io/json/',
      parser: (data) => data.latitude && data.longitude ? {
        latitude: data.latitude.toString(),
        longitude: data.longitude.toString(),
      } : null
    },
    {
      url: 'http://ip-api.com/json/?fields=status,lat,lon',
      parser: (data) => data.status === 'success' && data.lat && data.lon ? {
        latitude: data.lat.toString(),
        longitude: data.lon.toString(),
      } : null
    }
  ];

  for (const service of services) {
    try {
      console.log(`Trying IP service: ${service.url}`);
      const response = await fetch(service.url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        console.log(`Service ${service.url} returned status: ${response.status}`);
        continue;
      }
      
      const data = await response.json();
      const coords = service.parser(data);
      
      if (coords) {
        console.log('IP-based location successful:', coords);
        return coords;
      } else {
        console.log(`Service ${service.url} returned invalid data`);
      }
    } catch (error) {
      console.log(`Service ${service.url} failed:`, error.message);
      continue;
    }
  }
  
  console.warn('All IP geolocation services failed, falling back to default location');
  return null;
};

// Main function to fetch weather data
// Accepts optional coordinates, falls back to default if not provided
export const fetchWeatherData = async (coordinates = null) => {
  const coords = coordinates || WEATHER_COORDS;
  const { latitude, longitude } = coords;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${WEATHER_API_KEY}`;

  const response = await fetch(url);
  const validResponse = handleApiResponse(response);

  const data = await validResponse.json();
  return extractWeatherData(data);
};

// Export the IP location function
export { getLocationFromIP };
