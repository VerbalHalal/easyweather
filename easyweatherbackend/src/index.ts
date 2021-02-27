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

app.get('/api/weatherdata/:query', (req, res) => {
  const {query} = req.params;
  if(query) {
    WeatherData
      .findOne({$or: [{country: query}, {region: query}, {query: query}]})
      .then(weatherdata => {
        const d = new Date();
        if(weatherdata) {
          if(d.getTime() - weatherdata.cache_time < 300000) {
            res.status(200).json(weatherdata);
          } else {
            if(typeof weatherdata._id === 'string') 
              <unknown>WeatherData.deleteOne({_id: weatherdata._id});
          }
        } else {
          WeatherStack
            .weatherStackQuery(query)
            .then((weatherstackdata) => {
              if(weatherstackdata.data) {
                const newWeatherData = new WeatherData({...weatherstackdata.data.current, 
                  ...weatherstackdata.data.location, 
                  query: weatherstackdata.data.request?.query, 
                  cache_time: d.getTime()});
                newWeatherData
                  .save()
                  .then((newweatherdata) => {
                    res.status(200).json(newweatherdata);
                  })
                  .catch((e: string) => {
                    console.log(e);
                  });
              } else {
                res.status(500).json({error: `Welp. This shouldn't happen!`});
              }
            })
            .catch((e: string) => {
              res.status(500).json({error: `Error looking up WeatherData. ${e}`});
            });
        }
      })
      .catch((e: string) => {
        res.status(500).json({error: `Error looking up cached WeatherData. ${e}`});
      });
  } else {
    res.status(400).json({error: 'Unspecified query.'});
  }
});

app.get('/api/geodata', (req, res) => {
  const ip = req.ip.split(':').pop()?.split('.').map(n => Number(n)); // ':ffff::127.0.0.1' => ['', 'ffff', '', '127.0.0.1'] => '127.0.0.1' => ['127','0','0','1'] => [127,0,0,1]
  if(ip) {
    const ipNumber = ip[0] * Math.pow(256, 3) + ip[1] * Math.pow(256, 2) + ip[2] * Math.pow(256, 1) + ip[3];
    //As per GeoData databank, a.b.c.d => a*256**3+b*256**2+c*256**1+d
    GeoData
      .findOne({ip_from: {"$lte": ipNumber }, ip_to: {"$gte": ipNumber}})
      .then(geodata => {
        if(geodata)
          res.status(200).json(geodata);
        else
          res.status(400).json({error: 'No geodata found to corresponding ip adress.'});
      })
      .catch((e: string) => {
        res.status(500).json({error: `Error looking up Geodata: ${e}`});
      });
  } else {
    res.status(400).json({error: 'Could not retrieve ip.'});
  }
});

app.get('/api/ping', (_req, res) => {
  WeatherData.findOne({"$or": [{country: 'Bayern'}, {region: 'Bayern'}, {query: 'Bayern'}]})
  .then((data) => res.send(data)).catch(() => 'oh no');
});

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});