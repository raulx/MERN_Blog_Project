import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { BASE_URL } from "../../utils/variables";

const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    fetchFn: async (...args) => {
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      addComment: builder.mutation({
        query: (comment) => {
          return {
            url: "/comment",
            body: comment,
            method: "POST",
          };
        },
      }),
    };
  },
});

export const { useAddCommentMutation } = commentApi;
export default commentApi;
