import { put, takeEvery } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import connect from '@vkontakte/vkui-connect';

import { VkGetUserAction } from '../actions/vkActions';
import { RoomApiService } from '../../services/RoomApiService';
import { RoomGetActionType } from '../actions/roomActions';

function subscribeToVkEvents () {
  return eventChannel((emit) => {
    connect.subscribe(({ detail }) => {
      switch (detail.type) {
        case 'VKWebAppGetUserInfoResult': {
          emit({
            type: VkGetUserAction.SUCCESS,
            payload: {
              data: detail.data,
            },
          });

          break;
        }

        case 'VKWebAppOpenPayFormResult': {
          //const [orderId, roomId] = detail.data.result.extra;

          let promise;

          if (detail.data.result.status) {
             promise =RoomApiService.successPayment(window._vk_pay_order);
          } else {
            promise = RoomApiService.failPayment(window._vk_pay_order);
          }

          promise.then(() => {
            RoomApiService.get(window._vk_pay_room).then((data) => {
              emit({
                type: RoomGetActionType.SUCCESS,
                payload: {
                  data,
                }
              });
            });


            delete window._vk_pay_room;
            delete window._vk_pay_order;

          });


          break;
        }

        default: {
          console.warn('Unknown VK EVENT');
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


