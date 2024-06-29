/**
 * InfoBox component
 *
 * Displays weather information in a card format.
 *
 * @param {object} info - Weather information object
 * @param {string} info.City - City name
 * @param {string} info.weather - Weather description
 * @param {number} info.temp - Current temperature in Celsius
 * @param {number} info.feels_like - Feels like temperature in Celsius
 * @param {number} info.min_temp - Minimum temperature in Celsius
 * @param {number} info.max_temp - Maximum temperature in Celsius
 * @param {number} info.humidity - Humidity percentage
 *
 * @example
 * <InfoBox
 *   info={{
 *     City: 'New York',
 *     weather: 'Sunny',
 *     temp: 25.5,
 *     feels_like: 23.2,
 *     min_temp: 20.1,
 *     max_temp: 28.3,
 *     humidity: 60
 *   }}
 * />
 *
 * @returns {React.ReactElement} InfoBox component
 */
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './InfoBox.css';
export default function InfoBox({ info }) {
  // Check if info has data by checking for a specific property, e.g., info.City
  const hasData = info && info.City;

  return (
    <div className="InfoBox">
      {hasData ? (
        <Card sx={{ maxWidth: 345 }} style={{ background: "Transparent" }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {info.City} - {info.weather}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Temperature: {(info.temp?.toFixed(2) ?? 'N/A')}°C<br />
              Feels Like: {(info.feels_like?.toFixed(2) ?? 'N/A')}°C<br />
              Min Temp: {(info.min_temp?.toFixed(2) ?? 'N/A')}°C<br />
              Max Temp: {(info.max_temp?.toFixed(2) ?? 'N/A')}°C<br />
              Humidity: {info.humidity ?? 'N/A'}%
            </Typography>
          </CardContent>
        </Card>
      ) : "☁️"}
    </div>
  );
}