import { useState, useEffect, useRef } from "react";
import ReactLoading from "react-loading";

import warning from "../../assets/images/warning.png";
import { LocationMenu } from "../../components/LocationMenu";
import { mapLocationResponse } from "../../utilities/mapLocationResponse";
import { useGetLocations } from "../../hooks/useGetLocations";
import { ReactComponent as SearchIcon } from "../../assets/icons/magnifying-glass-regular.svg";
import { ReactComponent as LocationIcon } from "../../assets/icons/location-dot-solid.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/xmark-solid.svg";
import { UseGetWeatherType } from "../../hooks/useGetWeather/useGetWeather";

import "./Form.scss";

interface FormType {
  weatherConfig: UseGetWeatherType;
}

export const Form = ({ weatherConfig }: FormType) => {
  const {
    error: weatherError,
    resetError: resetWeatherError,
    resetWeather,
    fetchWeather,
    loading: weatherLoading,
  } = weatherConfig;

  const {
    error: locationError,
    resetError: resetLocationsError,
    resetLocations,
    locationsResponse,
    fetchLocations,
    loading: locationLoading,
  } = useGetLocations();

  const loading = locationLoading || weatherLoading;

  const [inputText, setInputText] = useState("");

  const [currentLocationError, setCurrentLocationError] = useState("");

  const [isInputFocused, setIsInputFocused] = useState(false);

  const [submitForm, setSubmitForm] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLInputElement>(null);

  const showError =
    ((weatherError || locationError) && inputText !== "") ||
    currentLocationError;

  const errorText = weatherError
    ? weatherError
    : currentLocationError
    ? currentLocationError
    : locationError
    ? locationError
    : "Unknown error";

  const handleLocationIconClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather({ latitude: `${latitude}`, longitude: `${longitude}` });
          setInputText("Your current Location");
        },
        (error) => {
          setCurrentLocationError("Error fetching location");
        }
      );
    } else {
      setCurrentLocationError("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmitLocation = (event?: any) => {
    event && event.preventDefault();

    setSubmitForm(true);
    fetchLocations(inputText);
  };

  const handleClearInput = () => {
    setInputText("");
    resetLocations();
    resetLocationsError();
    resetWeather();
    resetWeatherError();
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && menuRef.current.contains(event.target as Node)) {
        handleSubmitLocation();
      } else if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsInputFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputText]);

  useEffect(() => {
    if (locationsResponse && locationsResponse.length > 0) {
      const { latitude, longitude } = locationsResponse[0];
      const formattedInput = mapLocationResponse(locationsResponse[0]);

      setInputText(formattedInput);
      fetchWeather({ latitude: `${latitude}`, longitude: `${longitude}` });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationsResponse]);

  useEffect(() => {
    if (weatherError || locationError) {
      resetLocations();
      resetWeather();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weatherError, locationError]);

  useEffect(() => {
    if (inputText === "") {
      resetLocations();
      resetLocationsError();
      resetWeather();
      resetWeatherError();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputText]);

  return (
    <>
      <form onSubmit={handleSubmitLocation}>
        <LocationIcon
          data-testid="locationIcon"
          className="locationIcon"
          onClick={handleLocationIconClick}
        />
        <div className="searchContainer">
          <input
            ref={inputRef}
            value={inputText}
            disabled={loading}
            onFocus={() => setIsInputFocused(true)}
            onChange={(event) => {
              submitForm === true && setSubmitForm(false);
              setCurrentLocationError("");
              const query = event.target.value;

              setInputText(query);
            }}
            type="text"
            placeholder="Enter a location..."
          />
          {inputText && (
            <DeleteIcon onClick={handleClearInput} className="deleteIcon" />
          )}
          <button disabled={loading || inputText === ""} type="submit">
            <SearchIcon />
          </button>
        </div>
        {inputText && !showError && !submitForm && isInputFocused && (
          <LocationMenu
            ref={menuRef}
            propsOnClick={handleSubmitLocation}
            query={inputText}
          />
        )}
      </form>
      {showError && (
        <div className="errorBox">
          <img src={warning} alt="Warning icon" />
          {`Something went wrong: ${errorText}`}
        </div>
      )}
      {loading && <ReactLoading type={"spin"} width={40} />}
    </>
  );
};
