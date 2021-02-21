import {model, Schema, Model, Document} from "mongoose";

interface IWeatherData extends Document {
  temperature: string;
  country: string;
  region: string;
  windSpeed: number;
  windDegree: number;
  cacheTime: number;
  observationTime: string;
  weatherDescriptions: [string];
  uvIndex: number;
  pressure: number;
}

const weatherDataSchema: Schema = new Schema({
  temperature: {type: Number, required: true},
  country: {type: String, required: true},
  region: {type: String, required: true},
  windSpeed: {type: Number, required: true},
  windDegree: {type: Number, required: true},
  cacheTime: {type: Number, required: true},
  observationTime: {type: String, required: true},
  weatherDescriptions: {type: [String], required: true},
  uvIndex: {type: Number, required: true},
  pressure: {type: Number, required: true}
}, {collection: 'WeatherData'});

const WeatherData: Model<IWeatherData> = model('WeatherData', weatherDataSchema);

export default WeatherData;