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
      getUser: builder.query({
        query: () => {
          return {
            url: `/user/getuser`,
          };
        },
      }),
    };
  },
});

export default userApi;
export const { useGetUserQuery, useLazyGetUserQuery } = userApi;
