import React, { useEffect } from "react";
import {getWeatherData} from "./services/weather";
import questionMarkIcon from './icons/question-sign.png';
import settingsIcon from './icons/cog-wheel-silhouette.png';
import sunIcon from './icons/sun.png';
import "./App.css";

const App: React.FC = () => {
  const [showTemperature, setShowTemperature] = React.useState<number>(0);
  const [actualTemperature, setActualTemperature] = React.useState<number>();
  const [description, setDescription] = React.useState<string>();
  const [observationTime, setObservationTime] = React.useState<string>();
  const [region, setRegion] = React.useState<string>();
  const [country, setCountry] = React.useState<string>();
  const btc = Math.tanh(0.05*showTemperature); // The so-called "backgroundtransitioncoefficient"
  const [showLocation, setShowLocation] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(true);
  const temperature = document.getElementById('temperature');
  if(temperature) temperature.style.color = `rgb(${166 + btc * 89},${170 + btc * -61},${163 + btc * -87})`;

  useEffect(() => {
    const fetchData = async () => {
      const weatherData = await getWeatherData();
      const sun = document.getElementById('sunIcon');
      if(sun) sun.style.opacity = '0';
      setTimeout(() => {
        //setLoading(false);
        //setActualTemperature(20);
        //setCountry('Germany');
        //setRegion('Bayern');
        //setDescription('Clear sky');
        //setObservationTime('8:43 PM');
        //setShowLocation(`Bayern, Germany`);
        setLoading(false);
        setDescription(weatherData.weather_descriptions[0]);
        setActualTemperature(weatherData.temperature);
        setObservationTime(weatherData.observation_time);
        setCountry(weatherData.country);
        setRegion(weatherData.region);
        setShowLocation(`${weatherData.region}, ${weatherData.country}`);
      }, 500)
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
            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) =>{ if(e.key === 'Enter') alert("OI!")}}
          />
        </div>
        <div id="temperatureWrapper">
          <h2 id="temperatureSign">{Math.sign(showTemperature) == 1 ? '+' : '-'}</h2>
          <h1 id="temperature">{Math.abs(Math.round(showTemperature))}</h1>
          <h2 id="temperatureUnit">°C</h2>
        </div>
        <div id="descriptionWrapper">
          <h2 id="description">{description}</h2>
        </div>
        <div id="observationTimeWrapper">
          <h3 id="observationTime">Observed at {observationTime}</h3>
        </div>
      </div>
    );
  }
};

export default App;