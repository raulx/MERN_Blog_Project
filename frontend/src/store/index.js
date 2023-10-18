import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import blogApi from "./api/blogApi";
import blogsSlice from "./slices/blogsSlice";
import userSlice from "./slices/userSlice";
import authSlice from "./slices/authSlice";
import userApi from "./api/userApi";
import authApi from "./api/authApi";
import imageApi from "./api/imgApi";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [imageApi.reducerPath]: imageApi.reducer,
    blogs: blogsSlice,
    user: userSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(blogApi.middleware)
      .concat(userApi.middleware)
      .concat(imageApi.middleware);
  },
});
setupListeners(store.dispatch);

export * from "./slices/authSlice";
export * from "./slices/blogsSlice";
export * from "./api/blogApi";
export * from "./api/userApi";
export * from "./api/authApi";
export * from "./api/imgApi";
export * from "./slices/userSlice";
export default store;
