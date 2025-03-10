import { useState } from "react";

import { getWeather } from "../../services/api";
import { WeatherData } from "../../types/WeatherData";
import { Location } from "../../types/Location";

export type UseGetWeatherType = {
  loading: boolean;
  fetchWeather: (location: Location) => Promise<void>;
  weather?: WeatherData;
  error: string | null;
  resetError: () => void;
  resetWeather: () => void;
};

export const useGetWeather = (): UseGetWeatherType => {
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
