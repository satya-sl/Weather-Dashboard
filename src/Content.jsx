const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

import React, { useEffect, useState } from 'react';
import DailyForecastChart from './DailyForecastChart'; // Chart component

const StatBox = ({ label, value, icon }) => (
  <div className="w-[45%] flex flex-col items-center hover:scale-105 transition-transform duration-200">
    <img width="50" height="50" src={icon} alt={label} />
    <p className="text-sm mt-1">{value}</p>
    <p className="text-lg font-medium">{label}</p>
  </div>
);

const WeatherCard = ({ day }) => (
  <div className="grid grid-cols-3 items-center gap-2">
    <img
      src={`https:${day.day.condition.icon}`}
      alt="weather"
      className="w-8 h-8 mx-auto"
    />
    <p className="text-lg font-semibold text-black dark:text-white">
      {day.day.avgtemp_c}°C
    </p>
    <p className="text-sm text-gray-900 dark:text-gray-200">{day.date}</p>
  </div>
);

function Content({ city }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=14&aqi=yes&alerts=yes`
        );
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Failed to fetch weather:', error);
      }
    };

    fetchWeather();
  }, [city]);

  if (!weatherData) return <p className="text-white p-6">Loading weather data...</p>;

  const { location, current, forecast } = weatherData;
  const forecastDays = forecast.forecastday; // All 14 days forecast

  // Get the temperature data for the next 14 days for the chart
  const temperatures = forecastDays.map(day => day.day.avgtemp_c);
  const labels = forecastDays.map(day => day.date);

  // For the UI (5-day forecast), show only the next 5 days
  const fiveDayForecast = forecastDays.slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-700 text-white dark:from-[#2a2a2a] dark:via-[#1f1f1f] dark:to-black">
      {/* Main Weather Section */}
      <div className="grid grid-cols-3 gap-6 p-6 mx-4.5">
        {/* Location and Time */}
        <div className="col-span-1 bg-white/10 w-9/10 h-auto p-8 rounded-xl text-black dark:text-white shadow text-center">
          <h3 className="text-2xl font-bold my-5.5">{location.name}</h3>
          <h1 className="text-5xl font-extrabold">{location.localtime.slice(11)}</h1>
          <p className="text-xs font-light">{location.localtime.split(' ')[0]}</p>
        </div>

        {/* Weather Overview */}
        <div className="col-span-2 bg-white/10 p-3 rounded-xl shadow text-center">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-white">
            {/* Left */}
            <div className="basis-1/5 shrink-0 space-y-6 text-center md:text-right">
              <div>
<h1 className="text-5xl font-extrabold text-transparent bg-clip-text 
               bg-gradient-to-l from-white via-gray-900 to-black 
               dark:bg-gradient-to-r dark:from-white dark:via-gray-400 dark:to-black">
  {current.temp_c}°C
</h1>

                <p className="text-sm mt-1">Feels like: {current.feelslike_c}°C</p>
              </div>
              <div>
                <p className="text-xl font-semibold">↑ Sunrise</p>
                <p className="text-lg text-gray-300">{forecast.forecastday[0].astro.sunrise}</p>
              </div>
              <div>
                <p className="text-xl font-semibold">↓ Sunset</p>
                <p className="text-lg text-gray-300">{forecast.forecastday[0].astro.sunset}</p>
              </div>
            </div>

            {/* Center */}
            <div className="basis-1/4 flex flex-col items-center justify-center text-center space-y-4 py-4">
              <img width="104" height="94" src={`https:${current.condition.icon}`} alt={current.condition.text} />
              <p className="text-2xl font-bold">{current.condition.text}</p>
            </div>

            {/* Right */}
            <div className="basis-2/5 flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-4 text-center">
              <StatBox label="Humidity" value={`${current.humidity}%`} icon="https://img.icons8.com/ios/50/moisture.png" />
              <StatBox label="Pressure" value={`${current.pressure_mb} hPa`} icon="https://img.icons8.com/glyph-neue/64/barometer-gauge.png" />
              <StatBox label="Wind Speed" value={`${current.wind_kph} km/h`} icon="https://img.icons8.com/ios-filled/50/wind--v1.png" />
              <StatBox label="UV Index" value={current.uv} icon="https://img.icons8.com/external-bearicons-detailed-outline-bearicons/64/external-UV-alert-and-warning-bearicons-detailed-outline-bearicons.png" />
            </div>
          </div>
        </div>
      </div>

      {/* 14-Day Forecast + Chart */}
      <div className="grid grid-cols-3 gap-6 p-6 mx-4.5">
        {/* 5-Day Forecast */}
        <div className="col-span-1 bg-white/10 dark:bg-white/5 w-9/10 h-auto p-6 rounded-xl shadow text-center">
          <h3 className="text-lg font-bold mb-6 text-black dark:text-white">5 Days Forecast</h3>
          <div className="space-y-4">
            {fiveDayForecast.map((day, index) => (
              <WeatherCard key={index} day={day} />
            ))}
          </div>
        </div>

        {/* Temperature Chart */}
        <div className="col-span-2 bg-gradient-to-r from-gray-100 to-gray-700 dark:from-[#2a2a2a] dark:to-black p-7 rounded-xl shadow text-center">
          {/* Pass 14 days temperature data */}
          <DailyForecastChart labels={labels} temperatures={temperatures} />
        </div>
      </div>
    </div>
  );
}

export default Content;
