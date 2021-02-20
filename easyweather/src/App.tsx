import React, { useEffect } from "react";
import {getWeatherData} from "./services/weather";

const backgroundStyle = {
  backgroundColor: "#163182",
  height: "100vh",
  width: "100vw",
  display: "flex",
  alignItems: "center",
  flexDirection: "column" as const
};

const temperatureWrapperStyle = {
  flex: "3",
  textAlign: "center" as const
}

const temperatureStyle = {
  fontFamily: "Bebas Neue, cursive",
  fontSize: "70px",
  color: "white",
  paddingLeft: "12px",
};

const locationWrapperStyle = {
  flex: "1"
}

const locationStyle = {
  marginTop: "10px",
  fontFamily: "Montserrat",
  fontSize: "20px",
  color: "white",
}

const descriptionStyle = {
  color: "white",
  fontFamily: "Bebas Neue, cursive",
  fontSize: "22px",
  letterSpacing: "0.6px",
  paddingLeft: "10px"
}

const App: React.FC = () => {
  const [temperature, setTemperature] = React.useState<string>();
  const [country, setCountry] = React.useState<string>();
  const [city, setCity] = React.useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      const weatherData = await getWeatherData();
      //setTemperature(weatherData.temperature);
      setCountry(weatherData.country_name);
      setCity(weatherData.region_name);
    }
    fetchData();
  }, [])

  return (
    <div style={backgroundStyle}>
      <div style={locationWrapperStyle}>
        <h2 style={locationStyle}>{city}, {country}</h2>
      </div>
      <div style={temperatureWrapperStyle}>
        <h1 style={temperatureStyle}>{temperature}<span style={{"fontSize": "30px"}}>K</span></h1>
        <h3 style={descriptionStyle}>Patches Of Fog</h3>
      </div>
    </div>
  )
};

export default App;