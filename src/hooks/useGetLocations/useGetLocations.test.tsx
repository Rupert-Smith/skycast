import { renderHook, waitFor } from "@testing-library/react";
import { useGetLocations } from "./useGetLocations";
import { getLocations } from "../../services/api";
import { mockLocation } from "../../test-utils/mockLocation";

jest.mock("../../services/api", () => ({
  getLocations: jest.fn(),
}));

describe("useGetLocations Hook", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch location successfully", async () => {
    (getLocations as jest.Mock).mockResolvedValue(mockLocation);
    const { result } = renderHook(() => useGetLocations());

    expect(result.current.loading).toBe(false);
    expect(result.current.locationsResponse).toBeUndefined();
    expect(result.current.error).toBeNull();

    result.current.fetchLocations("London");

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.locationsResponse).toEqual(mockLocation);
    expect(result.current.error).toBe("");
  });

  it("should handle error when fetching location fails", async () => {
    (getLocations as jest.Mock).mockRejectedValue(new Error("API Error"));
    const { result } = renderHook(() => useGetLocations());

    expect(result.current.loading).toBe(false);
    expect(result.current.locationsResponse).toBeUndefined();
    expect(result.current.error).toBeNull();

    result.current.fetchLocations("London");

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.locationsResponse).toBeUndefined();
    expect(result.current.error).toBe(`Error fetching location "${"London"}"`);
  });

  it("should reset error", async () => {
    (getLocations as jest.Mock).mockRejectedValue(new Error("API Error"));
    const { result } = renderHook(() => useGetLocations());

    result.current.fetchLocations("London");

    await waitFor(() => {
      expect(result.current.error).toBe(
        `Error fetching location "${"London"}"`
      );
      result.current.resetError();
    });

    expect(result.current.error).toBe("");
  });

  it("should reset location", async () => {
    (getLocations as jest.Mock).mockResolvedValue(mockLocation);
    const { result } = renderHook(() => useGetLocations());

    result.current.fetchLocations("London");

    await waitFor(() => {
      expect(result.current.locationsResponse).toEqual(mockLocation);
      result.current.resetLocations();
    });

    expect(result.current.locationsResponse).toBeUndefined();
  });
});
