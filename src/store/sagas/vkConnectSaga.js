import { put, takeEvery } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import connect from '@vkontakte/vkui-connect';

import { VkGetUserAction } from '../actions/vkActions';


function subscribeToVkEvents () {
  return eventChannel((emit) => {
    connect.subscribe(({ detail }) => {
      switch (detail.type) {
        case 'VKWebAppGetUserInfoResult': {
          emit({
            type: VkGetUserAction.SUCCESS,
            payload: {
              data: detail.data,
            }
          });

          break;
        }

        default: {
          console.log(detail);
        }
      }

    });

    return connect.unsubscribe;
  });
}

function* dispatchToStore (event) {
  yield put(event);
}

export function* vkConnectSaga () {
  const channel = subscribeToVkEvents();

  yield takeEvery(channel, dispatchToStore);
}


