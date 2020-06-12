import {all, put, takeLatest,} from 'redux-saga/effects';

import * as constants from '../../constants/LocalUserManageMentConstants/ResetPasswordConstants';
import {apiResetPasswordLocalAcc} from '../../../apis/userLocalApi/userLocal-management-api';

function* callApiResetPasswordLocalAcc(actions) {
  try {
    const data = yield apiResetPasswordLocalAcc(actions.data);
    yield put({
      type: constants.RESET_PASSWORD_LOCAL_ACC_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.RESET_PASSWORD_LOCAL_ACC_FAIL,
    });
  }
}
export default function* ResetPassLocalAccPageSaga() {
  yield all([
    takeLatest(constants.RESET_PASSWORD_LOCAL_ACC, callApiResetPasswordLocalAcc),
  ]);
}
