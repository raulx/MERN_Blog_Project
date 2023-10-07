import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};
const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3500",
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      logIn: builder.mutation({
        query: (email) => {
          return {
            url: `/users?email=${email}`,
            method: "GET",
          };
        },
      }),
    };
  },
});
export default authApi;
export const { useLogInMutation } = authApi;
