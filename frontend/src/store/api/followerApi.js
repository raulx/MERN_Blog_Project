import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../../utils/variables";

const followerApi = createApi({
  reducerPath: "followerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    fetchFn: async (...args) => {
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      followAuthor: builder.mutation({
        query: (followTo) => {
          return {
            url: `/follower`,
            method: "POST",
            body: { followTo },
          };
        },
      }),

      unfollowAuthor: builder.mutation({
        query: (followTo) => {
          return {
            url: `/follower`,
            method: "DELETE",
            body: { followTo },
          };
        },
      }),
    };
  },
});

export const { useFollowAuthorMutation, useUnfollowAuthorMutation } =
  followerApi;
export default followerApi;
