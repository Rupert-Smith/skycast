import axios from "axios";

import { WeatherData } from "../types/WeatherData";
import { Location } from "../types/Location";

const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";
const GEO_API_URL = "https://geocoding-api.open-meteo.com/v1/search";

export const getWeather = async (location: Location) => {
  const params = {
    latitude: location.latitude,
    longitude: location.longitude,
    daily: [
      "weather_code",
      "wind_speed_10m_max",
      "temperature_2m_max",
      "temperature_2m_min",
    ].join(","),
    timezone: "Europe/London",
    forecast_days: 6,
  };

  const response = await axios.get<WeatherData>(WEATHER_API_URL, { params });
  return response.data;
};

export const getLocations = async (locationQuery: string) => {
  const params = { name: locationQuery, count: 1 };
  const response = await axios.get(GEO_API_URL, { params });

  if (response.data?.results?.length) {
    return response.data.results;
  }

  throw new Error("Location not found");
};
