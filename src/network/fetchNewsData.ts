import { get } from "./method/get";

const NEWS_API_KEY = "f05acd860fd74effaf81842159875c95";

export const fetchNewsData = async (category: string) => {
  try {
    return await get(
      `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${NEWS_API_KEY}&language=en`
    );
  } catch (error) {
    console.error("Failed to fetch news data:", error);
  }
};
