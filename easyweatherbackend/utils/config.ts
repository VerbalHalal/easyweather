import 'dotenv/config';

const PORT: number = Number(process.env.PORT) || 3001;
const MONGODB_URI: string = process.env.MONGODB_URI || "";
const API_KEY: string = process.env.API_KEY || "";
const NODE_ENV: string = process.env.NODE_ENV || "";

export default {PORT, MONGODB_URI, API_KEY, NODE_ENV};