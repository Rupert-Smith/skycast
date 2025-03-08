import { useGetWeather } from "../../hooks/useGetWeather/useGetWeather";
import { mapWeather } from "../../utilities/mapWeather";
import { Card } from "../../components/Card/Card";
import skycast from "../../assets/images/logo_text.png";
import { ReactComponent as SearchIcon } from "../../assets/icons/magnifying-glass-regular.svg";
import { ReactComponent as LocationIcon } from "../../assets/icons/location-dot-solid.svg";

import "./Dashboard.scss";
import "./ImageSlider.scss";

export const Dashboard = () => {
  const { weather } = useGetWeather();
  const mappedWeather = mapWeather(weather);

  return (
    <>
      <div className="container">
        <div className="header">
          <img className="skycastLogo" src={skycast} alt="Skycast logo" />
        </div>
        <form>
          <div className="searchContainer">
            <input type="text" placeholder="Enter a location..." />
            <LocationIcon />
            <button>
              <SearchIcon />
            </button>
          </div>
        </form>
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
