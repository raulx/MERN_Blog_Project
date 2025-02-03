import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { auth: localStorage.getItem("user") || false },
  reducers: {
    loggedIn(state, action) {
      localStorage.setItem(
        "user",
        JSON.stringify({ auth: true, id: action.payload })
      );
      state.auth = true;
    },
    loggedOut(state) {
      localStorage.removeItem("user");
      state.auth = false;
    },
  },
});
export const { loggedIn, loggedOut } = authSlice.actions;
export default authSlice.reducer;
