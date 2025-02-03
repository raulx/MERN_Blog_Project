import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { userData: "", blogs: [] },
  reducers: {
    setUserData(state, action) {
      state.userData = action.payload;
    },
    setUserBlogs(state, action) {
      const newData = action.payload;
      state.blogs = [...state.blogs, ...newData];
    },
  },
});

export const { setUserBlogs, setUserData } = userSlice.actions;
export default userSlice.reducer;
