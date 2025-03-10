import { useGetWeather } from "../../hooks/useGetWeather";
import { mapWeather } from "../../utilities/mapWeather";
import { Card } from "../../components/Card";
import skycast from "../../assets/images/logo_text.png";
import { Form } from "../../components/Form";

import "./Dashboard.scss";

export const Dashboard = () => {
  const weatherConfig = useGetWeather();

  const mappedWeather = mapWeather(weatherConfig.weather);

  return (
    <>
      <div className="container">
        <div>
          <section className="header">
            <img className="skycastLogo" src={skycast} alt="Skycast logo" />
          </section>
          <section className="formContainer">
            <Form weatherConfig={weatherConfig} />
          </section>
        </div>
        <section className="cardWrapper">
          {mappedWeather &&
            mappedWeather?.map((weatherItem) => (
              <Card key={weatherItem.date} weatherItem={weatherItem} />
            ))}
        </section>
      </div>
    </>
  );
};
