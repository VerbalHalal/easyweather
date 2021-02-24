import React, { useEffect } from "react";
import {getWeatherData} from "./services/weather";
import questionMarkIcon from './icons/question-sign.png';
import settingsIcon from './icons/cog-wheel-silhouette.png';

const allStyle = {
  position: 'relative' as const,
  width: '100vw',
  height: '100vh'
}

const locationWrapperStyle = {
  position: 'absolute' as const,
  top: '10px',
  width: '100%',
  textAlign: 'center' as const
}

const locationStyle = {
  fontFamily: "Montserrat",
  fontSize: "20px",
  color: "black"
}

const temperatureWrapperStyle = {
  position: 'absolute' as const,
  top: '30%',
  left: '50%',
  display: 'flex',
  transform: 'translate(-50%, -50%)',
  alignItems: 'center'
}

const temperatureStyle = {
  fontFamily: 'IBM Plex Mono, monospace',
  fontSize: "130px",
  color: "black"
}

const temperatureSignStyle = {
  fontFamily: 'IBM Plex Mono, monospace',
  fontSize: "80px",
  color: "black"
}

const temperatureUnitStyle = {
  fontFamily: 'IBM Plex Mono, monospace',
  fontSize: "40px",
  color: "black",
  alignSelf: "baseline"
}

const observationTimeWrapperStyle = {
  backgroundColor: 'lightgreen',
  width: '100%',
  position: 'absolute' as const,
  top: '100%',
  left: '50%',
  transform: 'translate(-50%, -100%)',
  textAlign: 'center' as const,
}

const observationTimeStyle = {
  fontFamily: "Montserrat"
}

const temperatureDescriptionStyle = {
  position: 'absolute' as const,
  color: "black",
  fontFamily: 'IBM Plex Mono, monospace',
  fontSize: "30px",
  letterSpacing: "0.6px",
  top: 'calc(30% + 85px)',
  width: '100%',
  textAlign: 'center' as const
}

const questionMarkStyle = {
  position: 'absolute' as const,
  top: '10px',
  left: '10px',
  width: '24px',
  height: '24px'
}

const settingsStyle = {
  position: 'absolute' as const,
  top: '10px',
  right: '10px',
  width: '24px',
  height: '24px'
}

const App: React.FC = () => {
  const [showTemperature, setShowTemperature] = React.useState<number>(0);
  const [actualTemperature, setActualTemperature] = React.useState<number>();
  const [country, setCountry] = React.useState<string>();
  const [city, setCity] = React.useState<string>();
  const [description, setDescription] = React.useState<string>();
  const [observationTime, setObservationTime] = React.useState<string>();
  /*
  const backgroundTransitionCoefficient = Math.tanh(0.05*showTemperature);
  
  const backgroundStyle = {
    backgroundColor: `rgb(${166 + backgroundTransitionCoefficient * 89},${170 + backgroundTransitionCoefficient * -61},${163 + backgroundTransitionCoefficient * -87})`,
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column" as const
  };*/

  useEffect(() => {
    const fetchData = async () => {
      const weatherData = await getWeatherData();
      setCountry(weatherData.country);
      setCity(weatherData.region);
      setDescription(weatherData.weather_descriptions[0]);
      setActualTemperature(weatherData.temperature);
      setObservationTime(weatherData.observation_time);
      //setActualTemperature(-20);
      //setCountry('Germany');
      //setCity('Bayern');
      //setDescription('Clear sky');
      //setObservationTime('8:43 PM');
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

  return (
    <div style={allStyle}>
      <img src={questionMarkIcon} style={questionMarkStyle}/>
      <img src={settingsIcon} style={settingsStyle}/>
      <div style={locationWrapperStyle}>
        <h2 style={locationStyle}>{city}, {country}</h2>
      </div>
      <div style={temperatureWrapperStyle}>
        <h2 style={temperatureSignStyle}>{Math.sign(showTemperature) == 1 ? '+' : '-'}</h2>
        <h1 style={temperatureStyle}>{Math.abs(Math.round(showTemperature))}</h1>
        <h2 style={temperatureUnitStyle}>°C</h2>
      </div>
      <div style={temperatureDescriptionStyle}>
        <h2>{description}</h2>
      </div>
      <div style={observationTimeWrapperStyle}>
        <h3 style={observationTimeStyle}>Observed at {observationTime}</h3>
      </div>
    </div>
  );
};

export default App;