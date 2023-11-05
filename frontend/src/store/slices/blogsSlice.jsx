import { createSlice } from "@reduxjs/toolkit";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: { blogs: [], prevData: [], currentPage: 0, pageSize: 10 },
  reducers: {
    addBlog(state, action) {
      const newData = action.payload;
      state.blogs = [...state.blogs, ...newData];
    },
    addPage(state) {
      state.currentPage += 1;
    },
    setPrevData(state, action) {
      state.prevData = action.payload;
    },
  },
});
export const { addBlog, addPage, setPrevData } = blogsSlice.actions;
export default blogsSlice.reducer;
