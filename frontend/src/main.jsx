/* eslint-disable react-refresh/only-export-components */
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "@radix-ui/themes/styles.css";
import "./index.css";
import store from "./store/index.js";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MyContext } from "./context/myContext";

// page imports
const BlogsIndex = lazy(() =>
  import("../src/screens/protected/blogScreens/allBlogs.jsx")
);
const UserBlogs = lazy(() =>
  import("../src/screens/protected/blogScreens/userBlogs")
);
const CreateBlog = lazy(() =>
  import("../src/screens/protected/blogScreens/createBlog")
);
const App = lazy(() => import("../src/App"));
const NotFound = lazy(() => import("../src/screens/open/notFoundScreen"));
const ContactPage = lazy(() => import("../src/screens/open/contactScreen"));
const AboutPage = lazy(() => import("../src/screens/open/aboutScreen"));
const ProtectedRoutes = lazy(() =>
  import("../src/hooks/authenticateRoutesHook")
);
const BlogsScreen = lazy(() =>
  import("../src/screens/protected/blogScreens/blogsScreen")
);
const AuthScreen = lazy(() => import("../src/screens/open/authScreen"));
const LandingScreen = lazy(() => import("../src/screens/landingScreen"));
const ProfileScreen = lazy(() =>
  import("../src/screens/protected/userProfileScreens/profileScreen")
);
const DisplayBlog = lazy(() =>
  import("../src/screens/protected/blogScreens/displayBlog")
);
const RootScreen = lazy(() => import("../src/screens/rootScreen"));
const ContentScreen = lazy(() =>
  import("../src/screens/protected/contentScreen")
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
                element: <ContentScreen />,
                children: [
                  {
                    element: <BlogsScreen />,
                    children: [
                      { index: true, element: <BlogsIndex /> },
                      { path: "/content/blog/me", element: <UserBlogs /> },
                      { path: "/content/blog/create", element: <CreateBlog /> },
                    ],
                  },
                ],
              },
            ],
          },
          { path: "/blog", element: <DisplayBlog /> },

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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <MyContext>
        <RouterProvider router={router} />
      </MyContext>
    </Provider>
  </React.StrictMode>
);
