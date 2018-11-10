import { combineReducers } from 'redux';

import { userReducer } from './userReducer';
import type { UserState } from './userReducer';

import { settingReducer } from './settingsReducer';
import type { SettingState } from './settingsReducer';

import { authReducer } from './authReducer';
import type { AuthState } from './authReducer';

export type RootState = {
  user: UserState,
  settings: SettingState,
  auth: AuthState,
};

export const rootReducer = (state, action) => {
  return combineReducers({
    user: userReducer,
    settings: settingReducer,
    auth: authReducer,
  })(state, action);
};
