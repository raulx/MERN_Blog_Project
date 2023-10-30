const BASE_URL = "/api";

const blogCategories = [
  { id: 1, category: "all" },
  { id: 2, category: "politics" },
  { id: 3, category: "sports" },
  {
    id: 4,
    category: "finance & bussiness",
  },
  { id: 5, category: "music" },
  { id: 6, category: "travel" },
  {
    id: 7,
    category: "fashion & lifestyle",
  },
  { id: 8, category: "health" },
  { id: 9, category: "food" },
  {
    id: 10,
    category: "science & technology",
  },
];

const pages = [
  { name: "home", url: "/content" },
  { name: "about", url: "/about" },
  { name: "contact", url: "/contact" },
];

const contentTypeLinks = [
  { type: "blogs", url: "/content" },
  { type: "news", url: "/content/news" },
  { type: "memes", url: "/content/memes" },
  { type: "shorts", url: "/content/shorts" },
  { type: "games", url: "/content/games" },
  { type: "movies", url: "/content/movies" },
  { type: "shopping", url: "/content/shopping" },
];

export { blogCategories, pages, contentTypeLinks, BASE_URL };
