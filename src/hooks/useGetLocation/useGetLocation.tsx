import { useState } from "react";
import { getLocation } from "../../services/api";

export const useGetLocation = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [locationResponse, setLocationResponse] = useState<any>();
  const [error, setError] = useState<string | null>(null);

  const fetchLocation = async (locationQuery: string) => {
    try {
      setLoading(true);
      const locationResponse = await getLocation(locationQuery);
      setError("");
      setLocationResponse(locationResponse);
    } catch (error) {
      setError(`Error fetching location "${locationQuery}"`);
    } finally {
      setLoading(false);
    }
  };

  const resetError = () => {
    setError("");
  };

  const resetLocation = () => {
    setLocationResponse(undefined);
  };
  return {
    loading,
    locationResponse,
    fetchLocation,
    error,
    resetError,
    resetLocation,
  };
};
