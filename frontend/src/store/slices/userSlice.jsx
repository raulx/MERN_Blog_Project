import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { name: "", id: "" },
  reducers: {},
});

export default userSlice.reducer;
