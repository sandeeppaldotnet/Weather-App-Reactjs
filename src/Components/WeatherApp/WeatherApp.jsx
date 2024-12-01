import React, { useState, useEffect } from 'react';
import './WeatherApp.css';
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";

const WeatherApp = () => {
    const api_key = "962476e63ed6e8a94d5912667fbae07b";

    // State variables to store weather data
    const [weatherData, setWeatherData] = useState({
        location: '',
        temperature: '',
        humidity: '',
        windSpeed: '',
        icon: cloud_icon
    });
    const [city, setCity] = useState('Delhi'); // Default city is Delhi

    const search = async () => {
        if (!city) {
            return; // Do not proceed if input is empty
        }

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`;
            const response = await fetch(url);
            const data = await response.json();

            // Update weather data in the state
            setWeatherData({
                location: data.name,
                temperature: Math.floor(data.main.temp) + "°c",
                humidity: data.main.humidity + " %",
                windSpeed: Math.floor(data.wind.speed) + " km/h",
                icon: getWeatherIcon(data.weather[0].icon)
            });
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    const getWeatherIcon = (iconCode) => {
        switch (iconCode) {
            case '01d':
            case '01n':
                return clear_icon;
            case '02d':
            case '02n':
                return cloud_icon;
            case '03d':
            case '03n':
                return drizzle_icon;
            case '04d':
            case '04n':
                return drizzle_icon;
            case '09d':
            case '09n':
            case '10d':
            case '10n':
                return rain_icon;
            case '13d':
            case '13n':
                return snow_icon;
            default:
                return cloud_icon;
        }
    };

    useEffect(() => {
        // Call search on component load to fetch data for Delhi
        search();
    }, []); // Empty dependency array ensures this runs only once after initial render

    return (
        <div className='container'>
            <div className="top-bar">
                <input
                    type="text"
                    className="cityInput"
                    placeholder='Search'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <div className="search-icon" onClick={search}>
                    <img src={search_icon} alt="Search" />
                </div>
            </div>

            <div className="weather-image">
                <img src={weatherData.icon} alt="Weather Icon" />
            </div>

            <div className={`weather-temp blinking`}>
                {weatherData.temperature || "24°c"}
            </div>
            <div className="weather-location">{weatherData.location || "Delhi"}</div>

            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="Humidity Icon" className="icon" />
                    <div className="data">
                        <div className={`humidity-percent blinking`}>
                            {weatherData.humidity || "64%"}
                        </div>
                        <div className="text">Humidity</div>
                    </div>
                </div>

                <div className="element">
                    <img src={wind_icon} alt="Wind Icon" className="icon" />
                    <div className="data">
                        <div className={`wind-rate blinking`}>
                            {weatherData.windSpeed || "18 km/h"}
                        </div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;
