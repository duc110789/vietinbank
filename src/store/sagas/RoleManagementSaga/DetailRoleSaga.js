import {
  all, put, takeLatest,
} from 'redux-saga/effects';

import * as constants from '../../constants/RoleManagementConstants/DetailRolesConstants';
import { apiGetAllListFunction, apigetGroupDetailRoles } from '../../../apis/userLocalApi/userLocal-management-api';

function* callApiGetAllFunction(actions) {
  try {
    const data = yield apiGetAllListFunction(actions.data);
    yield put({
      type: constants.GET_ALL_FUNCTION_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_ALL_FUNCTION_FAIL,
    });
  }
}

function* callApiGetDetailRoles(actions) {
  try {
    const data = yield apigetGroupDetailRoles(actions.data);
    yield put({
      type: constants.GET_GROUP_DETAIL_ROLES_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_GROUP_DETAIL_ROLES_FAIL,
    });
  }
}


export default function* DetailRoleSaga() {
  yield all([
    takeLatest(constants.GET_ALL_FUNCTION, callApiGetAllFunction),
    takeLatest(constants.GET_GROUP_DETAIL_ROLES, callApiGetDetailRoles),
  ]);
}
