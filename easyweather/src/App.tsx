import React, { useEffect } from "react";
import {getWeatherData} from "./services/weather";



const temperatureWrapperStyle = {
  flex: "3",
  textAlign: "center" as const
}

const temperatureStyle = {
  fontFamily: "Bebas Neue, cursive",
  fontSize: "150px",
  color: "black"
};

const temperatureSignStyle = {
  fontFamily: "Bebas Neue, cursive",
  fontSize: "80px",
  color: "black",
  width: "40px"
}

const locationWrapperStyle = {
  flex: "1"
}

const locationStyle = {
  marginTop: "10px",
  fontFamily: "Montserrat",
  fontSize: "20px",
  color: "black",
}

const descriptionStyle = {
  color: "black",
  fontFamily: "Bebas Neue, cursive",
  fontSize: "30px",
  letterSpacing: "0.6px",
  paddingLeft: "10px"
}

const temperatureUnitStyle = {
  fontFamily: "Bebas Neue, cursive",
  fontSize: "40px",
  color: "black",
  width: "40px",
  alignSelf: "flexEnd"
}

const App: React.FC = () => {
  const [showTemperature, setShowTemperature] = React.useState<number>(0);
  const [actualTemperature, setActualTemperature] = React.useState<number>();
  const [country, setCountry] = React.useState<string>();
  const [city, setCity] = React.useState<string>();
  const [description, setDescription] = React.useState<string>();

  const backgroundStyle = {
    backgroundColor: `rgb(${190 + 0.1*showTemperature/(1+Math.abs(0.1*showTemperature)) * 56},${180 + 0.1*showTemperature/(1+Math.abs(0.1*showTemperature)) * -7},${131 + 0.1*showTemperature/(1+Math.abs(0.1*showTemperature)) * -86})`,
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    flexDirection: "column" as const
  };

  useEffect(() => {
    const fetchData = async () => {
      const weatherData = await getWeatherData();
      setActualTemperature(weatherData.temperature);
      setCountry(weatherData.country);
      setCity(weatherData.region);
      setDescription(weatherData.weather_descriptions[0]);
    }
    fetchData();
  }, [])

  useEffect(() => {
    if(actualTemperature && actualTemperature != showTemperature) {
      setTimeout(() => {
        if((actualTemperature >= 0 && showTemperature + actualTemperature * 0.01 > actualTemperature) || (actualTemperature < 0 && showTemperature + actualTemperature * 0.01 < actualTemperature)) {
          setShowTemperature(actualTemperature);
          console.log(backgroundStyle.backgroundColor);
        } else {
          setShowTemperature(showTemperature + actualTemperature * 0.01);
        }
      }, Math.abs(showTemperature))
    }
  }, [actualTemperature, showTemperature]);

  return (
    <div style={backgroundStyle}>
      <div style={locationWrapperStyle}>
        <h2 style={locationStyle}>{city}, {country}</h2>
      </div>
      <div style={temperatureWrapperStyle}>
        <div style={{"display": "flex", "justifyContent": "center", "alignItems": "center"}}>
          <h3 style={temperatureSignStyle}>{Math.sign(showTemperature) ? "+" : "-"}</h3>
          <h1 style={temperatureStyle}>{Math.round(showTemperature)}</h1>
          <h3 style={temperatureUnitStyle}>°C</h3>
        </div>
        <h3 style={descriptionStyle}>{description}</h3>
      </div>
    </div>
  )
};

export default App;