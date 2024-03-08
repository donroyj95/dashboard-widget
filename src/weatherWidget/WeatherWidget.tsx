import React, { useEffect, useState } from "react";
import { fetchWeatherData } from "network/fetchWeatherData";

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);

  // State to store the current location coordinates
  const [{ longitude, latitude }, setLocation] = useState({
    longitude: null,
    latitude: null,
  });

  useEffect(() => {
    // Fetch the current location coordinates using the Geolocation API
    navigator.geolocation.getCurrentPosition((location) => {
      if (location.coords) {
        // Update the state with the retrieved coordinates
        setLocation({
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
        });
      }
    });
  }, []);

  useEffect(() => {
    // Fetch weather data based on the current location coordinates
    if (!longitude || !latitude) return;

    fetchWeatherData({ longitude, latitude }).then((response) => {
      if (response && response.data) {
        // Update the state with the fetched weather data
        setWeather(response.data);
      }
    });
  }, [longitude, latitude]);

  return (
    <div>
      {weather ? (
        <div>
          {/* Display the current weather information */}
          <h2>Current Weather</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Description: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>City: {weather.name}</p>
        </div>
      ) : (
        // Display a loading message while weather data is being fetched
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherWidget;