import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fetchNewsData } from 'network/fetchNewsData';
import NewsFeed from '../NewsFeed';
import * as React from 'react';

jest.mock('network/fetchNewsData');

jest.mock('axios', () => ({
    axios: jest.fn(),
  }));

describe.skip('NewsFeed', () => {
  const mockedFetchNewsData = fetchNewsData as jest.Mock;

  beforeEach(() => {
    mockedFetchNewsData.mockClear();
  });

  test('fetches news data on category change and renders the news list', async () => {
    const mockArticles = [
      { url: 'https://example.com/article1', title: 'Article 1' },
      { url: 'https://example.com/article2', title: 'Article 2' },
    ];

    mockedFetchNewsData.mockResolvedValueOnce({ data: { articles: mockArticles } });

    render(<NewsFeed/>);

    expect(await screen.getByText('Loading news data...')).toBeInTheDocument();

    const categorySelect =await screen.getByRole('combobox', { name: 'Technology' });

    userEvent.selectOptions(categorySelect, 'business');

    await waitFor(() => {
      expect(mockedFetchNewsData).toHaveBeenCalledWith('business');
      expect(screen.getByText('Article 1')).toBeInTheDocument();
      expect(screen.getByText('Article 2')).toBeInTheDocument();
    });
  });

  it('renders "Loading news data..." when no news articles are available', async () => {
    mockedFetchNewsData.mockResolvedValueOnce({ data: { articles: [] } });

    render(<NewsFeed/>);

    expect(screen.getByText('Loading news data...')).toBeInTheDocument();
    expect(screen.queryByText('Article 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Article 2')).not.toBeInTheDocument();
  });

  it('renders error message when news data fetch fails', async () => {
    const mockError = new Error('Failed to fetch news data');
    mockedFetchNewsData.mockRejectedValueOnce(mockError);

    render(<NewsFeed/>);

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch news data:')).toBeInTheDocument();
      expect(screen.queryByText('Article 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Article 2')).not.toBeInTheDocument();
    });
  });
});