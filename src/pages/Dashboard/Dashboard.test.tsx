import { render, screen, fireEvent } from "@testing-library/react";
import { Dashboard } from "./Dashboard";
import { useGetWeather } from "../../hooks/useGetWeather/useGetWeather";
import { mapWeather } from "../../utilities/mapWeather";
import { mockWeatherData } from "../../test-utils/mockWeatherData";
import { useGetLocations } from "../../hooks/useGetLocations/useGetLocations";
import { mockWeatherItem } from "../../test-utils/mockWeatherItem";
import { mockLocation } from "../../test-utils/mockLocation";

jest.mock("../../hooks/useGetWeather/useGetWeather", () => ({
  useGetWeather: jest.fn(),
}));

jest.mock("../../hooks/useGetLocations/useGetLocations", () => ({
  useGetLocations: jest.fn(),
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
    resetError: jest.fn(),
    resetWeather: jest.fn(),
    loading: false,
    error: null,
  });

  (useGetLocations as jest.Mock).mockReturnValue({
    location: [mockLocation],
    resetLocations: jest.fn(),
    fetchLocations: jest.fn(),
    resetError: jest.fn(),
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
