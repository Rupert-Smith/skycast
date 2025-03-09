import { renderHook, waitFor } from "@testing-library/react";
import { useGetWeather } from "./useGetWeather";
import { getWeather } from "../../services/api";
import { mockWeatherData } from "../../test-utils/mockWeatherData";
import { mockLocation } from "../../test-utils/mockLocation";

jest.mock("../../services/api", () => ({
  getWeather: jest.fn(),
}));

describe("useGetWeather Hook", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch weather successfully", async () => {
    (getWeather as jest.Mock).mockResolvedValue(mockWeatherData);
    const { result } = renderHook(() => useGetWeather());

    expect(result.current.loading).toBe(false);
    expect(result.current.weather).toBeUndefined();
    expect(result.current.error).toBeNull();

    result.current.fetchWeather(mockLocation);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.weather).toEqual(mockWeatherData);
  });

  it("should handle error when fetching weather fails", async () => {
    (getWeather as jest.Mock).mockRejectedValue(new Error("API Error"));
    const { result } = renderHook(() => useGetWeather());

    expect(result.current.loading).toBe(false);
    expect(result.current.weather).toBeUndefined();
    expect(result.current.error).toBeNull();

    result.current.fetchWeather(mockLocation);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.weather).toBeUndefined();
    expect(result.current.error).toBe("Error fetching weather");
  });

  it("should reset error", async () => {
    (getWeather as jest.Mock).mockRejectedValue(new Error("API Error"));
    const { result } = renderHook(() => useGetWeather());

    result.current.fetchWeather(mockLocation);

    await waitFor(() => {
      expect(result.current.error).toBe("Error fetching weather");
      result.current.resetError();
    });

    expect(result.current.error).toBe("");
  });

  it("should reset weather", async () => {
    (getWeather as jest.Mock).mockResolvedValue(mockWeatherData);
    const { result } = renderHook(() => useGetWeather());

    result.current.fetchWeather(mockLocation);

    await waitFor(() => {
      expect(result.current.weather).toEqual(mockWeatherData);
      result.current.resetWeather();
    });

    expect(result.current.weather).toBeUndefined();
  });
});
