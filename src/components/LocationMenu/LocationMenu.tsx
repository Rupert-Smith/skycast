import { useEffect, useState, forwardRef } from "react";

import { useGetLocations } from "../../hooks/useGetLocations";
import { ReactComponent as EarthIcon } from "../../assets/icons/earth-americas-light.svg";
import { mapLocationResponse } from "../../utilities/mapLocationResponse";

import "./LocationMenu.scss";

interface LocationMenuType {
  query: string;
  propsOnClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const LocationMenu = forwardRef<
  HTMLDivElement,
  Omit<LocationMenuType, "ref">
>(({ query }, menuRef) => {
  const {
    error: locationError,
    locationsResponse,
    fetchLocations,
  } = useGetLocations();

  const [formattedLocation, setFormattedLocation] = useState("");
  const [downarrow, setDownarrow] = useState(false);

  useEffect(() => {
    fetchLocations(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    if (locationsResponse && locationsResponse.length > 0) {
      setFormattedLocation(mapLocationResponse(locationsResponse[0]));
    }
  }, [locationsResponse]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        setDownarrow(true);
      }

      if (event.key === "ArrowUp") {
        setDownarrow(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {query &&
        query.split("").length > 2 &&
        formattedLocation &&
        !locationError && (
          <div
            data-testid="locationMenu"
            ref={menuRef}
            className={`locationMenu ${downarrow ? "selected" : "default"}`}
          >
            {locationsResponse?.map(() => (
              <div className={`locationMenuItem`} key={formattedLocation}>
                <EarthIcon />
                {formattedLocation}
              </div>
            ))}
          </div>
        )}
    </>
  );
});
