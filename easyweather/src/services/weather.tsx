import axios from "axios";
import { WeatherData, GeoData } from "../types/types";

export const getWeatherData = async (query: string): Promise<WeatherData> => {
  return (await axios.get(`/api/weatherdata/${query}`)).data;
}

export const getGeoData = async (): Promise<GeoData> => {
  return (await axios.get('/api/geodata')).data;
}