import React, { useState } from 'react';

import './App.css';
import searchIcon from './images/search.gif';
import sunIcon from './images/sun.png';
import rainIcon from './images/rain.png'
import snowIcon from './images/snow.jpeg';
import cloudIcon from './images/cloud.png';
import drizzleIcon from './images/drizzle.png';
import windIcon from './images/wind.jpg';
import humidityIcon from './images/humidity.png';


const WeatherDetails = ({ icon, temp, city, country, lat, long, wind, humidity }) => {
  return (
    <>
      <div className='image'>
        <img src={icon} alt='Image'></img>

      </div>
      <div className='temp'>{temp}°C</div>
      <div className='city'>{city}</div>
      <div className='country'>{country}</div>
      <div className='cord'>
        <div>
          <span className='lat'>Latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className='long'>Longitude</span>
          <span>{long}</span>
        </div>
      </div>
      <div className='data-container'>
        <div className='element'>
          <img src={humidityIcon} className='icon' alt='humidity'></img>
          <div className='data'>
            <div className='humidity-percent'>{humidity}%</div>
            <div className='text'>Humidity</div>
          </div>
        </div>
        <div className='element'>
          <img src={windIcon} className='icon' alt='wind'></img>
          <div className='data'>
            <div className='wind-percent'>{wind} km / h</div>
            <div className='text'>Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  );
}


function App() {
  let api_key = 'd09f5ffb548e881ca236d853bb0f5af4';

  let [text, setText] = useState('Chennai')
  let [icon, setIcon] = useState(snowIcon);
  let [temp, setTemp] = useState(0);
  let [city, setCity] = useState("Chennai");
  let [country, setCountry] = useState('IN');
  let [lat, setLat] = useState(0);
  let [long, setLong] = useState(0);
  let [humidity, setHumidity] = useState(0);
  let [wind, setWind] = useState(0);
  let [citynotfound, setCitynotFound] = useState(false);
  let [loading, setLoading] = useState(false);



  let WeatherIconApp = {
    "01d": sunIcon,
    "01n": sunIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": drizzleIcon,
    "03n": drizzleIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon

  };


  let search = async () => {

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      if (data.cod === "404") {
        console.log("City Not Found")
        citynotfound(true);
        setLoading(false);
        return;
      }

      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLong(data.coord.lon);

      let weatherIconCode =data.weather[0].icon;
      setIcon(WeatherIconApp[weatherIconCode] || sunIcon);
      setCitynotFound(false);

    } catch (error) {
      console.error("An error occured:", error.message);
    } finally {
      setLoading(false)
    }
  }
  let handleCity = (e) => {
    setText(e.target.value);
  }

  let handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  }

  return (
    <>
      <div className='container'>
        <div className='input-container'>
          <input type='text' className='cityInput' placeholder='Search City' onChange={handleCity} value={text} onKeyDown={handleKeyDown}></input>
          <div className='search-icon' onClick={() => search()}>
            <img src={searchIcon} alt='Search' />
          </div>
        </div>
        <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} long={long} humidity={humidity} wind={wind} />
      </div>
    </>
  );
}

export default App;
