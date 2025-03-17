/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "@radix-ui/themes/styles.css";
import "./index.css";
import store from "./store/index.js";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MyContext } from "./context/myContext";

// page imports
const CreateBlog = lazy(() => import("../src/screens/protected/createBlog"));
const App = lazy(() => import("../src/App"));
const AllBlogs = lazy(() => import("../src/screens/protected/allBlogs.jsx"));
const NotFound = lazy(() => import("../src/screens/open/notFoundScreen"));
const ContactPage = lazy(() => import("../src/screens/open/contactScreen"));
const AboutPage = lazy(() => import("../src/screens/open/aboutScreen"));
const FollowingBlogs = lazy(() =>
  import("../src/screens/protected/followingBlogs.jsx")
);
const TrendingBlogs = lazy(() =>
  import("../src/screens/protected/trendingBlogs.jsx")
);
const ProtectedRoutes = lazy(() =>
  import("../src/hooks/authenticateRoutesHook")
);
const AuthScreen = lazy(() => import("../src/screens/open/authScreen"));
const LandingScreen = lazy(() => import("../src/screens/landingScreen"));

const ViewBlog = lazy(() => import("./screens/protected/viewBlog.jsx"));
const RootScreen = lazy(() => import("../src/screens/rootScreen"));
const Home = lazy(() => import("../src/screens/protected/home"));

// profile screen views imports
const ProfileScreen = lazy(() =>
  import("../src/screens/protected/profileScreen")
);

const Posts = lazy(() => {
  return import("../src/screens/protected/profileScreen.jsx").then(
    (module) => ({
      default: module.Posts,
    })
  );
});

const Liked = lazy(() => {
  return import("../src/screens/protected/profileScreen.jsx").then(
    (module) => ({
      default: module.Liked,
    })
  );
});

const History = lazy(() =>
  import("../src/screens/protected/profileScreen.jsx").then((module) => ({
    default: module.History,
  }))
);

const Favourites = lazy(() =>
  import("../src/screens/protected/profileScreen.jsx").then((module) => ({
    default: module.Favourites,
  }))
);

// router
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
        element: <RootScreen />,
        children: [
          { index: true, element: <LandingScreen /> },
          {
            path: "/content",
            element: <ProtectedRoutes />,
            children: [
              {
                path: "/content",
                element: <Home />,
                children: [
                  { index: true, element: <AllBlogs /> },
                  {
                    path: "/content/blog/following",
                    element: <FollowingBlogs />,
                  },
                  {
                    path: "/content/blog/trending",
                    element: <TrendingBlogs />,
                  },

                  { path: "/content/blog/create", element: <CreateBlog /> },
                ],
              },
            ],
          },
          { path: "/blog", element: <ViewBlog /> },

          { path: "/about", element: <AboutPage /> },
          { path: "/contact", element: <ContactPage /> },
          {
            path: "/profile",
            element: <ProfileScreen />,
            children: [
              {
                index: true,
                element: <Posts />,
              },
              { path: "/profile/history", element: <History /> },
              { path: "/profile/liked", element: <Liked /> },
              { path: "/profile/favourites", element: <Favourites /> },
            ],
          },
        ],
      },
      { path: "/auth", element: <AuthScreen /> },
    ],
  },

  { path: "*", element: <NotFound /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <MyContext>
      <RouterProvider router={router} />
    </MyContext>
  </Provider>
);
