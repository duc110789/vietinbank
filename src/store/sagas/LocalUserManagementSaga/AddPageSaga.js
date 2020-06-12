import {
  all, put, takeLatest,
} from 'redux-saga/effects';

import * as constants from '../../constants/LocalUserManageMentConstants/AddPageConstants';
import { apiAddNewUser } from '../../../apis/userLocalApi/userLocal-management-api';

function* callApiAddNewUser(actions) {
  try {
    const data = yield apiAddNewUser(actions.data);
    yield put({
      type: constants.ADD_NEW_USER_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.ADD_NEW_USER_FAIL,
    });
  }
}





export default function* AddPageSaga() {
  yield all([
    takeLatest(constants.ADD_NEW_USER, callApiAddNewUser),
  ]);
}
