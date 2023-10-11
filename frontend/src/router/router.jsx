import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../screens/notFoundScreen";
import HomePage from "../screens/homeScreen";
import { HomeContent } from "../screens/homeScreen";
import ContactPage from "../screens/contactScreen";
import AboutPage from "../screens/aboutScreen";
import ProtectedRoute from "../hooks/authenticateRoutesHook";
import BlogsScreen from "../screens/blogsScreen";
import AuthScreen from "../screens/authScreen";
import NewsScreen from "../screens/newsScreen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        children: [
          { index: true, element: <HomeContent /> },
          {
            // these are protect routes
            path: "/categories",
            element: <ProtectedRoute />,
            children: [
              { path: "/categories/blogs/all", element: <BlogsScreen /> },
              { path: "/categories/news/all", element: <NewsScreen /> },
            ],
          },
        ],
      },
      { path: "/about", element: <AboutPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/auth", element: <AuthScreen /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export const pages = [
  { name: "Home", url: "/" },
  { name: "about", url: "/about" },
  { name: "contact", url: "/contact" },
];

export const contentTypeLinks = [
  { type: "blogs", url: "/categories/blogs/all" },
  { type: "news", url: "/categories/news/all" },
  { type: "memes", url: "/memes/all" },
  { type: "shorts", url: "/shorts/all" },
  { type: "games", url: "/games/all" },
  { type: "south movies", url: "/southMovies/all" },
  { type: "shopping deals", url: "/shopping/all" },
];

export default router;
