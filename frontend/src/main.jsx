import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import store from "./store/index.js";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { MyContext } from "./context/myContext";
import router from "./router/router.jsx";

const engine = new Styletron();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <StyletronProvider value={engine}>
        <MyContext>
          <RouterProvider router={router} />
        </MyContext>
      </StyletronProvider>
    </Provider>
  </React.StrictMode>
);
