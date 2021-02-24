import express from 'express';
import cors from 'cors';
import config from "../utils/config";
import GeoData from "../models/GeoData";
import WeatherData from '../models/WeatherData';
import WeatherStack from '../services/WeatherStack';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

app.get('/api/weatherdata', (req, res) => {
  let ipNumber;
  if(config.NODE_ENV == "PRODUCTION") {
    const ip = req.ip;
    const ipParts = ip.split(":")[3].split('.');
    ipNumber = Number(ipParts[0]) * 256 * 256 * 256 + Number(ipParts[1]) * 256 * 256 + Number(ipParts[2]) * 256 + Number(ipParts[3]);
  }
  
  GeoData.findOne({ip_from: {"$lte": ipNumber || 755357696 }, ip_to: {"$gte": ipNumber || 755357696}}) 
    .then(geodata => {
      if(geodata) {
        console.log("first");
        WeatherData.findOne({region: geodata.region_name})
          .then((weatherdata) => {
            console.log("second", weatherdata);
            const d = new Date();
            console.log("third", d.getTime());
            if(weatherdata && d.getTime() - weatherdata.cacheTime < 300000) {
              res.json(weatherdata);
            } else {
              console.log("fourth");
              WeatherStack.weatherStackQuery(geodata.city_name)
                .then((weatherstackdata) => {
                  console.log("fifth", weatherstackdata);
                  res.json({...weatherstackdata.data.location, ...weatherstackdata.data.current});
                })
                .catch((error) => {
                  console.error(error);
                });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});