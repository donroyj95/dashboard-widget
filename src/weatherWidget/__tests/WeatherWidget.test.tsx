import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { fetchWeatherData } from "network/fetchWeatherData";
import WeatherWidget from "../WeatherWidget";

jest.mock("network/fetchWeatherData");

jest.mock('axios', () => ({
    axios: jest.fn(),
  }));

describe.skip("WeatherWidget", () => {
  test("renders the WeatherWidget component", () => {
    render(<WeatherWidget />);

    // Check if the loading message is displayed initially
    expect(screen.getByText("Loading weather data...")).toBeInTheDocument();
  });

  test("fetches weather data based on current location", async () => {
    const weatherData = {
      main: { temp: 25, humidity: 70 },
      weather: [{ description: "Sunny" }],
      name: "City",
    };

    fetchWeatherData.mockResolvedValueOnce({ data: weatherData });

    render(<WeatherWidget />);

    // Wait for the weather data to load
    await waitFor(() => expect(fetchWeatherData).toHaveBeenCalledTimes(1));

    // Check if the weather data is rendered
    expect(screen.getByText("Current Weather")).toBeInTheDocument();
    expect(screen.getByText("Temperature: 25°C")).toBeInTheDocument();
    expect(screen.getByText("Description: Sunny")).toBeInTheDocument();
    expect(screen.getByText("Humidity: 70%")).toBeInTheDocument();
    expect(screen.getByText("City: City")).toBeInTheDocument();
  });

  test("displays a loading message if weather data is not available", async () => {
    fetchWeatherData.mockResolvedValueOnce({ data: null });

    render(<WeatherWidget />);

    // Wait for the weather data to load
    await waitFor(() => expect(fetchWeatherData).toHaveBeenCalledTimes(1));

    // Check if the loading message is displayed
    expect(screen.getByText("Loading weather data...")).toBeInTheDocument();
  });
});