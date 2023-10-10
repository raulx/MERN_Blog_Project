import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//FOR DEV USE ONLY
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};
const blogApi = createApi({
  reducerPath: "blog",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3500/blogs",
    fetchFn: async (...args) => {
      await pause(2000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      getBlogs: builder.query({
        query: ({ page, pageSize }) => {
          return {
            url: `/?_page=${page}&_limit=${pageSize}`,
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useGetBlogsQuery } = blogApi;
export default blogApi;
