import axios from "axios";
import config from "../utils/config";
import { Document } from "mongoose";

interface WeatherStackData extends Document {
  data: {
    location: {
      country: string;
      region: string;
    }
    current: {
      temperature: string;
      windSpeed: number;
      windDegree: number;
      cacheTime: number;
      observationTime: string;
      weatherDescriptions: [string];
      uvIndex: number;
      pressure: number;
    }
  }
}

const weatherStackQuery = (region_name: string): Promise<WeatherStackData> => {
  return axios.get(`http://api.weatherstack.com/current?access_key=${config.API_KEY}&query=${region_name}`);
};

export default {weatherStackQuery};