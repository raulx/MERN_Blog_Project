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
            children: [{ path: "/categories/:type", element: <BlogsScreen /> }],
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
export const categoryLinks = [
  { category: "all", url: "/categories/all" },
  { category: "politics", url: "/categories/Politics" },
  { category: "sports", url: "/categories/Sports" },
  { category: "finance & bussiness", url: "/categories/Finance & Bussiness" },
  { category: "music", url: "/categories/Music" },
  { category: "travel", url: "/categories/Travel" },
  { category: "fashion & lifestyle", url: "/categories/Fashion & Lifestyle" },
  { category: "health", url: "/categories/Health" },
  { category: "food", url: "/categories/Food" },
  { category: "science & tech", url: "/categories/Science & Technology" },
];

export default router;
