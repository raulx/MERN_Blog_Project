import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../../utils/variables";

//FOR DEV USE ONLY
export const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const blogApi = createApi({
  reducerPath: "blog",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    fetchFn: async (...args) => {
      await pause(2000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      getAuthor: builder.query({
        query: (authorId) => {
          return {
            url: `/blogs/getAuthor?authorId=${authorId}`,
            method: "GET",
          };
        },
      }),
      postBlog: builder.mutation({
        query: (data) => {
          return {
            url: `/blogs/create`,
            method: "POST",
            body: data,
          };
        },
      }),
      blogData: builder.query({
        query: (id) => {
          return {
            url: `/blogs/getBlogData?blogId=${id}`,
            method: "GET",
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
            url: `/blogs/getblogs?page=${page}&limit=${pageSize}`,
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

  useGetAuthorQuery,
  useLazyGetAuthorQuery,
} = blogApi;
export default blogApi;
