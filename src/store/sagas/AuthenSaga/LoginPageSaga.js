import {
  all, put, takeLatest,
} from 'redux-saga/effects';

import * as constants from '../../constants/AuthenConstants/LoginPageConstants';
import { apiLogin, apiLogout } from '../../../apis/authenticate-api';

function* callApiLogin(actions) {
  try {
    const data = yield apiLogin(actions.data);
    yield put({
      type: constants.LOG_IN_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.LOG_IN_FAILED,
    });
  }
}

function* callApiLogout(actions) {
  try {
    const data = yield apiLogout(actions.data);

    yield put({
      type: constants.LOG_OUT_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.LOG_IN_FAILED,
    });
  }
}

export default function* LoginPageSaga() {
  yield all([
    takeLatest(constants.LOG_IN, callApiLogin),
    takeLatest(constants.LOG_OUT, callApiLogout),
  ]);
}
