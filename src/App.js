// ✅ Weather App in React.js using OpenWeatherMap API
// This file is App.js

import React, { useState } from "react";
import "./App.css";

const API_KEY = "938ec5d0b621d822d865c949f4cb35b9"; // Replace this with your actual API key from https://openweathermap.org/api

const cityList = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Kolkata",
  "Chennai",
  "Pune",
  "London",
  "New York",
  "Paris",
  "Tokyo"
];

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();
    console.log(data);
    if (data.cod === "404") {
      setError("City not found. Please select a valid city.");
      setWeather(null);
    } else {
      setError("");
      setWeather(data);
    }
  };

  return (
    <div className="app">
      <h1>🌦 Weather App</h1>

      <div className="search-box" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ padding: "10px", fontSize: "16px", borderRadius: "8px", width: "200px" }}
        >
          <option value="">Select City</option>
          {cityList.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <button onClick={fetchWeather} style={{ padding: "10px 15px", fontSize: "16px", borderRadius: "8px", backgroundColor: "#007bff", color: "white", border: "none", fontWeight: "bold", cursor: "pointer" }}>Search</button>
      </div>

      {error && <p className="info-text" style={{ color: "red" }}>{error}</p>}

      {weather && weather.main ? (
        <div className="weather-box">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <h3>{weather.main.temp}°C</h3>
          <p>{weather.weather[0].description}</p>
        </div>
      ) : (
        !error && <p className="info-text">Search a city to get weather details</p>
      )}
    </div>
  );
}

export default App;
