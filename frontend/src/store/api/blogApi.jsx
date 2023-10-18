import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const API_URL = "http://localhost:3500/";

//FOR DEV USE ONLY
export const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const blogApi = createApi({
  reducerPath: "blog",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    fetchFn: async (...args) => {
      await pause(2000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      postBlog: builder.mutation({
        query: (data) => {
          return {
            url: `/blogs`,
            method: "POST",
            body: data,
          };
        },
      }),
      blogData: builder.query({
        query: (id) => {
          return {
            url: `/blogs/?id=${id}`,
          };
        },
      }),
      usersBlogs: builder.query({
        query: (id) => {
          return {
            url: `/blogs/?creatorId=${id}`,
            method: "GET",
          };
        },
      }),
      getBlogs: builder.query({
        query: ({ page, pageSize }) => {
          return {
            url: `/blogs/?_page=${page}&_limit=${pageSize}`,
            method: "GET",
          };
        },
      }),
    };
  },
});

export const {
  useGetBlogsQuery,
  useUsersBlogsQuery,
  useBlogDataQuery,
  usePostBlogMutation,
} = blogApi;
export default blogApi;
