import React, { useEffect } from "react";
import {getGeoData, getWeatherData} from "./services/weather";
import questionMarkIcon from './icons/question-sign.png';
import settingsIcon from './icons/cog-wheel-silhouette.png';
import sunIcon from './icons/sun.png';
import compassIcon from './icons/compass.png';
import uvIndexIcon from './icons/uv-protection.png';
import pressureIcon from './icons/cylinder.png'; 
import "./App.css";
import { WeatherData } from "./types/types";

const App: React.FC = () => {
  const [showTemperature, setShowTemperature] = React.useState<number>(0);
  const [actualTemperature, setActualTemperature] = React.useState<number>();
  const [description, setDescription] = React.useState<string>();
  const [observationTime, setObservationTime] = React.useState<string>();
  const [region, setRegion] = React.useState<string>();
  const [country, setCountry] = React.useState<string>();
  const [pressure, setPressure] = React.useState<number>();
  const [windSpeed, setWindSpeed] = React.useState<number>();
  const [windDirection, setWindDirection] = React.useState<string>();
  const [windDegree, setWindDegree] = React.useState<number>();
  const [uvIndex, setUvIndex] = React.useState<number>();
  const [showLocation, setShowLocation] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(true);
  const sun = document.getElementById('sunIcon');
  const [error, setError] = React.useState<string>();
  let timeoutID: NodeJS.Timeout;

  const updateScreen = (weatherData: WeatherData) => {
    setActualTemperature(weatherData.temperature);
    setDescription(weatherData.weather_descriptions[0]);
    setObservationTime(weatherData.observation_time);
    setRegion(weatherData.region);
    setCountry(weatherData.country);
    setShowLocation(`${weatherData.region}, ${weatherData.country}`);
    setPressure(weatherData.pressure);
    setWindDegree(weatherData.wind_degree);
    setWindSpeed(weatherData.wind_speed);
    setWindDirection(weatherData.wind_dir);
    setUvIndex(weatherData.uv_index);
  };

  useEffect(() => {
    const fetchData = async () => {
      const geoData = await getGeoData();
      const weatherData = await getWeatherData(geoData.city_name);
      setTimeout(() => {
        setLoading(false);
        updateScreen(weatherData);
      }, 500);
      if(sun) sun.style.opacity = '0%';
    }
    fetchData();
  }, [])

  useEffect(() => {
    if(actualTemperature && actualTemperature != showTemperature) {
      setTimeout(() => {
        if((actualTemperature >= 0 && showTemperature + actualTemperature * 0.01 > actualTemperature) || (actualTemperature < 0 && showTemperature + actualTemperature * 0.01 < actualTemperature)) {
          setShowTemperature(actualTemperature);
        } else {
          setShowTemperature(showTemperature + actualTemperature * 0.01);
        }
      }, Math.abs(showTemperature))
    }
  }, [actualTemperature, showTemperature]);

  const handleSearch = async (query: string) => {
    setLoading(true);
    if(sun) sun.style.opacity = '100%';
    try {
      const weatherData = await getWeatherData(query);
      setTimeout(() => {
        setLoading(false);
        updateScreen(weatherData);
      }, 500);
      if(sun) sun.style.opacity = '0%';
    } catch {
      clearTimeout(timeoutID);
      setError("Invalid Location.");
      setLoading(false);
      timeoutID = setTimeout(() => {
        setError('');
      }, 5000);
      setShowLocation(`${region}, ${country}`);
      if(sun) sun.style.opacity = '0%';
    }
  }

  if(loading) {
    return(
      <>
        <img id="sunIcon" src={sunIcon}/>
      </>
    )
  } else {
    return (
      <div id="all">
        <img id="questionMarkIcon" src={questionMarkIcon}/>
        <img id="settingsIcon" src={settingsIcon}/>
        <div id="locationWrapper">
          <input 
            id="location"
            value={showLocation}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShowLocation(e.target.value)}
            onFocus={() => setShowLocation('')}
            onBlur={() => setShowLocation(`${region}, ${country}`)}
            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {if(e.key === "Enter") handleSearch(showLocation)}}
          />
        </div>
        <h4 id="error">{error}</h4>
        <div id="temperatureWrapper">
          <h2 id="temperatureSign">{Math.sign(showTemperature) == 1 ? '+' : '-'}</h2>
          <h1 id="temperature">{Math.abs(Math.round(showTemperature))}</h1>
          <h2 id="temperatureUnit">°C</h2>
        </div>
        <div id="descriptionWrapper">
          <h2 id="description">{description}</h2>
        </div>
        <div className="horizontalSeparator"></div>
        <div id="advancedInformationWrapper">
          <h3 className="advancedInformationDescription">Wind</h3>
          <div id="windWrapper">
            <div id="compassIconWrapper">
              <img style={{transform: `rotate(${windDegree ? windDegree - 45 : -45}deg)`}} id="compassIcon" src={compassIcon}/>
            </div>
            <div className="verticalSeparator"></div>
            <h3 className="advancedInformationInformation">{windDegree}° {windDirection} {windSpeed}km/h</h3>
          </div>
          <h3 className="advancedInformationDescription">UV-Index</h3>
          <div id="uvIndexWrapper">
            <img src={uvIndexIcon} id="uvIndexIcon"/>
            <div className="verticalSeparator"></div>
            <h3 className="advancedInformationInformation">{uvIndex} | Low</h3>
          </div>
          <h3 className="advancedInformationDescription">Pressure</h3>
          <div id="pressureWrapper">
            <img src={pressureIcon} id="pressureIcon"/>
            <div className="verticalSeparator"></div>
            <h3 className="advancedInformationInformation">{pressure} hPa</h3>
          </div>
        </div>
        <div id="observationTimeWrapper">
          <h3 id="observationTime">Observed at {observationTime}</h3>
        </div>
      </div>
    );
  }
};

export default App;