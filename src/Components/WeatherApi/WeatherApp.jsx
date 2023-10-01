import '../WeatherApi/WeatherApi.css';
import clearIcon  from '../Assets/clear.png';
import cloudIcon  from '../Assets/cloud.png';
import drizzleIcon  from '../Assets/drizzle.png';
import humidityIcon  from '../Assets/humidity.png';
import rainIcon  from '../Assets/rain.png';
import searchIcon  from '../Assets/search.png';
import snowIcon  from '../Assets/snow.png';
import windIcon  from '../Assets/wind.png';
import React, {useEffect, useState} from 'react';

const WeatherApp = () => {
    const api_key = "e83ea5383736671545bd5932deff846f";
    const [wicon, setWicon] = useState(cloudIcon);
    useEffect(()=> {
        search();
    },[]);
    const convertMsToTime = (millisecond) =>
    {
        let second = (millisecond / 1000);
        let minuts = (second / 60);
        let hours = (minuts / 60);
        second = Math.floor(second % 60);
        minuts = Math.floor(minuts % 60);
        hours = Math.floor(hours % 24);
        
        return `${hours}:${minuts}`;
    }
    const search = async () => {
        let millisecond = "";
        let cityInput = document.getElementsByClassName('cityInput');
        let cityValue = cityInput[0].value;
        if(cityValue === ""){
            cityValue = "Islamabad";
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=Metric&appid=${api_key}`;
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
        let weatherTem = document.getElementsByClassName('weather-temp');
        let weatherLocation = document.getElementsByClassName('weather-location');
        let humidityPercent = document.getElementsByClassName('humidity-percent');
        let windSpeed = document.getElementsByClassName('wind-speed');
        let FeelsLike = document.getElementsByClassName('FeelsLike');
        let sunSetHourMints = convertMsToTime(data.sys.sunset);
        let sunRiseHourMints = convertMsToTime(data.sys.sunrise);

        weatherTem[0].innerHTML = Math.floor(data.main.temp) + "°c";
        weatherLocation[0].innerHTML = data.name;
        weatherLocation[0].innerHTML = data.name;
        humidityPercent[0].innerHTML = data.main.humidity + " %";
        windSpeed[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
        FeelsLike[0].innerHTML = "Feels Like : " + Math.floor(data.main.feels_like) + "°c; Country Name : " + data.sys.country + "; Sun-Rise : " +sunRiseHourMints+ "; Sun-Set : " +sunSetHourMints;
        if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n"){
            setWicon(clearIcon);
        }else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n"){
            setWicon(drizzleIcon);
        }else if((data.weather[0].icon === "09d" || data.weather[0].icon === "09n") || (data.weather[0].icon === "10d" || data.weather[0].icon === "10n")){
            setWicon(rainIcon);
        }else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n"){
            setWicon(snowIcon)
        }else{
            setWicon(cloudIcon);
        }
    }
    return(
        <div className='container'>
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder='Search' />
                <div className="search-icon" onClick={() => { search()}}>
                    <img src={searchIcon} />
                </div>
            </div>
            <div className="weather-image">
                <img src={wicon} alt="" />
            </div>
            <div className="weather-temp">20°c</div>
            <div className="weather-location">London</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidityIcon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">64%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={windIcon} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-speed">18 km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
            <marquee>
                <h5 className='FeelsLike'></h5>
            </marquee>
        </div>
    )
}

export default WeatherApp;