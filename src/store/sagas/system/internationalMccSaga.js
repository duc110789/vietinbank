import {
  all, put, call, takeLatest,
} from 'redux-saga/effects';

import * as constants from '../../constants/system/systemInternationalMccConstant';
import {
  getMccInfoManager,
  getListMccManager,
  updateStatusMcc,
  addMccManager,
  updateMccInfoManager,
} from '../../../apis/system/systemManager';

const apiGetListMccManager = async (params) => {
  const data = await getListMccManager(params);
  return data;
};

const apiUpdateStatusMcc = async (params) => {
  const data = await updateStatusMcc(params);
  return data;
};

const apiGetMccInfoManager = async (params) => {
  const data = await getMccInfoManager(params);
  return data;
};

const apiAddMccManager = async (params) => {
  const data = await addMccManager(params);
  return data;
};

const apiUpdateMccInfoManager = async (params) => {
  const data = await updateMccInfoManager(params);
  return data;
};

function* loadApiGetListMccManager(actions) {
  try {
    const data = yield call(apiGetListMccManager, actions.data);
    yield put({
      type: constants.GET_ALL_INTERNATIONAL_MMC_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_ALL_INTERNATIONAL_MMC_FAIL,
    });
  }
}

function* loadApiUpdateStatusMcc(actions) {
  let sendData = {
    status: actions.data.status === 1 ? -1 : 1,
  }
  try {
    let data = yield call(apiUpdateStatusMcc, actions.data);
    data = {...data,status: sendData.status}
    yield put({
      type: constants.LOCK_OR_UNLOCK_INTERNATIONAL_MMC_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.LOCK_OR_UNLOCK_INTERNATIONAL_MMC_FAIL,
    });
  }
}
// ========= search

function* loadApiGetMccInfoManager(actions) {
  try {
    const data = yield call(apiGetMccInfoManager, actions.data);
    yield put({
      type: constants.GET_INTERNATIONAL_MMC_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_INTERNATIONAL_MMC_FAIL,
    });
  }
}

function* loadApiAddMccManager(actions) {
  try {
    const data = yield call(apiAddMccManager, actions.data);
    yield put({
      type: constants.ADD_INTERNATIONAL_MMC_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.ADD_INTERNATIONAL_MMC_FAIL,
    });
  }
}

function* loadApiUpdateMccInfoManager(actions) {
  try {
    const data = yield call(apiUpdateMccInfoManager, actions.data);
    yield put({
      type: constants.EDIT_INTERNATIONAL_MMC_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.EDIT_INTERNATIONAL_MMC_FAIL,
    });
  }
}
export default function* internationalMccManagerSage() {
  yield all([
    takeLatest(constants.GET_ALL_INTERNATIONAL_MMC, loadApiGetListMccManager),
    takeLatest(constants.LOCK_OR_UNLOCK_INTERNATIONAL_MMC, loadApiUpdateStatusMcc),
    takeLatest(constants.ADD_INTERNATIONAL_MMC, loadApiAddMccManager),
    takeLatest(constants.EDIT_INTERNATIONAL_MMC, loadApiUpdateMccInfoManager),
    takeLatest(constants.GET_INTERNATIONAL_MMC, loadApiGetMccInfoManager),
  ]);
}
