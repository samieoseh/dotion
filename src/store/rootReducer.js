import { combineReducers } from "@reduxjs/toolkit";
import user from "./userSlice";
const createReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    user,
    ...asyncReducers,
  });

  if (action.type === "user/logoutUser") {
    state = undefined;
  }

  return combinedReducer(state, action);
}; 

export default createReducer