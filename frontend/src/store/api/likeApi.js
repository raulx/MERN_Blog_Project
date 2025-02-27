import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL } from "../../utils/variables";

const likeApi = createApi({
  reducerPath: "likeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    fetchFn: async (...args) => {
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      addLike: builder.mutation({
        query: (blogId) => {
          return {
            url: `/likes?blogId=${blogId}`,
            method: "POST",
          };
        },
      }),
      removeLike: builder.mutation({
        query: (blogId) => {
          return {
            url: `/likes?blogId=${blogId}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const { useAddLikeMutation, useRemoveLikeMutation } = likeApi;

export default likeApi;
