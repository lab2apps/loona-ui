import { combineReducers } from 'redux';

import { userReducer } from './userReducer';
import type { UserState } from './userReducer';

import { settingReducer } from './settingsReducer';
import type { SettingState } from './settingsReducer';

export type RootState = {
  user: UserState,
  settings: SettingState,
};

export const rootReducer = (state, action) => {
  return combineReducers({
    user: userReducer,
    settings: settingReducer,
  })(state, action);
};
