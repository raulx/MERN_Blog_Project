import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "./blogApi";
import { pause } from "./blogApi";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    fetchFn: async (...args) => {
      await pause(2000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      logIn: builder.mutation({
        query: (email) => {
          return {
            url: `/users/?email=${email}`,
            method: "GET",
          };
        },
      }),
    };
  },
});
export const { useLogInMutation } = authApi;

export default authApi;
