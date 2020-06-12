import {
  all, put, takeLatest,
} from 'redux-saga/effects';

import * as constants from '../../constants/RoleManagementConstants/EditRolesConstants';
import { apiEditRoles } from '../../../apis/userLocalApi/userLocal-management-api';

function* callApiEditRoles(actions) {
  try {
    const data = yield apiEditRoles(actions.data);
    yield put({
      type: constants.EDIT_ROLES_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.EDIT_ROLES_FAIL,
    });
  }
}



export default function* EditRoleSaga() {
  yield all([
    takeLatest(constants.EDIT_ROLES, callApiEditRoles),
  ]);
}
