import { createSlice } from "@reduxjs/toolkit";



const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    registrationStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registrationSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    registrationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { registrationStart, registrationSuccess, registrationFailure } =
  userSlice.actions;

export default userSlice.reducer;
