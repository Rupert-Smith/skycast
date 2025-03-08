import { MappedWeatherItem } from "@/types/MappedWeatherItem";
import { ReactComponent as WindIcon } from "../../assets/icons/wind-light.svg";

import "./Card.scss";

interface CardType {
  weatherItem: MappedWeatherItem;
}

export const Card = ({ weatherItem }: CardType) => {
  return (
    <div className="card">
      <div className={`header ${weatherItem.headerColor}`}>
        <h1>{weatherItem.date}</h1>
      </div>
      <div className="cardContent">
        <div className="weatherIcon">{weatherItem.weatherIcon}</div>
        <p className="weatherDescription">{weatherItem.weatherDescription}</p>
        <p className="weatherTemperature">{weatherItem.temperature}°</p>
        <div className="divider" />
        <div className="weatherwindSpeed">
          <WindIcon />
          <p>
            {weatherItem.windSpeed}
            <span> Km</span>
          </p>
        </div>
      </div>
    </div>
  );
};
