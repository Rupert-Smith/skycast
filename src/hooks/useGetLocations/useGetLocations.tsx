import { useState } from "react";
import { getLocations } from "../../services/api";
import { LocationData } from "@/types/LocationData";

export const useGetLocations = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [locationsResponse, setLocationsResponse] = useState<LocationData[]>();
  const [error, setError] = useState<string | null>(null);

  const fetchLocations = async (locationQuery: string) => {
    try {
      console.log("locationQuery", locationQuery);
      setLoading(true);
      const locationsResponse = await getLocations(locationQuery);
      setError("");
      setLocationsResponse(locationsResponse);
    } catch (error) {
      setError(`Error fetching location "${locationQuery}"`);
    } finally {
      setLoading(false);
    }
  };

  const resetError = () => {
    setError("");
  };

  const resetLocations = () => {
    setLocationsResponse(undefined);
  };
  return {
    loading,
    locationsResponse,
    fetchLocations,
    error,
    resetError,
    resetLocations,
  };
};
