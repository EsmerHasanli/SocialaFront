import React, { useEffect, useState } from 'react';
import "./index.scss";
import { CircularProgress, Box } from '@mui/material';

const WeatherCard = () => {
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(true);
  
  const apiKey = '5f43004ef8e3864485688a2dd89f1517';
  const city = 'Baku';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Weather data:', data);
        setData(data);
        setLoader(false); 
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        setLoader(false); 
      });
  }, []);

  return (
    <>
      {loader && <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>}
      {data && 
        <div id="weather-card-wrapper">
          <div class="cardContainer">
            <div class="card">
              <p class="city">{data?.name}</p>
              <p class="weather">{data?.weather[0]?.description}</p>
              <img src={data?.weather[0]?.icon} alt="" />
              <p class="temp">{Math.floor(data?.main?.temp)}°</p>
              <div class="minmaxContainer">
                <div class="min">
                  <p class="minHeading">Min</p>
                  <p class="minTemp">{Math.floor(data?.main?.temp_min)}°</p>
                </div>
                <div class="max">
                  <p class="maxHeading">Max</p>
                  <p class="maxTemp">{Math.floor(data?.main?.temp_max)}°</p>
                </div>
              </div>
            </div>
          </div>
        </div>}
    </>  
  );
};

export default WeatherCard;
