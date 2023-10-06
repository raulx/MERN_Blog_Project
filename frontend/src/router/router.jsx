import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../screens/notFoundScreen";
import HomeContent from "../screens/homeScreen";
import ContactPage from "../screens/contactScreen";
import AboutPage from "../screens/aboutScreen";
import PoliticsContent from "../screens/categoriesScreens/politicsScreen";
import TravelContent from "../screens/categoriesScreens/TravelScreen";
import FashionLifestyleContent from "../screens/categoriesScreens/FashionLifestyleScreen";
import HealthContent from "../screens/categoriesScreens/healthScreen";
import FoodContent from "../screens/categoriesScreens/foodScreen";
import ScienceTechContent from "../screens/categoriesScreens/scienceTechScreen";
import MusicContent from "../screens/categoriesScreens/musicScreen";
import FinanceContent from "../screens/categoriesScreens/financeBussinessScreen";
import SportsContent from "../screens/categoriesScreens/sportsScreen";
import ProtectedRoute from "../hooks/authenticateRoutesHook";
import AllCategories from "../screens/categoriesScreens/allContent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomeContent />,
        children: [
          {
            path: "/categories",
            element: <ProtectedRoute />,
            children: [
              { path: "/categories/all", element: <AllCategories /> },
              { path: "/categories/politics", element: <PoliticsContent /> },
              { path: "/categories/sports", element: <SportsContent /> },
              {
                path: "/categories/fashionLifestyle",
                element: <FashionLifestyleContent />,
              },
              {
                path: "/categories/scienceTech",
                element: <ScienceTechContent />,
              },
              { path: "/categories/health", element: <HealthContent /> },
              {
                path: "/categories/financeBussiness",
                element: <FinanceContent />,
              },
              { path: "/categories/travel", element: <TravelContent /> },
              { path: "/categories/music", element: <MusicContent /> },
              { path: "/categories/food", element: <FoodContent /> },
            ],
          },
          {
            path: "/categories/fashionlifestyle",
            element: <FashionLifestyleContent />,
          },
        ],
      },
      { path: "/about", element: <AboutPage /> },
      { path: "/contact", element: <ContactPage /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default router;
