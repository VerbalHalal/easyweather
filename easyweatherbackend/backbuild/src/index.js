"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("../utils/config"));
const ip_1 = __importDefault(require("../models/ip"));
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.static('build'));
const PORT = 3001;
app.get('/api/weatherdata', (req, res) => {
    const ip = req.ip;
    const ipParts = ip.split(".");
    const ipNumber = Number(ipParts[0]) * 256 * 256 * 256 + Number(ipParts[1]) * 256 * 256 + Number(ipParts[2]) * 256 + Number(ipParts[3]);
    ip_1.default.findOne({ ip_from: { "$lte": ipNumber || 755357696 }, ip_to: { "$gte": ipNumber || 755357696 } })
        .then((data) => {
        console.log(data);
        res.json(data);
    })
        .catch((error) => {
        if (typeof (error) == 'string') {
            console.log(error);
        }
        else {
            console.log('Unknown error at /api/weatherdata occured.');
        }
    });
});
app.get('/api/ping', (_req, res) => {
    res.send('tom cruise');
});
app.listen(config_1.default.PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
