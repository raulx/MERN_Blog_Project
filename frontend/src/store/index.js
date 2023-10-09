import { configureStore } from "@reduxjs/toolkit";
import authApi from "./api/authApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import blogApi from "./api/blogApi";
import blogsSlice from "./slices/blogsSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    blogs: blogsSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(blogApi.middleware);
  },
});
setupListeners(store.dispatch);

export * from "./slices/blogsSlice";
export * from "./api/authApi";
export * from "./api/blogApi";
export default store;
