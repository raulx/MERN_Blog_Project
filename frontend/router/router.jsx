import { createBrowserRouter } from "react-router-dom";
import App from "../src/App";
import NotFound from "../screens/notFoundScreen";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "*", element: <NotFound /> },
]);

export default router;
