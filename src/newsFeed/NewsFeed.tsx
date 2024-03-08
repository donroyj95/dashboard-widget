import React, { useEffect, useState } from "react";
import {
  Divider,
  Link,
  NewsCard,
  NewsCategorySelect,
  NewsList,
} from "./elements";
import { fetchNewsData } from "network/fetchNewsData";

const NewsFeed: React.FC = () => {
  const [news, setNews] = useState<any[]>([]); // State to store the news articles
  const [category, setCategory] = useState<string>(""); // State to store the selected category

  useEffect(() => {
    // Fetch news data based on the selected category
    fetchNewsData(category).then((response) => {
      if (response.data.articles) {
        // Update the state with the fetched news articles
        setNews(response.data.articles);
      }
    });
  }, [category]);

  // Event handler for updating the selected category
  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    event.preventDefault();
    setCategory(event.target.value);
  };

  return (
    <div>
      <h2>News Feed</h2>
      {/* News category select dropdown */}
      <NewsCategorySelect
        name="News Category"
        value={category}
        onChange={handleCategoryChange}
      >
        <option value="">All</option>
        <option value="technology">Technology</option>
        <option value="business">Business</option>
        <option value="sports">Sports</option>
      </NewsCategorySelect>
      {news.length > 0 ? (
        // Render the news articles if there are any
        <NewsList>
          {news.map((article) => (
            <>
              {/* News card */}
              <NewsCard key={article.url}>
                {/* Display the news article image if available */}
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    width={"100%"}
                  />
                )}
                {/* Link to the full article */}
                <Link
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {article.title}
                </Link>
              </NewsCard>
              <Divider />
            </>
          ))}
        </NewsList>
      ) : (
        // Display a loading message while news data is being fetched
        <p>Loading news data...</p>
      )}
    </div>
  );
};

export default NewsFeed;