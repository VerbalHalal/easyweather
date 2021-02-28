export interface WeatherData {
  temperature: number;
  country: string;
  region: string;
  wind_speed: number;
  wind_degree: number;
  wind_dir: string;
  cacheTime: number;
  observation_time: string;
  weather_descriptions: [string];
  uv_index: number;
  pressure: number;
}

export interface GeoData {
  city_name: string;
}