import {
  all, put, takeLatest,
} from 'redux-saga/effects';

import * as constants from '../../constants/AuthenConstants/ResetPasswordConstants';
import { apiResetPassword } from '../../../apis/authenticate-api';

function* callApiResetPassword(actions) {
  try {
    const data = yield apiResetPassword(actions.data);
    yield put({
      type: constants.RESET_PASSWORD_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.RESET_PASSWORD_FAILED,
    });
  }
}



export default function* ResetPasswordPageSaga() {
  yield all([
    takeLatest(constants.RESET_PASSWORD, callApiResetPassword),
  ]);
}
