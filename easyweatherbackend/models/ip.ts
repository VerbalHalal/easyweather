import mongoose from "mongoose";
import config from "../utils/config";

const ipSchema = new mongoose.Schema({
  ip_from: Number,
  ip_to: Number,
  cc: String,
  country_name: String,
  region_name: String,
  city_name: String
}, {collection: 'WeatherData'});

const WeatherData = mongoose.model('WeatherData', ipSchema);

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log(`[MONGODB] Connected sucessfully to ${config.MONGODB_URI}`);
  })
  .catch((error) => {
    if(typeof(error) == "string") 
      console.log(`[MONGODB] ${error}`);
    else
      console.log(`[MONGODB] Unknown error occured.`);
  });

export default WeatherData;