import {
  all, put, takeLatest,
} from 'redux-saga/effects';

import * as constants from '../../constants/RoleManagementConstants/AddNewRolesConstants';
import { apiAddNewRoles } from '../../../apis/userLocalApi/userLocal-management-api';

function* callApiAddNewRoles(actions) {
  try {
    const data = yield apiAddNewRoles(actions.data);
    yield put({
      type: constants.ADD_NEW_ROLES_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.ADD_NEW_ROLES_FAIL,
    });
  }
}



export default function* AddNewRoleSaga() {
  yield all([
    takeLatest(constants.ADD_NEW_ROLES, callApiAddNewRoles),
  ]);
}
