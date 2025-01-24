import React, { useEffect, useState } from "react";
import "./Weather.css";
import WeatherCard from "../components/common/WeatherCard";
import CloudIcon from "../assets/cloud-icon.png";
import CloudBigIcon from "../assets/cloud_big_icon.png";
import { BsThermometerHalf } from "react-icons/bs";
import { FiWind } from "react-icons/fi";
import { LuDroplets } from "react-icons/lu";
import { RxTimer } from "react-icons/rx";
import axios from "axios";

const getTodaysHourlyForecast = (forecastData) => {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() / 1000; // Start of today in seconds
  const tomorrowStart = todayStart + 86400; // Start of tomorrow

  // Filter to include only today's hourly data
  return forecastData.list.filter((item) => item.dt >= todayStart && item.dt < tomorrowStart);
};

const WeatherApp = () => {
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecastWeather, setForecastWeather] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputCity, setInputCity] = useState("Delhi");
  const [forecastList, setForecastList] = useState([]);

  const getTodayWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const weatherRequest = axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=64f60853740a1ee3ba20d0fb595c97d5&units=metric`,
      );

      const forecastRequest = axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${inputCity}&appid=64f60853740a1ee3ba20d0fb595c97d5&units=metric`,
      );

      const [weatherResponse, forecastResponse] = await Promise.all([weatherRequest, forecastRequest]);

      setCurrentWeather(weatherResponse.data);
      setForecastWeather(getTodaysHourlyForecast(forecastResponse.data));

      const rawForecastList = forecastResponse.data.list;
      const dailyData = rawForecastList.reduce((acc, curr) => {
        const date = curr.dt_txt.split(" ")[0]; // Extract date
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(curr);
        return acc;
      }, {});

      const processedData = Object.entries(dailyData)
        .slice(0, 7)
        .map(([date, forecasts]) => {
          const temps = forecasts.map((f) => f.main.temp);
          const minTemp = Math.min(...temps);
          const maxTemp = Math.max(...temps);
          const weatherDescription = forecasts[0].weather[0].description;
          const weatherIcon = forecasts[0].weather[0].icon;

          return {
            date,
            minTemp,
            maxTemp,
            weatherDescription,
            weatherIcon,
          };
        });

      setForecastList(processedData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Error fetching weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getTodayWeather();
  };

  useEffect(() => {
    getTodayWeather();
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="weather_app">
          <div className="weather_search_bar">
            <form onSubmit={handleSearch}>
              <input
                type="search"
                placeholder="Search for cities"
                value={inputCity}
                onChange={(e) => setInputCity(e.target.value)}
                className="search"
              />
            </form>
          </div>
          <div className="weather_inside_container">
            <div className="weather_update_container">
              <div className="weather_conatiner_width_circle">
                <div className="weather_update">
                  <h2>{currentWeather.name || "NA"}</h2>
                  <h5>{currentWeather?.weather?.[0]?.description || "NA"}</h5>
                  <h1>
                    {currentWeather?.main?.temp !== undefined ? `${Math.round(currentWeather.main.temp)}` : "NA"}{" "}
                    <sup>°</sup>C
                  </h1>
                </div>
                <div className="weather_main_icon">
                  <img src={CloudBigIcon} alt="Weather Icon" />
                </div>
              </div>
              <WeatherCard>
                <p>TODAY FORECAST</p>
                <div className="weather-container">
                  {forecastWeather.map((item, index) => {
                    const forecastTime = new Date(item.dt * 1000);
                    const formattedTime = forecastTime.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                    const iconUrl = item?.weather?.[0]?.icon
                      ? `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`
                      : CloudIcon;

                    return (
                      <div key={index} className="weather_day_timing">
                        <span>{formattedTime}</span>
                        <img src={iconUrl} alt={item?.weather?.[0]?.description || "Icon"} />
                        <h5>
                          {Math.round(item?.main?.temp)} <sup>°</sup>C
                        </h5>
                      </div>
                    );
                  })}
                </div>
              </WeatherCard>
              <WeatherCard>
                <div className="weather_condition">
                  <p>AIR CONDITIONS</p>
                  <span>See More</span>
                </div>
                <div className="weather_forecasting_fahrenheit">
                  <div className="weather_forecasting__inside">
                    <BsThermometerHalf className="text-white mt-1 text-xl" />
                    <div>
                      <span>Real Feel</span>
                      <h5>
                        {currentWeather?.main?.feels_like !== undefined
                          ? `${Math.round(currentWeather.main.feels_like)}`
                          : "NA"}{" "}
                        <sup>°</sup>C
                      </h5>
                    </div>
                  </div>
                  <div className="weather_forecasting__inside">
                    <FiWind className="text-white mt-1 text-xl" />
                    <div>
                      <span>Wind Speed</span>
                      <h5>{currentWeather?.wind?.speed ? `${currentWeather.wind.speed} km/h` : "NA"}</h5>
                    </div>
                  </div>
                </div>
                <div className="weather_forecasting_fahrenheit">
                  <div className="weather_forecasting__inside">
                    <RxTimer className="text-white mt-1 text-xl" />
                    <div>
                      <span>Pressure</span>
                      <h5>{currentWeather?.main?.pressure || "NA"}</h5>
                    </div>
                  </div>
                  <div className="weather_forecasting__inside">
                    <LuDroplets className="text-white mt-1 text-xl" />
                    <div>
                      <span>Humidity</span>
                      <h5>{currentWeather?.main?.humidity || "NA"}</h5>
                    </div>
                  </div>
                </div>
              </WeatherCard>
            </div>
            <div className="weather_week_forecast">
              <WeatherCard>
                <p>7 DAY FORECAST</p>
                <div className="weather_week__container">
                  {forecastList.map((day, index) => (
                    <div key={index} className="day__container">
                      <div className="week__name">
                        <span>
                          {new Date(day.date).toLocaleDateString("en-US", {
                            weekday: "short",
                          })}
                        </span>
                      </div>
                      <div className="weather_icons">
                        <img
                          src={`https://openweathermap.org/img/wn/${day.weatherIcon}@2x.png`}
                          alt={day.weatherDescription || "Icon"}
                        />
                        <span>{day.weatherDescription || "NA"}</span>
                      </div>
                      <div>
                        <h5>
                          {Math.round(day.maxTemp)} / <span>{Math.round(day.minTemp)}</span>
                        </h5>
                      </div>
                    </div>
                  ))}
                </div>
              </WeatherCard>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WeatherApp;
