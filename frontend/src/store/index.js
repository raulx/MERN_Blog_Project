import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import blogApi from "./api/blogApi";
import blogsSlice from "./slices/blogsSlice";
import userSlice from "./slices/userSlice";
import authSlice from "./slices/authSlice";
import userApi from "./api/userApi";
import authApi from "./api/authApi";
import authorApi from "./api/authorApi";
import followerApi from "./api/followerApi";
import commentApi from "./api/commentApi";
import likeApi from "./api/likeApi";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [likeApi.reducerPath]: likeApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [authorApi.reducerPath]: authorApi.reducer,
    [followerApi.reducerPath]: followerApi.reducer,

    blogs: blogsSlice,
    user: userSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(blogApi.middleware)
      .concat(userApi.middleware)
      .concat(commentApi.middleware)
      .concat(likeApi.middleware)
      .concat(authorApi.middleware)
      .concat(followerApi.middleware);
  },
});

setupListeners(store.dispatch);

// states exports
export * from "./slices/authSlice";
export * from "./slices/blogsSlice";
export * from "./slices/userSlice";

// api exports
export * from "./api/likeApi";
export * from "./api/blogApi";
export * from "./api/userApi";
export * from "./api/authApi";
export * from "./api/commentApi";
export * from "./api/authorApi";
export * from "./api/followerApi";

export default store;
