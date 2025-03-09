import { useState } from "react";
import { getWeather } from "../../services/api";
import { WeatherData } from "../../types/WeatherData";
import { Location } from "../../types/Location";

export const useGetWeather = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [weather, setWeather] = useState<WeatherData>();
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (location: Location) => {
    try {
      setLoading(true);
      const weather = await getWeather(location);
      setError("");
      setWeather(weather);
    } catch (error) {
      setError("Error fetching weather");
    } finally {
      setLoading(false);
    }
  };

  const resetError = () => {
    setError("");
  };

  const resetWeather = () => {
    setWeather(undefined);
  };

  return { loading, fetchWeather, weather, error, resetError, resetWeather };
};
