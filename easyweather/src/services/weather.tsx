import axios from "axios";
import { WeatherData } from "../types/types";

export const getWeatherData = async (): Promise<WeatherData> => {
  return (await axios.get('/api/weatherdata')).data;
}