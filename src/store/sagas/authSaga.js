import axios from 'axios';

import { VkGetUserAction } from '../actions/vkActions';
import { takeEvery, put } from 'redux-saga/effects';
import { AuthApiService } from '../../services/AuthApiService';
import { AuthActionType } from '../actions/authActions';

function setToken ({ payload }) {
  axios.defaults.headers.common = {
    'X-JWT': `${payload.token}`,
  };
}

function* getToken ({ payload }) {
  const authData = yield AuthApiService.getToken(payload.data);

  if (authData) {
    yield put({
      type: AuthActionType.SUCCESS,
      payload: {
        token: authData,
      },
    });
  }
}

export function* authSaga () {
  yield takeEvery(VkGetUserAction.SUCCESS, getToken);
  yield takeEvery(AuthActionType.SUCCESS, setToken);
}
