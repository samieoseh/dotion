import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const updateUser = createAsyncThunk("updateUser", async (userData) => {
  const response = await axios.patch(`user/${userData._id}`, userData.data);
  const data = await response.data;
  return data;
});

export const getUser = createAsyncThunk("getUser", async () => {
  const response = await axios.get("user");
  const data = await response.data;
  return data;
});

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
      state = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.currentUser = action.payload.updatedUser;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.currentUser = action.payload.user;
    });
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export const selectUser = (state) => state.user.currentUser;

export default userSlice.reducer;
