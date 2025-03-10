import { useEffect, useState, useRef } from "react";
import { useGetWeather } from "../../hooks/useGetWeather/useGetWeather";
import { mapWeather } from "../../utilities/mapWeather";
import { Card } from "../../components/Card/Card";
import skycast from "../../assets/images/logo_text.png";
import { ReactComponent as SearchIcon } from "../../assets/icons/magnifying-glass-regular.svg";
import { ReactComponent as LocationIcon } from "../../assets/icons/location-dot-solid.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/xmark-solid.svg";
import warning from "../../assets/images/warning.png";
import { LocationMenu } from "../../components/LocationMenu/LocationMenu";
import ReactLoading from "react-loading";
import { mapLocationResponse } from "../../utilities/mapLocationResponse";
import { useGetLocations } from "../../hooks/useGetLocations/useGetLocations";

import "./Dashboard.scss";
import "./ImageSlider.scss";

export const Dashboard = () => {
  const {
    error: locationError,
    resetError: resetLocationsError,
    resetLocations,
    locationsResponse,
    fetchLocations,
    loading: locationLoading,
  } = useGetLocations();
  const {
    error: weatherError,
    resetError: resetWeatherError,
    resetWeather,
    fetchWeather,
    weather,
    loading: weatherLoading,
  } = useGetWeather();
  const [inputText, setInputText] = useState("");

  const [currentLocationError, setCurrentLocationError] = useState("");

  useEffect(() => {
    if (locationsResponse && locationsResponse.length > 0) {
      const { latitude, longitude } = locationsResponse[0];
      const formattedInput = mapLocationResponse(locationsResponse[0]);

      setInputText(formattedInput);
      fetchWeather({ latitude: `${latitude}`, longitude: `${longitude}` });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationsResponse]);

  const [isInputFocused, setIsInputFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLInputElement>(null);

  const mappedWeather = mapWeather(weather);

  const handleSubmitLocation = (event?: any) => {
    event && event.preventDefault();

    setSubmitForm(true);
    fetchLocations(inputText);
  };

  const loading = locationLoading || weatherLoading;

  const handleClearInput = () => {
    setInputText("");
    resetLocations();
    resetLocationsError();
    resetWeather();
    resetWeatherError();
  };

  const [submitForm, setSubmitForm] = useState(false);

  useEffect(() => {
    if (weatherError || locationError) {
      resetLocations();
      resetWeather();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weatherError, locationError]);

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
    if (inputText === "") {
      resetLocations();
      resetLocationsError();
      resetWeather();
      resetWeatherError();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputText]);

  const showError =
    ((weatherError || locationError) && inputText !== "") ||
    currentLocationError;

  const errorText = weatherError
    ? weatherError
    : currentLocationError
    ? currentLocationError
    : locationError
    ? locationError
    : "Something went wrong!";

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

  return (
    <>
      <div className="container">
        <div>
          <div className="header">
            <img className="skycastLogo" src={skycast} alt="Skycast logo" />
          </div>
          <div className="formContainer">
            <form onSubmit={handleSubmitLocation}>
              <LocationIcon
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
                  <DeleteIcon
                    onClick={handleClearInput}
                    className="deleteIcon"
                  />
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
          </div>
        </div>
        <div className="cardWrapper">
          {mappedWeather &&
            mappedWeather?.map((weatherItem) => (
              <Card key={weatherItem.date} weatherItem={weatherItem} />
            ))}
        </div>
      </div>
    </>
  );
};
