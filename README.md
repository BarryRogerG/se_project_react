# WTWR (What to Wear?)

A modern React TypeScript application that provides personalized clothing recommendations based on weather conditions.

## About the project

The idea of the application is pretty simple - we make a call to an API, which then responds with the daily weather forecast. We collect the weather data, process it, and then based on the forecast, we recommend suitable clothing to the user.

## Features

- 🌤️ **Weather Display**: Shows current temperature, weather condition, humidity, and wind speed
- 👕 **Smart Recommendations**: Provides personalized clothing suggestions based on weather data
- 🎨 **Modern UI**: Beautiful, responsive design with gradient backgrounds and smooth animations
- 📱 **Mobile Friendly**: Fully responsive design that works on all devices
- 🔄 **Real-time Updates**: Get fresh weather data and recommendations for any city

## Available Cities

The app currently supports weather data for:
- New York
- London
- Tokyo
- Sydney
- Moscow

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd wtwr
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## How to Use

1. Enter a city name in the input field
2. Click "Get Weather" to fetch weather data
3. View the current weather conditions
4. Get personalized clothing recommendations based on the weather

## Technology Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **CSS3** - Modern styling with gradients and animations
- **Responsive Design** - Mobile-first approach

## Project Structure

```
src/
├── App.tsx          # Main application component
├── App.css          # Application styles
├── index.tsx        # Application entry point
└── ...
```

## Future Enhancements

- Integration with real weather APIs (OpenWeatherMap, WeatherAPI)
- User location detection
- Extended clothing recommendations
- Weather forecast for multiple days
- User preferences and customization

## Links

- [Figma Design](https://www.figma.com/file/DTojSwldenF9UPKQZd6RRb/Sprint-10%3A-WTWR)

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
