import {
  all, put, takeLatest,
} from 'redux-saga/effects';

import * as constants from '../../constants/RoleManagementConstants/ListRoleConstants';
import { apiListGroup, apiLockAndUnlockRoles } from '../../../apis/userLocalApi/userLocal-management-api';

function* callApiGetRolesGroup(actions) {
  try {
    const data = yield apiListGroup(actions.data);
    yield put({
      type: constants.GET_LIST_ROLE_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_LIST_ROLE_FAIL,
    });
  }
}

function* callApiChangeStatusRole(actions) {
  try {
    const sendData = {
      groupId: actions.data.groupId,
      status: actions.data.status === 1 ? 2 : 1,
    }
    let data = yield apiLockAndUnlockRoles(sendData);
    data = {...data,status :sendData.status}
    yield put({
      type: constants.CHANGE_STATUS_ROLE_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.CHANGE_STATUS_ROLE_FAIL,
    });
  }
}


export default function* ListRoleSaga() {
  yield all([
    takeLatest(constants.GET_LIST_ROLE, callApiGetRolesGroup),
    takeLatest(constants.CHANGE_STATUS_ROLE, callApiChangeStatusRole),
  ]);
}
