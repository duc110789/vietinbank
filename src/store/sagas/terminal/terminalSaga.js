import {
  all, put, call, takeLatest,
} from 'redux-saga/effects';

import * as constants from '../../constants/terminal/terminalConstant';
import {
  getTerminalList,
  addTerminal,
  editTerminal,
  getCacheTerminal,
  getTerminalDetail,
  getTerminalListDenied,
  getTerminalDetailDenied,
  acceptTerminalKT,
  deniedTerminal,
  getLockOrUnlock,
} from '../../../apis/terminal/terminal';

const apiGetCacheTerminal = async (params) => {
  const data = await getCacheTerminal(params);
  return data;
};

const apiAddTerminal = async (params) => {
  const data = await addTerminal(params);
  return data;
};

const apiEditTerminal = async (params) => {
  const data = await editTerminal(params);
  return data;
};

const apiGetMerchantBranch = async (params) => {
  const data = await getCacheTerminal(params);
  return data;
};

const apiGetTerminalPlace = async (params) => {
  const data = await getCacheTerminal(params);
  return data;
};

const apiGetTerminalList = async (params) => {
  const data = await getTerminalList(params);
  return data;
};

const apiGetTerminalListDenied = async (params) => {
  const data = await getTerminalListDenied(params);
  return data;
};

const apiGetTerminalDetail = async (params) => {
  const data = await getTerminalDetail(params);
  return data;
};

const apiGetTerminalDetailDenied = async (params) => {
  const data = await getTerminalDetailDenied(params);
  return data;
};

const apiApprovedTerminal = async (params) => {
  const data = await acceptTerminalKT(params);
  return data;
};

const apiDeniedTerminal = async (params) => {
  const data = await deniedTerminal(params);
  return data;
};

const apiLockorUnLockTerminal = async (params) => {
  const data = await getLockOrUnlock(params);
  return data;
};

const apiGetTerminalCodeName = async (params) => {
  const data = await getCacheTerminal(params);
  return data;
};

const apiExportExcelFile = async (params) => {
  const data = await getTerminalList(params);
  return data;
};

function* loadApiGetTerminalListTable(actions) {
  try {
    const data = yield call(apiGetTerminalList, actions.data);
    yield put({
      type: constants.GET_TERMINAL_LIST_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_TERMINAL_LIST_FAILED,
    });
  }
}

function* loadApiGetTerminalListTableDenied(actions) {
  try {
    const data = yield call(apiGetTerminalListDenied, actions.data);
    yield put({
      type: constants.GET_TERMINAL_LIST_DENIED_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_TERMINAL_LIST_DENIED_FAILED,
    });
  }
}


function* loadApiGetMerchantBranch(actions) {
  try {
    const data = yield call(apiGetMerchantBranch, actions.data);
    yield put({
      type: constants.GET_MERCHANT_BRANCH_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_MERCHANT_BRANCH_FAILED,
    });
  }
}

function* loadApiGetCacheTerminal(actions) {
  try {
    const data = yield call(apiGetCacheTerminal, actions.data);
    yield put({
      type: constants.GET_CACHE_TERMINAL_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_CACHE_TERMINAL_FAILED,
    });
  }
}

function* loadApiAddTerminal(actions) {
  try {
    const data = yield call(apiAddTerminal, actions.data);
    yield put({
      type: constants.ADD_TERMINAL_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.ADD_TERMINAL_FAILED,
    });
  }
}

function* loadApiEditTerminal(actions) {
  try {
    const data = yield call(apiEditTerminal, actions.data);
    yield put({
      type: constants.EDIT_TERMINAL_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.EDIT_TERMINAL_FAILED,
    });
  }
}

function* loadApiGetTerminalDetail(actions) {
  try {
    const data = yield call(apiGetTerminalDetail, actions.data);
    yield put({
      type: constants.GET_TERMINAL_DETAIL_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_CACHE_TERMINAL_FAILED,
    });
  }
}

function* loadApiGetTerminalPlace(actions) {
  try {
    const data = yield call(apiGetTerminalPlace, actions.data);
    yield put({
      type: constants.GET_TERMINAL_PLACE_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_TERMINAL_PLACE_FAILED,
    });
  }
}

function* loadApiGetTerminalDetailDenied(actions) {
  try {
    const data = yield call(apiGetTerminalDetailDenied, actions.data);
    yield put({
      type: constants.GET_TERMINAL_DETAIL_DENIED_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_TERMINAL_DETAIL_DENIED_FAILED,
    });
  }
}

function* loadApiApprovedTerminal(actions) {
  try {
    const data = yield call(apiApprovedTerminal, actions.data);
    yield put({
      type: constants.APPROVED_TERMINAL_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.APPROVED_TERMINAL_FAILED,
    });
  }
}

function* loadApiDeniedTerminal(actions) {
  try {
    const data = yield call(apiDeniedTerminal, actions.data);
    yield put({
      type: constants.DENIED_TERMINAL_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.DENIED_TERMINAL_FAILED,
    });
  }
}

function* loadLockOrUnlockTerminal(actions) {
  try {
    const data = yield call(apiLockorUnLockTerminal, actions.data);
    yield put({
      type: constants.LOCK_UNLOCK_TERMINAL_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.LOCK_UNLOCK_TERMINAL_FAILED,
    });
  }
}

function* loadApiGetTerminalCodeName(actions) {
  try {
    const data = yield call(apiGetTerminalCodeName, actions.data);
    yield put({
      type: constants.GET_TERMINAL_CODE_NAME_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_TERMINAL_CODE_NAME_FAILED,
    });
  }
}

function* loadExportExcelFileTerminal(actions) {
  try {
    const data = yield call(apiExportExcelFile, actions.data);
    yield put({
      type: constants.EXPORT_EXCEL_FILE_TERMINAL_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.EXPORT_EXCEL_FILE_TERMINAL_FAILED,
    });
  }
}


export default function* terminalSage() {
  yield all([
    takeLatest(constants.GET_TERMINAL_LIST, loadApiGetTerminalListTable),
    takeLatest(constants.GET_MERCHANT_BRANCH, loadApiGetMerchantBranch),
    takeLatest(constants.GET_CACHE_TERMINAL, loadApiGetCacheTerminal),
    takeLatest(constants.ADD_TERMINAL, loadApiAddTerminal),
    takeLatest(constants.EDIT_TERMINAL, loadApiEditTerminal),
    takeLatest(constants.GET_TERMINAL_DETAIL, loadApiGetTerminalDetail),
    takeLatest(constants.GET_TERMINAL_PLACE, loadApiGetTerminalPlace),
    takeLatest(constants.GET_TERMINAL_LIST_DENIED, loadApiGetTerminalListTableDenied),
    takeLatest(constants.GET_TERMINAL_DETAIL_DENIED, loadApiGetTerminalDetailDenied),
    takeLatest(constants.APPROVED_TERMINAL, loadApiApprovedTerminal),
    takeLatest(constants.DENIED_TERMINAL, loadApiDeniedTerminal),
    takeLatest(constants.LOCK_UNLOCK_TERMINAL, loadLockOrUnlockTerminal),
    takeLatest(constants.GET_TERMINAL_CODE_NAME, loadApiGetTerminalCodeName),
    takeLatest(constants.EXPORT_EXCEL_FILE_TERMINAL, loadExportExcelFileTerminal),
  ]);
}
