import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { id: "", blogs: [] },
  reducers: {
    setUserId(state, action) {
      state.id = action.payload;
    },
    setUserBlogs(state, action) {
      const newData = action.payload;
      state.blogs = [...state.blogs, ...newData];
    },
  },
});

export const { setUserBlogs, setUserId } = userSlice.actions;
export default userSlice.reducer;
