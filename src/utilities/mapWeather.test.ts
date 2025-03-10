import { WeatherData } from "../types/WeatherData";
import { mockWeatherData } from "../test-utils/mockWeatherData";

import { mapWeather } from "./mapWeather";

describe("mapWeather", () => {
  it("should return an empty array if weatherData is undefined", () => {
    const result = mapWeather(undefined);
    expect(result).toEqual([]);
  });

  it("should map weather data correctly for the next five days", () => {
    const weatherData: WeatherData = {
      ...mockWeatherData,
      daily: {
        weather_code: [0, 1, 2, 3, 45, 48],
        temperature_2m_max: [20, 21, 22, 23, 24, 25],
        temperature_2m_min: [10, 11, 12, 13, 14, 15],
        time: [
          "2023-10-01",
          "2023-10-02",
          "2023-10-03",
          "2023-10-04",
          "2023-10-05",
          "2023-10-06",
        ],
        wind_speed_10m_max: [5, 6, 7, 8, 9, 10],
      },
    };

    const result = mapWeather(weatherData);

    expect(result.length).toBe(5);

    expect(result[0]).toEqual({
      date: "MON",
      windSpeed: "5",
      temperature: "15.0",
      weatherIcon: expect.anything(),
      headerColor: "yellow",
      weatherDescription: "Clear sky",
    });

    expect(result[1]).toEqual({
      date: "TUE",
      windSpeed: "6",
      temperature: "16.0",
      weatherIcon: expect.anything(),
      headerColor: "yellow",
      weatherDescription: "Mainly clear",
    });

    expect(result[2]).toEqual({
      date: "WED",
      windSpeed: "7",
      temperature: "17.0",
      weatherIcon: expect.anything(),
      headerColor: "yellow",
      weatherDescription: "Partly cloudy",
    });

    expect(result[3]).toEqual({
      date: "THU",
      windSpeed: "8",
      temperature: "18.0",
      weatherIcon: expect.anything(),
      headerColor: "grey",
      weatherDescription: "Overcast",
    });

    expect(result[4]).toEqual({
      date: "FRI",
      windSpeed: "9",
      temperature: "19.0",
      weatherIcon: expect.anything(),
      headerColor: "grey",
      weatherDescription: "Fog",
    });
  });
});
