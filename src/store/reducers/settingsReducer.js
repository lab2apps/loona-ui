import { SettingsHideOnBoardingActionTypes } from '../actions/settingsActions';

export type SettingState = {
  showOnBoarding: boolean;
};

const savedShowOnboarding = localStorage.getItem('showOnBoarding');

const initialState: SettingState = {
  showOnBoarding: savedShowOnboarding === null,
};

export const settingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SettingsHideOnBoardingActionTypes.SUCCESS: {
      localStorage.setItem('showOnBoarding', 'false');

      return {
        ...state,
        showOnBoarding: false,
      };
    }

    default: {
      return state;
    }
  }
};
