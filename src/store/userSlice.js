import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {
      name: "John Doe",
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },

    logoutUser: (state, action) => {
      state.currentUser = {
        name: "John Doe",
      };
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export const selectUser = (state) => state.user.currentUser;

export default userSlice.reducer;
