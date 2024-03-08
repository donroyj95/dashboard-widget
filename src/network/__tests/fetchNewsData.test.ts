import { fetchNewsData } from "network/fetchNewsData";
import { get } from "network/method/get";


jest.mock('network/method/get', () => ({
  get: jest.fn(),
}));

jest.mock('axios');

describe('fetchNewsData', () => {
  const category = 'business';
  const mockResponse = { data: 'mocked data' };

  beforeEach(() => {
    (get as jest.Mock).mockClear();
  });

  it('should call get function with the correct URL', async () => {
    await fetchNewsData(category);

    expect(get).toHaveBeenCalledWith(
      `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=f05acd860fd74effaf81842159875c95&language=en`
    );
  });

  it('should return the data from the get function', async () => {
    (get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await fetchNewsData(category);

    expect(result).toEqual(mockResponse);
  });

  it('should log an error if get function throws an error', async () => {
    const mockError = new Error('Mocked error');
    (get as jest.Mock).mockRejectedValue(mockError);

    console.error = jest.fn(); // Mock console.error

    await fetchNewsData(category);

    expect(console.error).toHaveBeenCalledWith(
      'Failed to fetch news data:',
      mockError
    );
  });
});