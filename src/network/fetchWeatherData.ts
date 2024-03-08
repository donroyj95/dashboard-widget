import { LocationCoordinate } from "types";
import { get } from "./method/get";

export const fetchWeatherData = async ({
  longitude,
  latitude,
}: LocationCoordinate) => {
  const API_KEY = "741cd96b8b5f028fd96b93dac6fbdad2";
  const API = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

  try {
    return await get(API);
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
  }
};
