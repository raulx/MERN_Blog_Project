/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../screens/globalScreens/notFoundScreen";
import ContactPage from "../screens/globalScreens/contactScreen";
const AboutPage = lazy(() => import("../screens/globalScreens/aboutScreen"));
const ProtectedRoutes = lazy(() => import("../hooks/authenticateRoutesHook"));
const BlogsScreen = lazy(() =>
  import("../screens/protectedScreens/blogScreens/blogsScreen")
);
const AuthScreen = lazy(() => "../screens/globalScreens/authScreen");
const NewsScreen = lazy(() =>
  import("../screens/protectedScreens/newsScreens/newsScreen")
);
const LandingScreen = lazy(() =>
  import("../screens/globalScreens/landingScreen")
);
const MemeScreen = lazy(() =>
  import("../screens/protectedScreens/memeScreens/memeScreen")
);
const GamesScreen = lazy(() =>
  import("../screens/protectedScreens/gamesScreen/gamesScreen")
);
const MovieScreen = lazy(() =>
  import("../screens/protectedScreens/movieScreens/moviesScreen")
);
const ShoppingScreen = lazy(() =>
  import("../screens/protectedScreens/shoppingScreens/shoppingScreen")
);
const ShortsScreen = lazy(() =>
  import("../screens/protectedScreens/shortsScreens/shortsScreen")
);
const ProfileScreen = lazy(() =>
  import("../screens/protectedScreens/userProfileScreens/profileScreen")
);
import DisplayBlog from "../screens/protectedScreens/blogScreens/displayBlog";
import HomePage from "../screens/homePage";
import ContentScreen from "../screens/protectedScreens/contentScreen";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense>
        <App />
      </Suspense>
    ),
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

export default router;
