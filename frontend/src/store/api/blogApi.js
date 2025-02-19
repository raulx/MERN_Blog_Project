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
        providesTags: () => {
          return [{ type: "getBlogData" }];
        },
        query: (id) => {
          return {
            url: `/blogs/getBlogData?blogId=${id}`,
            method: "GET",
          };
        },
      }),

      usersBlogs: builder.query({
        providesTags: () => {
          return [{ type: "getUserBlogs" }];
        },
        query: (pageNumber) => {
          return {
            url: `/blogs/getUserBlogs?pageNumber=${pageNumber}`,
            method: "GET",
          };
        },
      }),

      deleteBlog: builder.mutation({
        invalidatesTags: () => {
          return [{ type: "getUserBlogs" }];
        },
        query: (blogId) => {
          return {
            url: `/blogs/deleteBlog`,
            method: "DELETE",
            body: { blogId },
          };
        },
      }),

      getBlogs: builder.query({
        query: ({ page, pageSize, category }) => {
          return {
            url: `/blogs/getblogs?page=${page}&limit=${pageSize}&category=${category}`,
            method: "GET",
          };
        },
      }),
    };
  },
});

export const {
  useGetBlogsQuery,
  useLazyGetBlogsQuery,
  useUsersBlogsQuery,
  useLazyUsersBlogsQuery,
  useBlogDataQuery,
  usePostBlogMutation,
  useDeleteBlogMutation,
  useLazyBlogDataQuery,
} = blogApi;

export default blogApi;
