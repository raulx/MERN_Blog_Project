import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../screens/globalScreens/notFoundScreen";
import ContactPage from "../screens/globalScreens/contactScreen";
import AboutPage from "../screens//globalScreens/aboutScreen";
import ProtectedRoutes from "../hooks/authenticateRoutesHook";
import BlogsScreen from "../screens/protectedScreens/blogScreens/blogsScreen";
import AuthScreen from "../screens/globalScreens/authScreen";
import NewsScreen from "../screens/protectedScreens/newsScreens/newsScreen";
import LandingScreen from "../screens/globalScreens/landingScreen";
import MemeScreen from "../screens/protectedScreens/memeScreens/memeScreen";
import GamesScreen from "../screens/protectedScreens/gamesScreen/gamesScreen";
import MovieScreen from "../screens/protectedScreens/movieScreens/moviesScreen";
import ShoppingScreen from "../screens/protectedScreens/shoppingScreens/shoppingScreen";
import ShortsScreen from "../screens/protectedScreens/shortsScreens/shortsScreen";
import ProfileScreen from "../screens/protectedScreens/userProfileScreens/profileScreen";
import DisplayBlog from "../screens/protectedScreens/blogScreens/displayBlog";
import HomePage from "../screens/homePage";
import ContentScreen from "../screens/protectedScreens/contentScreen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        children: [
          { index: true, element: <LandingScreen /> },
          {
            path: "/content",
            element: <ProtectedRoutes />,
            children: [
              {
                path: "/content",
                element: <ContentScreen />,
                children: [
                  {
                    index: true,
                    element: <BlogsScreen />,
                  },
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
          { path: "/blog/:id", element: <DisplayBlog /> },

          { path: "/about", element: <AboutPage /> },
          { path: "/contact", element: <ContactPage /> },
          {
            path: "/profile",
            element: <ProfileScreen />,
          },
        ],
      },
      { path: "/auth", element: <AuthScreen /> },
    ],
  },

  { path: "*", element: <NotFound /> },
]);

export const pages = [
  { name: "home", url: "/content" },
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
