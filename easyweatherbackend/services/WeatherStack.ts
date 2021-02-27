import axios from "axios";
import config from "../utils/config";
import { Document } from "mongoose";

interface WeatherStackData extends Document {
  data: {
    request: {
      query: string;
    }
    location: {
      country: string;
      region: string;
    }
    current: {
      temperature: string;
      wind_speed: number;
      wind_degree: number;
      observation_time: string;
      weather_descriptions: [string];
      uv_index: number;
      pressure: number;
    }
  }
}

const weatherStackQuery = (region_name: string): Promise<WeatherStackData> => {
  return axios.get(`http://api.weatherstack.com/current?access_key=${config.API_KEY}&query=${region_name}`);
};

export default {weatherStackQuery};