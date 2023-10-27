import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { pause } from "./blogApi";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    fetchFn: async (...args) => {
      await pause(2000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      logIn: builder.mutation({
        query: (data) => {
          return {
            url: `/user/login`,
            method: "POST",
            body: { email: data.email, password: data.password },
          };
        },
      }),
    };
  },
});
export const { useLogInMutation } = authApi;

export default authApi;
