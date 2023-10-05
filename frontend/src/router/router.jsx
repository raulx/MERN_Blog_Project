import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../screens/notFoundScreen";
import LoginScreen from "../screens/loginScreen";
import RegisterScreen from "../screens/registerScreen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/login", element: <LoginScreen /> },
      { path: "/register", element: <RegisterScreen /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default router;
