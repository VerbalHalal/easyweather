"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const PORT = Number(process.env.PORT) || 3001;
const MONGODB_URI = process.env.MONGODB_URI || "";
const API_KEY = process.env.API_KEY || "";
exports.default = { PORT, MONGODB_URI, API_KEY };
