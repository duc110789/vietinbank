import {
  all, put, call, takeLatest,
} from 'redux-saga/effects';

import * as constants from '../../constants/qRCode/qRCodeConstant';
import {
  addQrCode,
  getQrCode,
  getQrCodeList,
  getLockOrUnlock,
  updateQrcode,
} from '../../../apis/qrCode/qrCode';

const apiAddQrCode = async (params) => {
  const data = await addQrCode(params);
  return data;
};

const apiEditQrCode = async (params) => {
  const data = await updateQrcode(params);
  return data;
};

const apiGetQrCode = async (params) => {
  const data = await getQrCode(params);
  return data;
};

const apiGetQrCodeList = async (params) => {
  const data = await getQrCodeList(params);
  return data;
};

const apiLockorUnLockQrCode = async (params) => {
  const data = await getLockOrUnlock(params);
  return data;
};

function* loadApiAddQrCode(actions) {
  try {
    const data = yield call(apiAddQrCode, actions.data);
    yield put({
      type: constants.ADD_QRCODE_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.ADD_QRCODE_FAILED,
    });
  }
}

function* loadApiEditQrCode(actions) {
  try {
    const data = yield call(apiEditQrCode, actions.data);
    yield put({
      type: constants.EDIT_QRCODE_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.EDIT_QRCODE_FAILED,
    });
  }
}

function* loadApiGetQrCode(actions) {
  try {
    const data = yield call(apiGetQrCode, actions.data);
    yield put({
      type: constants.GET_QRCODE_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_QRCODE_FAILED,
    });
  }
}

function* loadApiGetQrCodeList(actions) {
  try {
    const data = yield call(apiGetQrCodeList, actions.data);
    yield put({
      type: constants.GET_QRCODE_LIST_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_QRCODE_LIST_FAILED,
    });
  }
}

function* loadLockOrUnlockQrCode(actions) {
  try {
    const data = yield call(apiLockorUnLockQrCode, actions.data);
    yield put({
      type: constants.LOCK_UNLOCK_QRCODE_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.LOCK_UNLOCK_QRCODE_FAILED,
    });
  }
}

export default function* qRCodeSage() {
  yield all([
    takeLatest(constants.ADD_QRCODE, loadApiAddQrCode),
    takeLatest(constants.EDIT_QRCODE, loadApiEditQrCode),
    takeLatest(constants.GET_QRCODE, loadApiGetQrCode),
    takeLatest(constants.GET_QRCODE_LIST, loadApiGetQrCodeList),
    takeLatest(constants.LOCK_UNLOCK_QRCODE, loadLockOrUnlockQrCode),
  ]);
}
