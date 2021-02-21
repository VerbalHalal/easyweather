export interface WeatherData {
  temperature: string;
  country: string;
  region: string;
  windSpeed: number;
  windDegree: number;
  cacheTime: number;
  observationTime: string;
  weatherDescriptions: [string];
  uvIndex: number;
  pressure: number;
}