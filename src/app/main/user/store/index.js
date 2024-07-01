import { combineReducers } from "@reduxjs/toolkit";
import user from "./userSlice"

const reducer = combineReducers({
  user
})

export default reducer;