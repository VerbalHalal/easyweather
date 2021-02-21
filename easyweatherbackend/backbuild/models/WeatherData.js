"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const weatherDataSchema = new mongoose_1.Schema({
    temperature: { type: Number, required: true },
    country: { type: String, required: true },
    region: { type: String, required: true },
    windSpeed: { type: Number, required: true },
    windDegree: { type: Number, required: true },
    cacheTime: { type: Number, required: true },
    observationTime: { type: String, required: true },
    weatherDescriptions: { type: [String], required: true },
    uvIndex: { type: Number, required: true },
    pressure: { type: Number, required: true }
}, { collection: 'WeatherData' });
const WeatherData = mongoose_1.model('WeatherData', weatherDataSchema);
exports.default = WeatherData;
