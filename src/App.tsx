import React, { useState, useEffect } from 'react';
import './App.css';

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

interface ClothingRecommendation {
  top: string;
  bottom: string;
  outerwear: string;
  accessories: string[];
}

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [recommendation, setRecommendation] = useState<ClothingRecommendation | null>(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('New York');

  // Mock weather data - in a real app, this would come from a weather API
  const getWeatherData = async (city: string): Promise<WeatherData> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock data based on city
    const mockData: { [key: string]: WeatherData } = {
      'New York': { temperature: 22, condition: 'Sunny', humidity: 65, windSpeed: 12 },
      'London': { temperature: 15, condition: 'Cloudy', humidity: 80, windSpeed: 8 },
      'Tokyo': { temperature: 28, condition: 'Rainy', humidity: 75, windSpeed: 5 },
      'Sydney': { temperature: 18, condition: 'Partly Cloudy', humidity: 70, windSpeed: 15 },
      'Moscow': { temperature: 8, condition: 'Snowy', humidity: 85, windSpeed: 20 }
    };
    
    return mockData[city] || mockData['New York'];
  };

  const getClothingRecommendation = (weather: WeatherData): ClothingRecommendation => {
    const { temperature, condition, humidity, windSpeed } = weather;
    
    let top, bottom, outerwear;
    const accessories: string[] = [];

    // Temperature-based recommendations
    if (temperature >= 25) {
      top = 'Light cotton t-shirt or tank top';
      bottom = 'Shorts or light pants';
      outerwear = 'No outerwear needed';
      accessories.push('Sunglasses', 'Hat', 'Sunscreen');
    } else if (temperature >= 15) {
      top = 'Long-sleeve shirt or light sweater';
      bottom = 'Jeans or khakis';
      outerwear = 'Light jacket or cardigan';
      accessories.push('Light scarf');
    } else if (temperature >= 5) {
      top = 'Warm sweater or thermal shirt';
      bottom = 'Warm pants or jeans';
      outerwear = 'Medium-weight jacket';
      accessories.push('Scarf', 'Gloves');
    } else {
      top = 'Thermal underwear + warm sweater';
      bottom = 'Warm pants';
      outerwear = 'Heavy winter coat';
      accessories.push('Scarf', 'Gloves', 'Winter hat', 'Thermal socks');
    }

    // Condition-based adjustments
    if (condition.toLowerCase().includes('rain')) {
      outerwear = 'Waterproof jacket or raincoat';
      accessories.push('Umbrella', 'Waterproof shoes');
    } else if (condition.toLowerCase().includes('snow')) {
      outerwear = 'Insulated winter coat';
      accessories.push('Winter boots', 'Snow gloves');
    }

    // Wind-based adjustments
    if (windSpeed > 15) {
      accessories.push('Windbreaker');
    }

    return { top, bottom, outerwear, accessories };
  };

  const fetchWeatherAndRecommendation = async () => {
    setLoading(true);
    try {
      const weather = await getWeatherData(location);
      setWeatherData(weather);
      const clothingRec = getClothingRecommendation(weather);
      setRecommendation(clothingRec);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherAndRecommendation();
  }, []);

  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('sunny')) return '☀️';
    if (conditionLower.includes('cloudy')) return '☁️';
    if (conditionLower.includes('rainy')) return '🌧️';
    if (conditionLower.includes('snowy')) return '❄️';
    if (conditionLower.includes('partly')) return '⛅';
    return '🌤️';
  };

  return (
    <div className="App">
      <div className="container">
        <header className="app-header">
          <h1 className="app-title">WTWR</h1>
          <p className="app-subtitle">What to Wear?</p>
        </header>

        <div className="weather-section">
          <div className="location-input">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter city name"
              className="location-field"
            />
            <button 
              onClick={fetchWeatherAndRecommendation}
              className="search-btn"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Get Weather'}
            </button>
          </div>

          {weatherData && (
            <div className="weather-card">
              <div className="weather-info">
                <div className="weather-icon">
                  {getWeatherIcon(weatherData.condition)}
                </div>
                <div className="weather-details">
                  <h2 className="temperature">{weatherData.temperature}°C</h2>
                  <p className="condition">{weatherData.condition}</p>
                  <div className="weather-stats">
                    <span>Humidity: {weatherData.humidity}%</span>
                    <span>Wind: {weatherData.windSpeed} km/h</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {recommendation && (
            <div className="recommendation-card">
              <h3 className="recommendation-title">Today's Outfit Recommendation</h3>
              <div className="clothing-items">
                <div className="clothing-item">
                  <span className="item-label">Top:</span>
                  <span className="item-value">{recommendation.top}</span>
                </div>
                <div className="clothing-item">
                  <span className="item-label">Bottom:</span>
                  <span className="item-value">{recommendation.bottom}</span>
                </div>
                <div className="clothing-item">
                  <span className="item-label">Outerwear:</span>
                  <span className="item-value">{recommendation.outerwear}</span>
                </div>
                {recommendation.accessories.length > 0 && (
                  <div className="clothing-item">
                    <span className="item-label">Accessories:</span>
                    <div className="accessories-list">
                      {recommendation.accessories.map((accessory, index) => (
                        <span key={index} className="accessory-tag">{accessory}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <footer className="app-footer">
          <p>Get personalized clothing recommendations based on weather conditions</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
