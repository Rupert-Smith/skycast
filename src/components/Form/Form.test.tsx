import { render, screen, fireEvent } from "@testing-library/react";
import { Form } from "./Form";
import { useGetLocations } from "../../hooks/useGetLocations";

jest.mock("../../hooks/useGetLocations", () => ({
  useGetLocations: jest.fn(),
}));

const mockWeatherConfig = {
  error: null,
  resetError: jest.fn(),
  resetWeather: jest.fn(),
  fetchWeather: jest.fn(),
  loading: false,
};

const renderForm = () => {
  (useGetLocations as jest.Mock).mockReturnValue({
    error: null,
    resetError: jest.fn(),
    resetLocations: jest.fn(),
    fetchLocations: jest.fn(),
    loading: false,
    locationsResponse: [],
  });

  render(<Form weatherConfig={mockWeatherConfig} />);
};

describe("Form Component", () => {
  it("updates the input value when typing", () => {
    renderForm();

    const inputElement = screen.getByPlaceholderText("Enter a location...");
    fireEvent.change(inputElement, { target: { value: "New York" } });
    expect(inputElement).toHaveValue("New York");
  });

  it("calls fetchLocations on form submission", () => {
    renderForm();

    const inputElement = screen.getByPlaceholderText("Enter a location...");
    const submitButton = screen.getByRole("button");

    fireEvent.change(inputElement, { target: { value: "London" } });
    fireEvent.click(submitButton);

    expect(mockWeatherConfig.fetchWeather).not.toHaveBeenCalled();
    expect(useGetLocations().fetchLocations).toHaveBeenCalledWith("London");
  });
});
