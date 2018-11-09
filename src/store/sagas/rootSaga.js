import { all, call } from 'redux-saga/effects';

import { vkConnectSaga } from './vkConnectSaga';

export function* rootSaga () {
  yield all([
    call(vkConnectSaga),
  ]);
}
