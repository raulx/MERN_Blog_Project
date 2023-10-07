import { configureStore } from "@reduxjs/toolkit";
import authApi from "./api/authApi";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(authApi.middleware);
  },
});
setupListeners(store.dispatch);
export * from "./api/authApi";
export default store;
