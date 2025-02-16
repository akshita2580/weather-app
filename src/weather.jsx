import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faCloud,
  faCloudRain,
  faWind,
  faTint,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "c5668cd45dccd064a9db47938a1d2cc2"; // Store your API key in .env
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setWeatherData(response.data);
      setError("");
    } catch (err) {
      setError("City not found. Please try again.");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case "Clear":
        return faSun;
      case "Clouds":
        return faCloud;
      case "Rain":
        return faCloudRain;
      default:
        return faCloud;
    }
  };

  return (
    <div className="weather-container">
      <h1 className="app-title">Real-Time Weather Forecast</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && fetchWeather()}
        />
        <button onClick={fetchWeather}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      {loading && <div className="loader"></div>}
      {error && <p className="error">{error}</p>}
      {weatherData && (
        <div className="weather-info">
          <div className="weather-header">
            <h2>
              {weatherData.name}, {weatherData.sys.country}
            </h2>
            <FontAwesomeIcon
              icon={getWeatherIcon(weatherData.weather[0].main)}
              size="3x"
              className="weather-icon"
            />
          </div>
          <div className="weather-details">
            <p>
              <FontAwesomeIcon icon={faSun} /> Temperature:{" "}
              {weatherData.main.temp}°C
            </p>
            <p>
              <FontAwesomeIcon icon={faCloud} /> Weather:{" "}
              {weatherData.weather[0].description}
            </p>
            <p>
              <FontAwesomeIcon icon={faTint} /> Humidity:{" "}
              {weatherData.main.humidity}%
            </p>
            <p>
              <FontAwesomeIcon icon={faWind} /> Wind Speed:{" "}
              {weatherData.wind.speed} m/s
            </p>
            <p>
              <FontAwesomeIcon icon={faCloudRain} /> Rain:{" "}
              {weatherData.rain ? `${weatherData.rain["1h"]} mm` : "0 mm"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;