import {
  all, put, takeLatest,
} from 'redux-saga/effects';

import * as constants from '../../constants/StaffManagementConstants/StaffManagementAddConstants';
import { apiAddNewStaff } from '../../../apis/userLocalApi/userLocal-management-api';

function* callApiAddStaff(actions) {
  try {
    const data = yield apiAddNewStaff(actions.data);
    yield put({
      type: constants.ADD_NEW_STAFF_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.ADD_NEW_STAFF_FAIL,
    });
  }
}



export default function* staffAddPageSaga() {
  yield all([
    takeLatest(constants.ADD_NEW_STAFF, callApiAddStaff),
  ]);
}
