import React from "react";
import ReactDOM from "react-dom/client";
import "@radix-ui/themes/styles.css";
import "./index.css";
import store from "./store/index.js";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { MyContext } from "./context/myContext";
import router from "./router/router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <MyContext>
        <RouterProvider router={router} />
      </MyContext>
    </Provider>
  </React.StrictMode>
);
