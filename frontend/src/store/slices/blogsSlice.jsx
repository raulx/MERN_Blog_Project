import { createSlice } from "@reduxjs/toolkit";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: { blogs: [], prevData: [], currentPage: 0, pageSize: 12 },
  reducers: {
    addBlog(state, action) {
      const newData = action.payload;
      state.blogs = [...state.blogs, ...newData];
    },
    addPage(state) {
      state.currentPage += 1;
    },
    removeBlog(state, action) {
      state.blogs = state.blogs.filter((blog) => {
        return blog._id != action.payload;
      });
    },
    setPrevData(state, action) {
      state.prevData = action.payload;
    },
  },
});
export const { addBlog, addPage, setPrevData, removeBlog } = blogsSlice.actions;
export default blogsSlice.reducer;
