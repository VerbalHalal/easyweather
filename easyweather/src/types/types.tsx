export interface WeatherData {
  temperature: number;
  country: string;
  region: string;
  wind_speed: number;
  wind_degree: number;
  cacheTime: number;
  observation_time: string;
  weather_descriptions: [string];
  uv_index: number;
  pressure: number;
}