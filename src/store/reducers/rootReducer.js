import { combineReducers } from 'redux';

export const rootReducer = (state, action) => {
  return combineReducers({})(state, action);
};
