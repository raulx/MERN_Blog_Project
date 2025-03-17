import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {
      _id: "",
      name: "",
      email: "",
      profile_pic: "",
      createdAt: "",
      updatedAt: "",
      blogsWritten: 0,
      totalFollowers: 0,
    },
  },
  reducers: {
    setUserData(state, action) {
      state.data = action.payload;
    },
  },
});

export const { setUserBlogs, setUserData } = userSlice.actions;
export default userSlice.reducer;
