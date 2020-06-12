import {
  all,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import * as constants from '../../constants/midTid/mIdTIdConstant';
import {
  addUserMid,
  editUserMid,
  getListUser,
  getLockOrUnlock,
  getUserInfo, resetPass,
} from '../../../apis/userMidTid/userMidTid';

const apiAddUserMid = async (params) => {
  const data = await addUserMid(params);
  return data;
};

const apiEditUserMid = async (params) => {
  const data = await editUserMid(params);
  return data;
};

const apiGetUserInfo = async (params) => {
  const data = await getUserInfo(params);
  return data;
};

const apiMidTidList = async (params) => {
  const data = await getListUser(params);
  return data;
};

const apiLockorUnLockMidTid = async (params) => {
  const data = await getLockOrUnlock(params);
  return data;
};

const apiResetPasswordMidTidList = (params) => resetPass(params);

function* loadApiAddUserMid(actions) {
  try {
    const data = yield call(apiAddUserMid, actions.data);
    yield put({
      type: constants.ADD_MID_TID_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.ADD_MID_TID_FAILED,
    });
  }
}

function* loadApiEditUserMid(actions) {
  try {
    const data = yield call(apiEditUserMid, actions.data);
    yield put({
      type: constants.EDIT_MID_TID_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.EDIT_MID_TID_FAILED,
    });
  }
}

function* loadApiGetUserInfo(actions) {
  try {
    const data = yield call(apiGetUserInfo, actions.data);
    yield put({
      type: constants.GET_USER_INFO_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_USER_INFO_FAILED,
    });
  }
}

function* loadApiGetMidTidList(actions) {
  try {
    const data = yield call(apiMidTidList, actions.data);
    yield put({
      type: constants.GET_MID_TID_LIST_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_MID_TID_LIST_FAILED,
    });
  }
}

function* loadLockOrUnlockMidTid(actions) {
  try {
    const data = yield call(apiLockorUnLockMidTid, actions.data);
    yield put({
      type: constants.LOCK_UNLOCK_MID_TID_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.LOCK_UNLOCK_MID_TID_FAILED,
    });
  }
}

function* apiResetPasswordMidTid(actions) {
  try {
    const data = yield call(apiResetPasswordMidTidList, actions.data);
    yield put({
      type: constants.RESET_PASS_MID_TID_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.RESET_PASS_MID_TID_FAILED,
    });
  }
}

export default function* mIdTId() {
  yield all([
    takeLatest(constants.ADD_MID_TID, loadApiAddUserMid),
    takeLatest(constants.GET_USER_INFO, loadApiGetUserInfo),
    takeLatest(constants.EDIT_MID_TID, loadApiEditUserMid),
    takeLatest(constants.GET_MID_TID_LIST, loadApiGetMidTidList),
    takeLatest(constants.LOCK_UNLOCK_MID_TID, loadLockOrUnlockMidTid),
    takeLatest(constants.RESET_PASS_MID_TID, apiResetPasswordMidTid),
  ]);
}
