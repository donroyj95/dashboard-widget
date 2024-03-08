import { fetchWeatherData } from "network/fetchWeatherData";
import { get } from "network/method/get";


jest.mock('network/method/get', () => ({
  get: jest.fn(),
}));

describe('fetchWeatherData', () => {
  const location = {
    longitude: 123.456,
    latitude: 78.912,
  };
  const mockResponse = { data: 'mocked data' };

  beforeEach(() => {
    (get as jest.Mock).mockClear();
  });

  it('should call get function with the correct API URL', async () => {
    await fetchWeatherData(location);

    expect(get).toHaveBeenCalledWith(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=741cd96b8b5f028fd96b93dac6fbdad2&units=metric`
    );
  });

  it('should return the data from the get function', async () => {
    (get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await fetchWeatherData(location);

    expect(result).toEqual(mockResponse);
  });

  it('should log an error if get function throws an error', async () => {
    const mockError = new Error('Mocked error');
    (get as jest.Mock).mockRejectedValue(mockError);

    console.error = jest.fn(); // Mock console.error

    await fetchWeatherData(location);

    expect(console.error).toHaveBeenCalledWith(
      'Failed to fetch weather data:',
      mockError
    );
  });
});