Weather App 🌤️
===============

A modern and interactive weather application built using React, Material-UI, and Mapbox GL, leveraging the OpenWeatherMap API to fetch weather data. This app allows users to search for weather information by city name or use their current location to get weather updates.

Features
--------

*   **Search by City**: Enter a city name to get the latest weather information.
    
*   **Current Location Weather**: Use your current location to fetch weather data.
    
*   **Interactive Map**: Visualize the location on an interactive globe.
    
*   **Weather Information Display**: Detailed weather information including temperature, feels-like temperature, min/max temperature, humidity, and weather description.
    
*   **Responsive Design**: The app is designed to be responsive and works well on various devices.
    

Demo
----

A live demo of the application can be found [here.](https://res.cloudinary.com/dn42qkskw/video/upload/v1719519141/Portfolio/rhb9dmwpbsptaem9jhtj.mp4)

Installation
------------

Follow these steps to set up the project locally:

1.  **Clone the repository: gh repo clone sahil0902/WeatherApp**
    
2.  Navigate to the project directory:cd WeatherApp
    
3.  Install dependencies:npm install
    
4.  **Create a .env file in the root directory and add your API keys**
    VITE\_WEATHERKEY=your\_openweather\_api\_key
    VITE\_MAPAPIKEY=your\_mapbox\_api\_key

5.Run the app: npm start

The app should now be running on http://localhost:3000.

Usage
-----

### Searching for a City

1.  Enter the city name in the search box.
    
2.  Click the "Search" button.
    
3.  The weather information for the specified city will be displayed in the InfoBox, and the map will update to show the location.
    

### Using Current Location

1.  Click the "Locate" button.
    
2.  The app will request access to your location.
    
3.  Once granted, the app will fetch the weather information for your current location and display it.
    

Code Overview
-------------

### Main Components

1.  **WeatherApp.jsx**: The main component that ties everything together.
    
2.  **SearchBox.jsx**: The component that handles user input for searching weather by city or current location.
    
3.  **InfoBox.jsx**: The component that displays the fetched weather information.
    
4.  **Glob.jsx**: The component that integrates Mapbox GL to display an interactive map.
    
