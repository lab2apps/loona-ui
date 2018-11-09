import { actionType } from '../../utils/actionType';
import type { ActionType } from '../../utils/actionType';

export const SettingsHideOnBoardingActionTypes: ActionType = actionType('settings-hide-onboarding');

export const hideOnBoarding = () => {
  return (dispatch) => {
    dispatch({
      type: SettingsHideOnBoardingActionTypes.SUCCESS,
    })
  };
};
