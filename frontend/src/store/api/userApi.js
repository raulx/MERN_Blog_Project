import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "./blogApi";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    fetchFn: async (...args) => {
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      getUser: builder.query({
        query: (userId) => {
          return {
            url: `/users/${userId}`,
          };
        },
      }),
    };
  },
});

export default userApi;
export const { useGetUserQuery, useLazyGetUserQuery } = userApi;
