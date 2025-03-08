import { render, screen } from "@testing-library/react";
import { Card } from "./Card";
import { mockWeatherItem } from "../../test-utils/mockWeatherItem";

describe("Card component", () => {
  it("renders the card with correct weather data", () => {
    render(<Card weatherItem={mockWeatherItem} />);

    const dateElement = screen.getByText(mockWeatherItem.date);
    expect(dateElement).toBeInTheDocument();

    const weatherDescriptionElement = screen.getByText(
      mockWeatherItem.weatherDescription
    );
    expect(weatherDescriptionElement).toBeInTheDocument();

    const temperatureElement = screen.getByText(
      `${mockWeatherItem.temperature}°`
    );
    expect(temperatureElement).toBeInTheDocument();

    const windSpeedElement = screen.getByText(`${mockWeatherItem.windSpeed}`);
    expect(windSpeedElement).toBeInTheDocument();
  });
});
