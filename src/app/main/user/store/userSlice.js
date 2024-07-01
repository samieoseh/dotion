import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userAdapter = createEntityAdapter({
  selectId: (user) => user._id
})

export const signUpOauth = createAsyncThunk(
  'userApp/user/signupOauth',
  async () => {
    const response = axios.post('/auth/signup', {})
    const data = await response.data;

    return data
  }
) 

const userSlice = createSlice({
  name: "userApp/user",
  initialState: userAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUpOauth.fulfilled, (state, action) => {
      console.log(action.payload)
    });
  },
});

export default userSlice.reducer;