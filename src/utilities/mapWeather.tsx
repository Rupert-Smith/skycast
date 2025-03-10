import { WeatherData } from "@/types/WeatherData";
import { weatherCodeMap } from "./mapWeatherCode";
import { MappedWeatherItem } from "@/types/MappedWeatherItem";

export const mapWeather = (weatherData?: WeatherData): MappedWeatherItem[] => {
  if (!weatherData) return [];

  const {
    daily: {
      weather_code,
      temperature_2m_max,
      temperature_2m_min,
      time,
      wind_speed_10m_max,
    },
  } = weatherData;

  const nextFiveDays = time.slice(1, 6);

  return nextFiveDays.map((date, index) => {
    const weatherInfo = weatherCodeMap[weather_code[index]] || {
      description: "Unknown",
      icon: <></>,
    };

    const averageTemperature =
      (temperature_2m_max[index] + temperature_2m_min[index]) / 2;

    const formattedDate = new Date(date)
      .toLocaleDateString("en-US", { weekday: "short" })
      .toUpperCase();

    return {
      date: formattedDate,
      windSpeed: `${wind_speed_10m_max[index]}`,
      temperature: `${averageTemperature.toFixed(1)}`,
      weatherIcon: weatherInfo.icon,
      headerColor: weatherInfo.color,
      weatherDescription: weatherInfo.description,
    };
  });
};
