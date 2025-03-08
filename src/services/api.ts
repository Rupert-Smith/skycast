import axios from "axios";
import { WeatherData } from "../types/WeatherData";

const BASE_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code,wind_speed_10m_max,temperature_2m_max,temperature_2m_min&timezone=Europe%2FBerlin&forecast_days=6";

const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getWeather = async () => {
  return (await axiosInstance.get<WeatherData>(``)).data;
};
