import express from 'express';
import cors from 'cors';
import config from "../utils/config";
import WeatherData from "../models/ip";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

const PORT = 3001;

app.get('/api/weatherdata', (req, res) => {
  const ip = req.ip;
  const ipParts = ip.split(".");
  const ipNumber = Number(ipParts[0]) * 256 * 256 * 256 + Number(ipParts[1]) * 256 * 256 + Number(ipParts[2]) * 256 + Number(ipParts[3]);
  WeatherData.findOne({ip_from: {"$lte": ipNumber || 755357696 }, ip_to: {"$gte": ipNumber || 755357696}})
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((error) => {
      if(typeof(error) == 'string') {
        console.log(error);
      } else {
        console.log('Unknown error at /api/weatherdata occured.');
      }
    });
});

app.get('/api/ping', (_req, res) => {
  res.send('tom cruise');
});

app.listen(config.PORT, () => {
  console.log(`Server running on port ${PORT}`);
});