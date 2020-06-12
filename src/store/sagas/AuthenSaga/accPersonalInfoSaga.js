import {
  all, put, takeLatest,
} from 'redux-saga/effects';

import * as constants from '../../constants/AuthenConstants/accPersonalInfoConstants';
import { apiGetAccPersonalInfo, apiUpdateAccInfo, apiAccChangePass } from '../../../apis/authenticate-api';

function* callApigetAccPersonalInfo(actions) {
  try {
    const data = yield apiGetAccPersonalInfo();
    yield put({
      type: constants.GET_ACC_PERSONAL_INFO_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_ACC_PERSONAL_INFO_FAIL,
    });
  }
}


function* callApiUpdateAccInfo(actions) {
  try {
    const data = yield apiUpdateAccInfo(actions.data);
    yield put({
      type: constants.UPDATE_ACC_INFO_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.UPDATE_ACC_INFO_FAIL,
    });
  }
}

function* callApiChangePasswordInfo(actions) {
  try {
    const data = yield apiAccChangePass(actions.data);
    yield put({
      type: constants.ACC_CHANGE_PASSWORD_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.ACC_CHANGE_PASSWORD_FAIL,
    });
  }
}

export default function* accPersonInfoPage() {
  yield all([
    takeLatest(constants.GET_ACC_PERSONAL_INFO, callApigetAccPersonalInfo),
    takeLatest(constants.UPDATE_ACC_INFO, callApiUpdateAccInfo),
    takeLatest(constants.ACC_CHANGE_PASSWORD, callApiChangePasswordInfo),
  ]);
}
