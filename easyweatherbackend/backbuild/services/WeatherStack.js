"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../utils/config"));
const weatherStackQuery = (region_name) => {
    return axios_1.default.get(`http://api.weatherstack.com/current?access_key=${config_1.default.API_KEY}&query=${region_name}`);
};
exports.default = { weatherStackQuery };
