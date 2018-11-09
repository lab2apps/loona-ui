import { combineReducers } from 'redux';

import { userReducer } from './userReducer';
import type { UserState } from './userReducer';

export type RootState = {
  user: UserState,
};

export const rootReducer = (state, action) => {
  return combineReducers({
    user: userReducer,
  })(state, action);
};
