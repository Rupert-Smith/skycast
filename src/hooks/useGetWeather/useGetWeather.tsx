import { useState, useEffect } from "react";
import { getWeather } from "../../services/api";
import { WeatherData } from "../../types/WeatherData";

export const useGetWeather = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [weather, setWeather] = useState<WeatherData>();
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const weather = await getWeather();
      setWeather(weather);
    } catch (error) {
      setError("Error fetching weather");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return { loading, weather, error };
};
