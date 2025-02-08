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
        query: () => {
          return {
            url: `/blogs/getUserBlogs`,
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

      addComment: builder.mutation({
        query: (data) => {
          return {
            url: `/blogs/addComment`,
            method: "POST",
            body: { ...data },
          };
        },
      }),

      removeComment: builder.mutation({
        query: (data) => {
          return {
            url: `/blogs/removeComment`,
            method: "POST",
            body: { ...data },
          };
        },
      }),

      editComment: builder.mutation({
        query: (data) => {
          return {
            url: `/blogs/editComment`,
            method: "POST",
            body: { ...data },
          };
        },
      }),

      authorReply: builder.mutation({
        query: (data) => {
          return {
            url: `/blogs/authorReply`,
            method: "POST",
            body: { ...data },
          };
        },
      }),

      replyDelete: builder.mutation({
        query: (data) => {
          return {
            url: `/blogs/replyDelete`,
            method: "POST",
            body: { ...data },
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
  useBlogDataQuery,
  usePostBlogMutation,
  useDeleteBlogMutation,
  useGetAuthorQuery,
  useLazyGetAuthorQuery,
  useLazyBlogDataQuery,
  useAddCommentMutation,
  useRemoveCommentMutation,
  useEditCommentMutation,
  useAuthorReplyMutation,
  useReplyDeleteMutation,
} = blogApi;

export default blogApi;
