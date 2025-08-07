# WTWR (What to Wear?)

## About the project

WTWR is a weather-based clothing recommendation application that helps users choose appropriate clothing based on current weather conditions. The application fetches real-time weather data from the OpenWeatherMap API and provides personalized clothing suggestions.

## Functionality

- **Weather Display**: Shows current temperature, weather conditions, and location
- **Clothing Recommendations**: Suggests appropriate clothing items based on weather type (hot, warm, cold)
- **Dynamic Weather Cards**: Displays different weather backgrounds based on conditions and time of day
- **Add Clothing Items**: Modal form to add new clothing items with weather type selection
- **Item Details**: Modal to view detailed information about clothing items
- **Responsive Design**: Works on desktop and mobile devices

## Technologies and Techniques Used

- **React 18.2.0**: Functional components with hooks
- **JavaScript (ES6+)**: Modern JavaScript features including async/await
- **CSS3**: Custom styling with BEM methodology
- **OpenWeatherMap API**: Real-time weather data integration
- **Vite**: Build tool and development server
- **Cabinet Grotesk Font**: Custom typography
- **Responsive Design**: Mobile-first approach

## Project Structure

```
src/
├── components/
│   ├── App/          # Main application component
│   ├── Header/       # Navigation and user info
│   ├── Main/         # Main content area
│   ├── Footer/       # Footer component
│   ├── WeatherCard/  # Weather display component
│   ├── ItemCard/     # Clothing item cards
│   ├── ModalWithForm/ # Add clothing modal
│   └── ItemModal/    # Item details modal
├── utils/
│   ├── constants.js  # Default clothing items and API configuration
│   └── weatherApi.js # Weather API integration
├── vendor/
│   ├── normalize.css # CSS reset
│   ├── fonts.css     # Font declarations
│   └── fonts/        # Font files
└── assets/           # Images and other assets
```

## Features

- **Real-time Weather**: Fetches current weather data for Tel Aviv-Yafo
- **Weather-based Filtering**: Shows clothing items appropriate for current weather
- **Day/Night Backgrounds**: Different weather card backgrounds based on time of day
- **Interactive Modals**: Add new clothing items and view item details
- **Dynamic Content**: Weather data updates automatically

## Installation and Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm start`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Configuration

The application uses the OpenWeatherMap API with coordinates set for Tel Aviv-Yafo, Israel. The API key and coordinates are configured in `src/utils/constants.js`.

## Links

- [Figma Design](https://www.figma.com/file/DTojSwldenF9UPKQZd6RRb/Sprint-10%3A-WTWR)
