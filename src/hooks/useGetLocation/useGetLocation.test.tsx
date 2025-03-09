import { renderHook, waitFor } from "@testing-library/react";
import { useGetLocation } from "./useGetLocation";
import { getLocation } from "../../services/api";
import { mockLocation } from "../../test-utils/mockLocation";

jest.mock("../../services/api", () => ({
  getLocation: jest.fn(),
}));

describe("useGetLocation Hook", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch location successfully", async () => {
    (getLocation as jest.Mock).mockResolvedValue(mockLocation);
    const { result } = renderHook(() => useGetLocation());

    expect(result.current.loading).toBe(false);
    expect(result.current.locationResponse).toBeUndefined();
    expect(result.current.error).toBeNull();

    result.current.fetchLocation("London");

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.locationResponse).toEqual(mockLocation);
    expect(result.current.error).toBe("");
  });

  it("should handle error when fetching location fails", async () => {
    (getLocation as jest.Mock).mockRejectedValue(new Error("API Error"));
    const { result } = renderHook(() => useGetLocation());

    expect(result.current.loading).toBe(false);
    expect(result.current.locationResponse).toBeUndefined();
    expect(result.current.error).toBeNull();

    result.current.fetchLocation("London");

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.locationResponse).toBeUndefined();
    expect(result.current.error).toBe(`Error fetching location "${"London"}"`);
  });

  it("should reset error", async () => {
    (getLocation as jest.Mock).mockRejectedValue(new Error("API Error"));
    const { result } = renderHook(() => useGetLocation());

    result.current.fetchLocation("London");

    await waitFor(() => {
      expect(result.current.error).toBe(
        `Error fetching location "${"London"}"`
      );
      result.current.resetError();
    });

    expect(result.current.error).toBe("");
  });

  it("should reset location", async () => {
    (getLocation as jest.Mock).mockResolvedValue(mockLocation);
    const { result } = renderHook(() => useGetLocation());

    result.current.fetchLocation("London");

    await waitFor(() => {
      expect(result.current.locationResponse).toEqual(mockLocation);
      result.current.resetLocation();
    });

    expect(result.current.locationResponse).toBeUndefined();
  });
});
