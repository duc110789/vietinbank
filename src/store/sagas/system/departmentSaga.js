import {
  all, put, call, takeLatest,
} from 'redux-saga/effects';

import * as constants from '../../constants/system/systemDepartmentConstant';
import {
  getListDepartment,
  updateStatusDepartment,
  addDepartment,
  updateDepartmentInfo,
  getDepartmentInfo,
} from '../../../apis/system/systemManager';

const apiGetListDepartment = async (params) => {
  const data = await getListDepartment(params);
  return data;
};

const apiUpdateStatusDepartment = async (params) => {
  const data = await updateStatusDepartment(params);
  return data;
};

const apiGetDepartmentInfo = async (params) => {
  const data = await getDepartmentInfo(params);
  return data;
};

const apiAddDepartment = async (params) => {
  const data = await addDepartment(params);
  return data;
};

const apiUpdateDepartmentInfo = async (params) => {
  const data = await updateDepartmentInfo(params);
  return data;
};

function* loadGpiGetListDepartment(actions) {
  try {
    const data = yield call(apiGetListDepartment, actions.data);
    yield put({
      type: constants.GET_ALL_DEPARTMENT_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_ALL_DEPARTMENT_FAIL,
    });
  }
}

function* loadApiUpdateStatusDepartment(actions) {
  try {
    const data = yield call(apiUpdateStatusDepartment, actions.data);
    yield put({
      type: constants.LOCK_OR_UNLOCK_DEPARTMENT_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.LOCK_OR_UNLOCK_DEPARTMENT_FAIL,
    });
  }
}
// ========= search

function* loadApiGetDepartmentInfo(actions) {
  try {
    const data = yield call(apiGetDepartmentInfo, actions.data);
    yield put({
      type: constants.GET_DEPARTMENT_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_DEPARTMENT_FAIL,
    });
  }
}

function* loadApiAddDepartment(actions) {
  try {
    const data = yield call(apiAddDepartment, actions.data);
    yield put({
      type: constants.ADD_DEPARTMENT_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.ADD_DEPARTMENT_FAIL,
    });
  }
}

function* loadApiUpdateDepartmentInfo(actions) {
  try {
    const data = yield call(apiUpdateDepartmentInfo, actions.data);
    yield put({
      type: constants.EDIT_DEPARTMENT_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.EDIT_DEPARTMENT_FAIL,
    });
  }
}
export default function* interiorMccManagerSage() {
  yield all([
    takeLatest(constants.GET_ALL_DEPARTMENT, loadGpiGetListDepartment),
    takeLatest(constants.LOCK_OR_UNLOCK_DEPARTMENT, loadApiUpdateStatusDepartment),
    takeLatest(constants.ADD_DEPARTMENT, loadApiAddDepartment),
    takeLatest(constants.EDIT_DEPARTMENT, loadApiUpdateDepartmentInfo),
    takeLatest(constants.GET_DEPARTMENT, loadApiGetDepartmentInfo),
  ]);
}
