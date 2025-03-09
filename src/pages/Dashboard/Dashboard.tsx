import { useEffect, useState } from "react";
import { useGetWeather } from "../../hooks/useGetWeather/useGetWeather";
import { mapWeather } from "../../utilities/mapWeather";
import { Card } from "../../components/Card/Card";
import skycast from "../../assets/images/logo_text.png";
import { ReactComponent as SearchIcon } from "../../assets/icons/magnifying-glass-regular.svg";
import { ReactComponent as LocationIcon } from "../../assets/icons/location-dot-solid.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/xmark-solid.svg";
import warning from "../../assets/images/warning.png";
import ReactLoading from "react-loading";
import { mapLocationResponse } from "../../utilities/mapLocationResponse";
import { useGetLocation } from "../../hooks/useGetLocation/useGetLocation";

import "./Dashboard.scss";
import "./ImageSlider.scss";

export const Dashboard = () => {
  const {
    error: locationError,
    resetError: resetLocationError,
    resetLocation,
    locationResponse,
    fetchLocation,
    loading: locationLoading,
  } = useGetLocation();
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
    if (locationResponse) {
      const { latitude, longitude } = locationResponse;
      const formattedInput = mapLocationResponse(locationResponse);
      console.log(locationResponse);

      setInputText(formattedInput);
      fetchWeather({ latitude, longitude });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationResponse]);

  const mappedWeather = mapWeather(weather);

  const handleSubmitLocation = (event: any) => {
    event.preventDefault();
    fetchLocation(inputText);
  };

  const loading = locationLoading || weatherLoading;

  const handleClearInput = () => {
    setInputText("");
    resetLocation();
    resetLocationError();
    resetWeather();
    resetWeatherError();
  };

  useEffect(() => {
    if (weatherError || locationError) {
      resetLocation();
      resetWeather();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weatherError, locationError]);

  useEffect(() => {
    if (inputText === "") {
      resetLocation();
      resetLocationError();
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
                  value={inputText}
                  disabled={loading}
                  onChange={(event) => {
                    setCurrentLocationError("");
                    setInputText(event.target.value);
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
