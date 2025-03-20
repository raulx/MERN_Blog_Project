import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/variables";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    fetchFn: async (...args) => {
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      getUserProfile: builder.query({
        query: () => {
          return {
            url: `/user/getUserProfile`,
            method: "GET",
          };
        },
      }),

      getUserHistory: builder.query({
        query: (pageNumber) => {
          return {
            url: `/user/getUserHistory?pageNumber=${pageNumber}`,
          };
        },
      }),

      getUserLikes: builder.query({
        query: (pageNumber) => {
          return {
            url: `/user/getUserLikes?pageNumber=${pageNumber}`,
          };
        },
      }),
    };
  },
});

export default userApi;
export const {
  useGetUserProfileQuery,
  useLazyGetUserProfileQuery,
  useLazyGetUserHistoryQuery,
  useLazyGetUserLikesQuery,
} = userApi;
