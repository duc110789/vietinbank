import {
  all, put, takeLatest,
} from 'redux-saga/effects';

import * as constants from '../../constants/StaffManagementConstants/StaffManagementUpdateConstants';
import { apiGetInfoStaff, apiUpdateInfoStaff } from '../../../apis/userLocalApi/userLocal-management-api';

function* callApiGetInfoStaff(actions) {
  try {
    const data = yield apiGetInfoStaff({staffCode: actions.data});
    yield put({
      type: constants.GET_INFO_STAFF_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_INFO_STAFF_FAIL,
    });
  }
}

function* callApiUpdateInfoStaff(actions) {
  try {
    const data = yield apiUpdateInfoStaff(actions.data);
    yield put({
      type: constants.UPDATE_INFO_STAFF_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.UPDATE_INFO_STAFF_FAIL,
    });
  }
}



export default function* staffUpdatePageSaga() {
  yield all([
    takeLatest(constants.GET_INFO_STAFF, callApiGetInfoStaff),
    takeLatest(constants.UPDATE_INFO_STAFF, callApiUpdateInfoStaff),
  ]);
}
