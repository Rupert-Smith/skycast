import { render, screen, fireEvent } from "@testing-library/react";
import { LocationMenu } from "./LocationMenu";
import { useGetLocations } from "../../hooks/useGetLocations/useGetLocations";
import { mapLocationResponse } from "../../utilities/mapLocationResponse";

jest.mock("../../hooks/useGetLocations/useGetLocations", () => ({
  useGetLocations: jest.fn(),
}));

jest.mock("../../utilities/mapLocationResponse", () => ({
  mapLocationResponse: jest.fn(),
}));

const mockLocationsResponse = [
  { name: "New York", lat: 40.7128, lon: -74.006 },
];

const renderComponent = (query = "New York") => {
  jest.clearAllMocks();
  (useGetLocations as jest.Mock).mockReturnValue({
    error: null,
    locationsResponse: mockLocationsResponse,
    fetchLocations: jest.fn(),
  });

  (mapLocationResponse as jest.Mock).mockReturnValue("New York, USA");

  render(<LocationMenu query={query} propsOnClick={jest.fn()} />);
};

describe("LocationMenu Component", () => {
  it("renders correctly with a valid query and locations response", () => {
    renderComponent();
    expect(screen.getByText("New York, USA")).toBeInTheDocument();
  });

  it("does not render when query length is less than or equal to 2", () => {
    renderComponent("NY");
    expect(screen.queryByText("New York, USA")).not.toBeInTheDocument();
  });

  it("renders with the correct formatted location", () => {
    renderComponent();
    expect(mapLocationResponse).toHaveBeenCalledWith(mockLocationsResponse[0]);
    expect(screen.getByText("New York, USA")).toBeInTheDocument();
  });

  it("handles keyboard events (ArrowDown and ArrowUp) correctly", () => {
    renderComponent();
    const locationMenu = screen.getByTestId("locationMenu");

    fireEvent.keyDown(window, { key: "ArrowDown" });
    expect(locationMenu).toHaveClass("selected");

    fireEvent.keyDown(window, { key: "ArrowUp" });
    expect(locationMenu).toHaveClass("default");
  });
});
