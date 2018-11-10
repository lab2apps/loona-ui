import { all, call } from 'redux-saga/effects';

import { vkConnectSaga } from './vkConnectSaga';
import { authSaga } from './authSaga';

export function* rootSaga () {
  yield all([
    call(vkConnectSaga),
    call(authSaga),
  ]);
}
