import { combineReducers } from "@reduxjs/toolkit";

const createReducer = (asyncReducers) => (state, action) => {
  console.log({asyncReducers})
  const combinedReducer = combineReducers({
    ...asyncReducers
  })

  if (action.type === 'user/userLoggedOut') {
    state = undefined;
  }

  return combinedReducer(state, action);
} 

export default createReducer