import {
  all, put, call, takeLatest,
} from 'redux-saga/effects';

import * as constants from '../../constants/masterMerchant/masterMerchantConstant';
import {
  addMasterMerchant,
  getMerchantDetail,
  getMerchantCodeName,
  getTerminalListByMid,
  getMerchantList,
  getMerchantListDenied,
  getmerchantinfo,
  acceptMerchant,
  deniedMerchant,
  merchantupdate,
  callApiLockOrUnlock,
  getMerchantDetailDenied,
} from '../../../apis/masterMerchant/masterMerchant';

const apiAddMasterMerchant = async (params) => {
  const data = await addMasterMerchant(params);
  return data;
};

const apiGetMerchantDetail = async (params) => {
  const data = await getMerchantDetail(params);
  return data;
};

const apiGetMerchantCodeName = async (params) => {
  const data = await getMerchantCodeName(params);
  return data;
};
const apiGetTerminalListByMid = async (params) => {
  const data = await getTerminalListByMid(params);
  return data;
};

const apiGetMerchantList = async (params) => {
  const data = await getMerchantList(params);
  return data;
};

const apiGetMerchantListDenied = async (params) => {
  const data = await getMerchantListDenied(params);
  return data;
};

const apiGetMerchantInfo = async (params) => {
  const data = await getmerchantinfo(params);
  return data;
};

const apiGetMerchantDetailDenied = async (params) => {
  const data = await getMerchantDetailDenied(params);
  return data;
};

const apiApprovedMerchant = async (params) => {
  const data = await acceptMerchant(params);
  return data;
};

const apiMerchantUpdate = async (params) => {
  const data = await merchantupdate(params);
  return data;
};

const apiDeniedMerchant = async (params) => {
  const data = await deniedMerchant(params);
  return data;
};

const apiLockorUnLock = async (params) => {
  const data = await callApiLockOrUnlock(params);
  return data;
};

const apiExportExcelFile = async (params) => {
  const data = await getMerchantList(params);
  return data;
};

function* loadApiAddMasterMerchant(actions) {
  try {
    const data = yield call(apiAddMasterMerchant, actions.data);
    yield put({
      type: constants.ADD_MASTER_MERCHANT_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.ADD_MASTER_MERCHANT_FAILED,
    });
  }
}

function* loadApiGetMerchantDetail(actions) {
  try {
    const data = yield call(apiGetMerchantDetail, actions.data);
    yield put({
      type: constants.GET_MERCHANT_DETAIL_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_MERCHANT_DETAIL_FAILED,
    });
  }
}

function* loadApiGetMerchantList(actions) {
  try {
    const data = yield call(apiGetMerchantCodeName, actions.data);
    yield put({
      type: constants.GET_MERCHANT_CODE_NAME_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_MERCHANT_CODE_NAME_FAILED,
    });
  }
}

function* loadApiGetTerminalListByMid(actions) {
  try {
    const data = yield call(apiGetTerminalListByMid, actions.data);
    yield put({
      type: constants.GET_LIST_TERMINAL_DETAIL_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_LIST_TERMINAL_DETAIL_FAILED,
    });
  }
}

function* loadApiGetMerchantListTable(actions) {
  try {
    const data = yield call(apiGetMerchantList, actions.data);
    yield put({
      type: constants.GET_MERCHANT_LIST_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_MERCHANT_LIST_FAILED,
    });
  }
}

function* loadApiGetMerchantListDenied(actions) {
  try {
    const data = yield call(apiGetMerchantListDenied, actions.data);
    yield put({
      type: constants.GET_MERCHANT_LIST_DENIED_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_MERCHANT_LIST_DENIED_SUCCESS,
    });
  }
}

function* loadApiGetMerchantDetailDenied(actions) {
  try {
    const data = yield call(apiGetMerchantDetailDenied, actions.data);
    yield put({
      type: constants.GET_MERCHANT_DETAIL_DENIED_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_MERCHANT_DETAIL_DENIED_FAILED,
    });
  }
}

function* loadApiGetMerchantInfo(actions) {
  try {
    const data = yield call(apiGetMerchantInfo, actions.data);
    yield put({
      type: constants.GET_MERCHANT_INFO_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_MERCHANT_INFO_FAILED,
    });
  }
}

function* loadApiApprovedMerchant(actions) {
  try {
    const data = yield call(apiApprovedMerchant, actions.data);
    yield put({
      type: constants.APPROVED_MERCHANT_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.APPROVED_MERCHANT_FAILED,
    });
  }
}

function* loadApiDeniedMerchant(actions) {
  try {
    const data = yield call(apiDeniedMerchant, actions.data);
    yield put({
      type: constants.DENIED_MERCHANT_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.DENIED_MERCHANT_FAILED,
    });
  }
}

function* loadApiMerchantUpdate(actions) {
  try {
    const data = yield call(apiMerchantUpdate, actions.data);
    yield put({
      type: constants.UPDATE_MERCHANT_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.UPDATE_MERCHANT_FAILED,
    });
  }
}

function* loadLockOrUnlockMerchant(actions) {
  try {
    const data = yield call(apiLockorUnLock, actions.data);
    yield put({
      type: constants.LOCK_UNLOCK_MERCHANT_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.LOCK_UNLOCK_MERCHANT_FAILED,
    });
  }
}

function* loadExportExcelFile(actions) {
  try {
    const data = yield call(apiExportExcelFile, actions.data);
    yield put({
      type: constants.EXPORT_EXCEL_FILE_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.EXPORT_EXCEL_FILE_FAILED,
    });
  }
}

export default function* masterMerchantSage() {
  yield all([
    takeLatest(constants.ADD_MASTER_MERCHANT, loadApiAddMasterMerchant),
    takeLatest(constants.GET_MERCHANT_DETAIL, loadApiGetMerchantDetail),
    takeLatest(constants.GET_MERCHANT_CODE_NAME, loadApiGetMerchantList),
    takeLatest(constants.GET_LIST_TERMINAL_DETAIL, loadApiGetTerminalListByMid),
    takeLatest(constants.GET_MERCHANT_LIST, loadApiGetMerchantListTable),
    takeLatest(constants.GET_MERCHANT_LIST_DENIED, loadApiGetMerchantListDenied),
    takeLatest(constants.GET_MERCHANT_INFO, loadApiGetMerchantInfo),
    takeLatest(constants.APPROVED_MERCHANT, loadApiApprovedMerchant),
    takeLatest(constants.DENIED_MERCHANT, loadApiDeniedMerchant),
    takeLatest(constants.UPDATE_MERCHANT, loadApiMerchantUpdate),
    takeLatest(constants.LOCK_UNLOCK_MERCHANT, loadLockOrUnlockMerchant),
    takeLatest(constants.EXPORT_EXCEL_FILE, loadExportExcelFile),
    takeLatest(constants.GET_MERCHANT_DETAIL_DENIED, loadApiGetMerchantDetailDenied),
  ]);
}
