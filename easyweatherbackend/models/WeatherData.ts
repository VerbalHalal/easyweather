import {model, Schema, Model, Document} from "mongoose";

interface IWeatherData extends Document {
  temperature: string;
  country: string;
  region: string;
  wind_speed: number;
  wind_degree: number;
  cache_time: number;
  observation_time: string;
  weather_descriptions: [string];
  uv_index: number;
  pressure: number;
  query: string;
}

const weatherDataSchema: Schema = new Schema({
  temperature: {type: Number, required: true},
  country: {type: String, required: true},
  region: {type: String, required: true},
  wind_speed: {type: Number, required: true},
  wind_degree: {type: Number, required: true},
  cache_time: {type: Number, required: true},
  observation_time: {type: String, required: true},
  weather_descriptions: {type: [String], required: true},
  uv_index: {type: Number, required: true},
  pressure: {type: Number, required: true},
  query: {type: String, required: true}
}, {collection: 'WeatherData'});

const WeatherData: Model<IWeatherData> = model('WeatherData', weatherDataSchema);

export default WeatherData;