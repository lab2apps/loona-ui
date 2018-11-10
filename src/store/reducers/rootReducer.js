import { combineReducers } from 'redux';

import { userReducer } from './userReducer';
import type { UserState } from './userReducer';

import { settingReducer } from './settingsReducer';
import type { SettingState } from './settingsReducer';

import { authReducer } from './authReducer';
import type { AuthState } from './authReducer';

import { allSpacesReducer } from './allSpacesReducer';
import type { AllSpacesState } from './allSpacesReducer';

import { mySpacesReducer } from './mySpacesReducer';
import type { MySpacesState } from './mySpacesReducer';

import type { SpaceState } from './spaceReducer';
import { spaceReducer } from './spaceReducer';

export type RootState = {
  user: UserState,
  settings: SettingState,
  auth: AuthState,
  spaces: AllSpacesState,
  mySpaces: MySpacesState,
  space: SpaceState,
};

export const rootReducer = (state, action) => {
  return combineReducers({
    user: userReducer,
    settings: settingReducer,
    auth: authReducer,
    spaces: allSpacesReducer,
    mySpaces: mySpacesReducer,
    space: spaceReducer,
  })(state, action);
};
