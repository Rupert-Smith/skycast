import { WeatherData } from "../types/WeatherData";

export const mockWeatherData: WeatherData = {
  latitude: 51.5074,
  longitude: -0.1278,
  generationtime_ms: 12.5,
  utc_offset_seconds: 0,
  timezone: "GMT",
  timezone_abbreviation: "GMT",
  elevation: 35,
  daily_units: {
    time: "ISO8601",
    weather_code: "integer",
    wind_speed_10m_max: "km/h",
    temperature_2m_max: "°C",
    temperature_2m_min: "°C",
  },
  daily: {
    time: ["2025-03-08", "2025-03-09", "2025-03-10"],
    weather_code: [1, 3, 2],
    wind_speed_10m_max: [15, 20, 18],
    temperature_2m_max: [12, 14, 11],
    temperature_2m_min: [5, 6, 4],
  },
};
