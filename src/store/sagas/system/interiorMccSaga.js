import {
  all, put, call, takeLatest,
} from 'redux-saga/effects';

import * as constants from '../../constants/system/systemInteriorMccConstant';
import {
  getMccInfoManagerInterior,
  getListMccManagerInterior,
  updateStatusMccInterior,
  addMccManagerInterior,
  updateMccInfoManagerInterior,
} from '../../../apis/system/systemManager';

const apiGetListMccManager = async (params) => {
  const data = await getListMccManagerInterior(params);
  return data;
};

const apiUpdateStatusMcc = async (params) => {
  const data = await updateStatusMccInterior(params);
  return data;
};

const apiGetMccInfoManager = async (params) => {
  const data = await getMccInfoManagerInterior(params);
  return data;
};

const apiAddMccManager = async (params) => {
  const data = await addMccManagerInterior(params);
  return data;
};

const apiUpdateMccInfoManager = async (params) => {
  const data = await updateMccInfoManagerInterior(params);
  return data;
};

function* loadApiGetListMccManager(actions) {
  try {
    const data = yield call(apiGetListMccManager, actions.data);
    yield put({
      type: constants.GET_ALL_INTERIOR_MMC_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_ALL_INTERIOR_MMC_FAIL,
    });
  }
}

function* loadApiUpdateStatusMcc(actions) {
  try {
    let sendData = {
      status: actions.data.status === 1 ? -1 : 1,
    }
    let data = yield call(apiUpdateStatusMcc, actions.data);
    data = {...data,status: sendData.status}
    yield put({
      type: constants.LOCK_OR_UNLOCK_INTERIOR_MMC_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.LOCK_OR_UNLOCK_INTERIOR_MMC_FAIL,
    });
  }
}
// ========= search

function* loadApiGetMccInfoManager(actions) {
  try {
    const data = yield call(apiGetMccInfoManager, actions.data);
    yield put({
      type: constants.GET_INTERIOR_MMC_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_INTERIOR_MMC_FAIL,
    });
  }
}

function* loadApiAddMccManager(actions) {
  try {
    const data = yield call(apiAddMccManager, actions.data);
    yield put({
      type: constants.ADD_INTERIOR_MMC_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.ADD_INTERIOR_MMC_FAIL,
    });
  }
}

function* loadApiUpdateMccInfoManager(actions) {
  try {
    const data = yield call(apiUpdateMccInfoManager, actions.data);
    yield put({
      type: constants.EDIT_INTERIOR_MMC_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.EDIT_INTERIOR_MMC_FAIL,
    });
  }
}
export default function* interiorMccManagerSage() {
  yield all([
    takeLatest(constants.GET_ALL_INTERIOR_MMC, loadApiGetListMccManager),
    takeLatest(constants.LOCK_OR_UNLOCK_INTERIOR_MMC, loadApiUpdateStatusMcc),
    takeLatest(constants.ADD_INTERIOR_MMC, loadApiAddMccManager),
    takeLatest(constants.EDIT_INTERIOR_MMC, loadApiUpdateMccInfoManager),
    takeLatest(constants.GET_INTERIOR_MMC, loadApiGetMccInfoManager),
  ]);
}
