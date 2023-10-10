import { createSlice } from "@reduxjs/toolkit";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: { blogs: [], currentPage: 1, pageSize: 15 },
  reducers: {
    addBlog(state, action) {
      const newData = action.payload;
      state.blogs = [...state.blogs, ...newData];
    },
    addPage(state) {
      state.currentPage += 1;
    },
  },
});
export const { addBlog, addPage } = blogsSlice.actions;
export default blogsSlice.reducer;
