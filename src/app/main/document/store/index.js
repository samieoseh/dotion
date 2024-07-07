import { combineReducers } from "@reduxjs/toolkit";
import document from "./documentSlice";

const reducer = combineReducers({
  document,
});

export default reducer;
