import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { auth: localStorage.getItem("user") || false },
  reducers: {
    logIn(state) {
      localStorage.setItem("user", JSON.stringify({ auth: true }));
      state.auth = true;
    },
    logOut(state) {
      localStorage.removeItem("user");
      state.auth = false;
    },
  },
});
export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
