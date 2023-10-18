import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cloud = import.meta.env.VITE_CLOUDINARY_CLOUD;

const imageApi = createApi({
  reducerPath: "imageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.cloudinary.com/v1_1/${cloud}`,
    fetchFn: async (...args) => {
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      postImage: builder.mutation({
        query: (formData) => {
          return {
            url: "/upload",
            method: "POST",
            body: formData,
          };
        },
      }),
    };
  },
});

export default imageApi;
export const { usePostImageMutation } = imageApi;
