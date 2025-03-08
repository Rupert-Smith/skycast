import { renderHook, waitFor } from "@testing-library/react";
import { useGetWeather } from "./useGetWeather";
import { getWeather } from "../../services/api";
import { mockWeatherData } from "../../test-utils/mockWeatherData";

jest.mock("../../services/api", () => ({
  getWeather: jest.fn(),
}));

describe("useGetWeather Hook", () => {
  it("should fetch weather successfully", async () => {
    (getWeather as jest.Mock).mockResolvedValue(mockWeatherData);

    const { result } = renderHook(() => useGetWeather());

    expect(result.current.loading).toBe(true);
    expect(result.current.weather).toEqual(undefined);
    expect(result.current.error).toBeNull();

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.weather).toEqual(mockWeatherData);
    expect(result.current.error).toBeNull();
  });

  it("should handle error when fetching weather fails", async () => {
    (getWeather as jest.Mock).mockRejectedValue(new Error("API Error"));

    const { result } = renderHook(() => useGetWeather());

    expect(result.current.loading).toBe(true);
    expect(result.current.weather).toEqual(undefined);
    expect(result.current.error).toBeNull();

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.weather).toEqual(undefined);
    expect(result.current.error).toBe("Error fetching weather");
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
