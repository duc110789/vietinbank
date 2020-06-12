import {
  all, put, takeLatest,
} from 'redux-saga/effects';

import * as constants from '../../constants/StaffManagementConstants/StaffManagementListConstants';
import { apigetListStaff, apiUpdateStatusStaff } from '../../../apis/userLocalApi/userLocal-management-api';

function* callApigetListStaff(actions) {
  try {
    const data = yield apigetListStaff(actions.data);
    yield put({
      type: constants.LOAD_DEFAULT_DATA_STAFF_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.LOAD_DEFAULT_DATA_STAFF_FAIL,
    });
  }
}

function* callApigetListStaffByPagination(actions) {
  try {
    const sendData = {
      ...actions.data,
      fromRow: actions.fromRow,
      pageSize: actions.pageSize,
    };
    const data = yield apigetListStaff(sendData);
    yield put({
      type: constants.SEARCH_BY_PAGINATION_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.SEARCH_BY_PAGINATION_FAIL,
    });
  }
}


function* callApiChangeStatusStaff(actions) {
  try {
    const sendData = {
      status: actions.data.status === 1 ? 2 : 1,
    };
    let data = yield apiUpdateStatusStaff(actions.data);
    data = {...data,status: sendData.status}
    yield put({
      type: constants.CHANGE_STATUS_STAFF_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.CHANGE_STATUS_STAFF_FAIL,
    });
  }
}


export default function* staffListPageSaga() {
  yield all([
    takeLatest(constants.LOAD_DEFAULT_DATA_STAFF, callApigetListStaff),
    takeLatest(constants.SEARCH_BY_PAGINATION, callApigetListStaffByPagination),
    takeLatest(constants.CHANGE_STATUS_STAFF, callApiChangeStatusStaff),
  ]);
}
