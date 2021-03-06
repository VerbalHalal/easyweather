"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("../utils/config"));
const GeoData_1 = __importDefault(require("../models/GeoData"));
const WeatherData_1 = __importDefault(require("../models/WeatherData"));
const WeatherStack_1 = __importDefault(require("../services/WeatherStack"));
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.static('build'));
app.get('/api/weatherdata', (req, res) => {
    let ipNumber;
    if (config_1.default.NODE_ENV == "PRODUCTION") {
        const ip = req.ip;
        const ipParts = ip.split(":")[3].split('.');
        ipNumber = Number(ipParts[0]) * 256 * 256 * 256 + Number(ipParts[1]) * 256 * 256 + Number(ipParts[2]) * 256 + Number(ipParts[3]);
    }
    GeoData_1.default.findOne({ ip_from: { "$lte": ipNumber || 755357696 }, ip_to: { "$gte": ipNumber || 755357696 } })
        .then(geodata => {
        if (geodata) {
            console.log("first");
            WeatherData_1.default.findOne({ region: geodata.region_name })
                .then((weatherdata) => {
                console.log("second", weatherdata);
                const d = new Date();
                console.log("third", d.getTime());
                if (weatherdata && d.getTime() - weatherdata.cacheTime < 300000) {
                    res.json(weatherdata);
                }
                else {
                    console.log("fourth");
                    WeatherStack_1.default.weatherStackQuery(geodata.city_name)
                        .then((weatherstackdata) => {
                        console.log("fifth", weatherstackdata);
                        res.json(Object.assign(Object.assign({}, weatherstackdata.data.location), weatherstackdata.data.current));
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
app.get('/api/geodata', (req, res) => {
    res.send(req.ip);
});
app.get('/api/ping', (_req, res) => {
    res.send('pong');
});
app.listen(config_1.default.PORT, () => {
    console.log(`Server running on port ${config_1.default.PORT}`);
});
