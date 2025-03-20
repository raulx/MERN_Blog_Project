import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../../utils/variables";

const authorApi = createApi({
  reducerPath: "authorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    fetchFn: async (...args) => {
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      getAuthorProfile: builder.query({
        query: (authorId) => {
          return {
            url: `/user/getAuthorProfile`,
            method: "GET",
            params: { authorId },
          };
        },
      }),

      getAuthorBlogs: builder.query({
        query: ({ authorId, pageNumber }) => {
          return {
            url: `/blogs/getAuthorBlogs`,
            method: "GET",
            params: { authorId, pageNumber },
          };
        },
      }),
    };
  },
});

export default authorApi;
export const { useLazyGetAuthorProfileQuery, useLazyGetAuthorBlogsQuery } =
  authorApi;
