import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { pause } from "./blogApi";
import { BASE_URL } from "../../utils/variables";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    fetchFn: async (...args) => {
      await pause(2000);
      return fetch(...args);
    },
  }),

  endpoints(builder) {
    return {
      registerUser: builder.mutation({
        query: ({ name, email, password }) => {
          return {
            url: "/user/register",
            method: "POST",
            body: { name, email, password },
          };
        },
      }),
      logOut: builder.mutation({
        query: () => {
          return {
            url: "/user/logout",
            method: "POST",
          };
        },
      }),
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
export const { useLogInMutation, useLogOutMutation, useRegisterUserMutation } =
  authApi;

export default authApi;
