import connect from '@vkontakte/vkui-connect';

import type { ActionType } from '../../utils/actionType';
import { actionType } from '../../utils/actionType';

export const VkGetUserAction: ActionType = actionType('vk-get-user-action');

export const getUserInfo = () => {
  return (dispatch) => {
    dispatch({
      type: VkGetUserAction.FETCHING,
    });

    connect.send('VKWebAppGetUserInfo', {});
  };
};
