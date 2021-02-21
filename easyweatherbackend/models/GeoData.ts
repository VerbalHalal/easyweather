import {model, Schema, Model, Document, connect} from "mongoose";
import config from "../utils/config";

interface IGeoData extends Document {
  ip_from: number;
  ip_to: number;
  cc: string;
  country_name: string;
  region_name: string;
  city_name: string;
}

const geoDataSchema = new Schema({
  ip_from: Number,
  ip_to: Number,
  cc: String,
  country_name: String,
  region_name: String,
  city_name: String
}, {collection: 'GeoData'});

const GeoData: Model<IGeoData> = model('GeoData', geoDataSchema);

connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log(`[MONGODB] Connected sucessfully to ${config.MONGODB_URI}`);
  })
  .catch((error) => {
    if(typeof(error) == "string") 
      console.log(`[MONGODB] ${error}`);
    else
      console.log(`[MONGODB] Unknown error occured.`);
  });

export default GeoData;