import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import blogApi from "./api/blogApi";
import blogsSlice from "./slices/blogsSlice";
import userSlice from "./slices/userSlice";
import authSlice from "./slices/authSlice";

const store = configureStore({
  reducer: {
    [blogApi.reducerPath]: blogApi.reducer,
    blogs: blogsSlice,
    user: userSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(blogApi.middleware);
  },
});
setupListeners(store.dispatch);

export * from "./slices/authSlice";
export * from "./slices/blogsSlice";
export * from "./api/blogApi";
export default store;
