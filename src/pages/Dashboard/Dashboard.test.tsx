import { render, screen, fireEvent } from "@testing-library/react";
import { Dashboard } from "./Dashboard";
import { useGetWeather } from "../../hooks/useGetWeather/useGetWeather";
import { mapWeather } from "../../utilities/mapWeather";
import { mockWeatherData } from "../../test-utils/mockWeatherData";
import { mockWeatherItem } from "../../test-utils/mockWeatherItem";

jest.mock("../../hooks/useGetWeather/useGetWeather", () => ({
  useGetWeather: jest.fn(),
}));

jest.mock("../../utilities/mapWeather", () => ({
  mapWeather: jest.fn(),
}));

jest.mock("../../components/Card/Card", () => ({
  Card: jest.fn(() => <div data-testid="mock-card">Mock Card</div>),
}));

const renderComponent = () => {
  jest.clearAllMocks();
  (useGetWeather as jest.Mock).mockReturnValue({
    weather: mockWeatherData,
    loading: false,
    error: null,
  });

  (mapWeather as jest.Mock).mockReturnValue([mockWeatherItem]);
  render(<Dashboard />);
};

describe("Dashboard Component", () => {
  it("updates the search input value when typing", () => {
    renderComponent();

    const searchInput = screen.getByPlaceholderText("Enter a location...");
    fireEvent.change(searchInput, { target: { value: "London" } });
    expect(searchInput).toHaveValue("London");
  });

  it("calls the search handler when the form is submitted", () => {
    renderComponent();

    const searchInput = screen.getByPlaceholderText("Enter a location...");
    const searchButton = screen.getByRole("button");

    fireEvent.change(searchInput, { target: { value: "London" } });
    fireEvent.click(searchButton);
  });

  it("does not display weather cards when weather data is not available", () => {
    (useGetWeather as jest.Mock).mockReturnValue({
      weather: null,
      loading: false,
      error: null,
    });

    (mapWeather as jest.Mock).mockReturnValue([]);

    renderComponent();

    const cards = screen.queryAllByTestId("mock-card");
    expect(cards).toHaveLength(0);
  });
});
