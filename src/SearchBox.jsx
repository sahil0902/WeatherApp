import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import City from '@mui/icons-material/LocationCity';
import Button from '@mui/material/Button';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import CircularProgress from '@mui/material/CircularProgress';
import './SearchBox.css';
import axios from 'axios';
import PinDropIcon from '@mui/icons-material/PinDrop';
/**
 * A React component that allows users to search for weather information by city name or current location.
 *
 * @param {function} updateInfo - A callback function to update the weather information.
 * @param {function} updateCity - A callback function to update the city name.
 * @param {function} updateLoc - A callback function to update the current location.
 **/
export default function SearchBox({ updateInfo, updateCity, updateLoc }) {
    // State variables to store the city name and loading status
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);
      // API URL and key for OpenWeatherMap
    const URL = `https://api.openweathermap.org/data/2.5/weather`;
    const key = `${import.meta.env.VITE_WEATHERKEY}`;
/**
   * Fetches weather information for a given city name
   *
   * @param {string} cityName - The city name to fetch weather information for
   * @returns {object} - The weather information for the city
   */
  
    const getWeatherInfo = async (cityName) => {
        setLoading(true);
        try {
             // Fetch weather data from OpenWeatherMap API
            const response = await axios.get(`${URL}?q=${cityName}&appid=${key}`);
            const data = response.data;
            const result = {
                City: cityName,
                feels_like: data.main.feels_like - 273.15,
                temp: data.main.temp - 273.15,
                min_temp: data.main.temp_min - 273.15,
                max_temp: data.main.temp_max - 273.15,
                humidity: data.main.humidity,
                weather: data.weather[0].description,
            };
            return result;
        } catch (error) {
            console.error('Error fetching weather data:', error);
        } finally {
            setLoading(false);
        }
    };
 /**
   * Handles changes to the city input field
   *
   * @param {object} e - The event object
   */
    const handleChange = (e) => {
        setCity(e.target.value);
    };
/**
   * Handles form submission to fetch weather information
   *
   * @param {object} e - The event object
   */
    const handleSubmit = async (e) => {
        e.preventDefault();
        let newInfo = await getWeatherInfo(city);
        updateInfo(newInfo);
        updateCity(newInfo.City);
        console.log(newInfo);
        setCity('');
    };

    const fetchCurrentLocation = () => {
        const successCallback = async (position) => {
            const newLoc = { lat: position.coords.latitude, lon: position.coords.longitude };
            updateLoc(newLoc);
            console.log('Current location:', newLoc);

            // Reverse geocoding
            try {
                const response = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${newLoc.lat}&lon=${newLoc.lon}&limit=1&appid=${key}`);
                if (response.data && response.data.length > 0) {
                    const cityName = response.data[0].name;
                    setCity(cityName);
                    updateCity(cityName);
                    
                    // Fetch weather info for the found city
                    const weatherInfo = await getWeatherInfo(cityName);
                    updateInfo(weatherInfo);
                }
            } catch (error) {
                console.error('Error in reverse geocoding:', error);
            }
        };

        const errorCallback = (error) => {
            console.log('Error getting location:', error);
        };

        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    };

    return (
        <div className='search-box'>
            <form onSubmit={handleSubmit} className='search-form'>
                {/* Input box for city name */}
                <Box className='input-box'>
                    <City sx={{ color: 'action.active', mr: 1, my: 0.5, mt: 2.5 }} />
                    <TextField onChange={handleChange} id="city" label="City Name" variant="standard" required value={city} />
                </Box>
                <br />
                {/* Button for searching weather */}
                <Button variant="outlined" type='submit' endIcon={loading ? <CircularProgress size={20} /> : <LocationSearchingIcon />}>
                    {loading ? 'Loading...' : 'Search'}
                </Button>
            </form>
            <br />
            {/* Button for fetching current location */}
            <Button variant="outlined" onClick={fetchCurrentLocation} color="primary" endIcon={loading ? <CircularProgress size={20}
            
            /> : <PinDropIcon />}>
    {loading ? 'Locating...' : 'Locate'}
</Button>
        </div>
    );
}
