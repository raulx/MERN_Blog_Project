import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../screens/globalScreens/notFoundScreen";
import HomePage from "../screens/globalScreens/homeScreen";
import { HomeContent } from "../screens/globalScreens/homeScreen";
import ContactPage from "../screens/globalScreens/contactScreen";
import AboutPage from "../screens//globalScreens/aboutScreen";
import ProtectedRoute from "../hooks/authenticateRoutesHook";
import BlogsScreen from "../screens/protectedScreens/blogsScreen";
import AuthScreen from "../screens/globalScreens/authScreen";
import NewsScreen from "../screens/protectedScreens/newsScreen";
import LandingScreen from "../screens/globalScreens/landingScreen";
import MemeScreen from "../screens/protectedScreens/memeScreen";
import GamesScreen from "../screens/protectedScreens/gamesScreen";
import MovieScreen from "../screens/protectedScreens/moviesScreen";
import ShoppingScreen from "../screens/protectedScreens/moviesScreen";
import ShortsScreen from "../screens/protectedScreens/shortsScreen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingScreen />,
        children: [
          { index: true, element: <HomeContent /> },
          { path: "/about", element: <AboutPage /> },
          { path: "/contact", element: <ContactPage /> },
          { path: "/auth", element: <AuthScreen /> },
        ],
      },
      {
        path: "/content",
        element: <ProtectedRoute />,
        children: [
          {
            path: "/content",
            element: <HomePage />,
            children: [
              { index: true, element: <BlogsScreen /> },
              { path: "/content/news", element: <NewsScreen /> },
              { path: "/content/memes", element: <MemeScreen /> },
              { path: "/content/shorts", element: <ShortsScreen /> },
              { path: "/content/games", element: <GamesScreen /> },
              { path: "/content/movies", element: <MovieScreen /> },
              { path: "/content/shopping", element: <ShoppingScreen /> },
            ],
          },
        ],
      },
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
  { type: "blogs", url: "/content" },
  { type: "news", url: "/content/news" },
  { type: "memes", url: "/content/memes" },
  { type: "shorts", url: "/content/shorts" },
  { type: "games", url: "/content/games" },
  { type: "movies", url: "/content/movies" },
  { type: "shopping", url: "/content/shopping" },
];

export default router;
