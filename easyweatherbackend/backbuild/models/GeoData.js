"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../utils/config"));
const geoDataSchema = new mongoose_1.Schema({
    ip_from: Number,
    ip_to: Number,
    cc: String,
    country_name: String,
    region_name: String,
    city_name: String
}, { collection: 'GeoData' });
const GeoData = mongoose_1.model('GeoData', geoDataSchema);
mongoose_1.connect(config_1.default.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
    console.log(`[MONGODB] Connected sucessfully to ${config_1.default.MONGODB_URI}`);
})
    .catch((error) => {
    if (typeof (error) == "string")
        console.log(`[MONGODB] ${error}`);
    else
        console.log(`[MONGODB] Unknown error occured.`);
});
exports.default = GeoData;
