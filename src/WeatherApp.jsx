import React, { useEffect, useState } from 'react';
import Searchbox from "./SearchBox";
import InfoBox from "./InfoBox";
import MapComponent from "./Globe";
import './WeatherApp.css'; // Add this for additional styles

export default function WeatherApp({ info, setInfo }) {
  // State variables to store the current location, city name, and weather information.
  const [loc, setLoc] = useState({ lat: 0, lon: 0})
  const [city, setCity] = useState('')
  const [weatherInfo, setWeatherInfo] = useState({
    City: "",
    feels_like: null,
    humidity: null,
    max_temp: null,
    min_temp: null,
    temp: null,
    weather: "",
  })

  /**
   * A function to update the city name in the state.
   * @param {string} newCity - The new city name to be set in the state.
   */
  const updateCity = (newCity) => {
    setCity(newCity)
  }

  /**
   * A function to update the location in the state.
   * @param {object} newLoc - An object containing the new latitude and longitude to be set in the state.
   */
  const updateLoc = (newLoc) => {
    setLoc(newLoc)
  }

  /**
   * A function to update the weather information in the state.
   * @param {object} res - An object containing the new weather information to be set in the state.
   */
  const updateInfo = (res) => {
    setWeatherInfo(res)
    setInfo(res)
    setCity(res.City)
  }

  // Lifecycle method to log the current city name in the console when it changes.
  useEffect(() => {
    console.log("City name in WeatherApp:", city)
  }, [city])

  // Lifecycle method to log the current location in the console when it changes.
  useEffect(() => {
    console.log("Current loc state:", loc)
  }, [loc])

  // JSX code to render the WeatherApp component.
  return (
    <div className="weather-app">
      <h3>Weather App</h3>
      <MapComponent loc={loc} city={city} weatherCondition={weatherInfo.weather}/>
      <Searchbox updateInfo={updateInfo} updateCity={updateCity} updateLoc={updateLoc} />
      <InfoBox info={weatherInfo} />
    </div>
  )
}