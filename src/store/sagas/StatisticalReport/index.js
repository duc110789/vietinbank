import {all, call, put, takeLatest,} from 'redux-saga/effects';

import * as constants from '../../constants/statisticalReport/index';
import {
  getDetailTranBusiness,
  getDetailTransactionMake,
  getDetailTransactionUpdate,
  getListTranFailed,
  getListTranInterMcc,
  getListTranMerchant,
  getListTranMerchantBranch,
  getListTranMmc,
  getListTranRefund,
  getListTranTerminal,
} from '../../../apis/statisticalReport/index';

const apiGetgetDetailTransactionMake = async (params) => {
  const data = await getDetailTransactionMake(params);
  return data;
};

const apiExportExcelFile = async (params) => {
  const data = await getDetailTransactionMake(params);
  return data;
};

const apiGetDetailTransactionUpdate = async (params) => {
  const data = await getDetailTransactionUpdate(params);
  return data;
};

const apiExportExcelFileUpdate = async (params) => {
  const data = await getDetailTransactionUpdate(params);
  return data;
};

const apiGetListTranFailed = async (params) => {
  const data = await getListTranFailed(params);
  return data;
};

const apiExportExcelFileError = async (params) => {
  const data = await getListTranFailed(params);
  return data;
};

const apiGetListTranInterMcc = async (params) => {
  const data = await getListTranInterMcc(params);
  return data;
};

const apiExportExcelFileInterMcc = async (params) => {
  const data = await getListTranInterMcc(params);
  return data;
};

const apiGetListTranMmc = async (params) => {
  const data = await getListTranMmc(params);
  return data;
};

const apiExportExcelFileMmc = async (params) => {
  const data = await getListTranMmc(params);
  return data;
};

const apiGetListTranRefund = async (params) => {
  const data = await getListTranRefund(params);
  return data;
};

const apiExportExcelFileRefund = async (params) => {
  const data = await getListTranRefund(params);
  return data;
};

const apiGetListTranMerchant = async (params) => {
  const data = await getListTranMerchant(params);
  return data;
};

const apiExportExcelFileMerchant = async (params) => {
  const data = await getListTranMerchant(params);
  return data;
};

const apiGetListTranMerchantBranch = async (params) => {
  const data = await getListTranMerchantBranch(params);
  return data;
};

const apiExportExcelFileMerchantBranch = async (params) => {
  const data = await getListTranMerchantBranch(params);
  return data;
};

const apiGetListTranTerminal = async (params) => {
  const data = await getListTranTerminal(params);
  return data;
};

const apiExportExcelFileTerminal = async (params) => {
  const data = await getListTranTerminal(params);
  return data;
};

const apiGetDetailTranBusinessMake = async (params) => {
  const data = await getDetailTranBusiness(params);
  return data;
};

const apiExportExcelFileBusiness = async (params) => {
  const data = await getDetailTranBusiness(params);
  return data;
};

function* loadApiGetGetgetDetailTransactionMake(actions) {
  try {
    const data = yield call(apiGetgetDetailTransactionMake, actions.data);
    yield put({
      type: constants.GET_DETAIL_TRANSACTION_MAKED_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_DETAIL_TRANSACTION_MAKED_FAILED,
    });
  }
}

function* loadExportExcelFile(actions) {
  try {
    const data = yield call(apiExportExcelFile, actions.data);
    yield put({
      type: constants.EXPORT_EXCEL_FILE_REPORT_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.EXPORT_EXCEL_FILE_REPORT_FAILED,
    });
  }
}

function* loadApiGetDetailTransactionUpdate(actions) {
  try {
    const data = yield call(apiGetDetailTransactionUpdate, actions.data);
    yield put({
      type: constants.GET_DETAIL_TRANSACTION_UPDATE_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_DETAIL_TRANSACTION_UPDATE_FAILED,
    });
  }
}

function* loadExportExcelFileUpdate(actions) {
  try {
    const data = yield call(apiExportExcelFileUpdate, actions.data);
    yield put({
      type: constants.EXPORT_EXCEL_FILE_REPORT_UPDATE_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.EXPORT_EXCEL_FILE_REPORT_UPDATE_FAILED,
    });
  }
}

function* loadApiGetListTranFailed(actions) {
  try {
    const data = yield call(apiGetListTranFailed, actions.data);
    yield put({
      type: constants.GET_LIST_TRANSACTION_FAIL_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_LIST_TRANSACTION_FAIL_FAILED,
    });
  }
}


function* loadExportExcelFileError(actions) {
  try {
    const data = yield call(apiExportExcelFileError, actions.data);
    yield put({
      type: constants.EXPORT_EXCEL_FILE_REPORT_ERROR_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.EXPORT_EXCEL_FILE_REPORT_ERROR_FAILED,
    });
  }
}

function* loadApiGetListTranInterMcc(actions) {
  try {
    const data = yield call(apiGetListTranInterMcc, actions.data);
    yield put({
      type: constants.GET_LIST_TRANSACTION_INTERNATIONAL_MCC_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_LIST_TRANSACTION_INTERNATIONAL_MCC_FAILED,
    });
  }
}

function* loadExportExcelFileInterMcc(actions) {
  try {
    const data = yield call(apiExportExcelFileInterMcc, actions.data);
    yield put({
      type: constants.EXPORT_EXCEL_FILE_REPORT_INTER_MCC_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.EXPORT_EXCEL_FILE_REPORT_INTER_MCC_FAILED,
    });
  }
}

function* loadApiGetListTranMmc(actions) {
  try {
    const data = yield call(apiGetListTranMmc, actions.data);
    yield put({
      type: constants.GET_LIST_TRANSACTION_MMC_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_LIST_TRANSACTION_MMC_FAILED,
    });
  }
}

function* loadExportExcelFileMmc(actions) {
  try {
    const data = yield call(apiExportExcelFileMmc, actions.data);
    yield put({
      type: constants.EXPORT_EXCEL_FILE_REPORT_MMC_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.EXPORT_EXCEL_FILE_REPORT_MMC_FAILED,
    });
  }
}

function* loadApiGetListTranRefund(actions) {
  try {
    const data = yield call(apiGetListTranRefund, actions.data);
    yield put({
      type: constants.GET_LIST_TRANSACTION_REFUND_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_LIST_TRANSACTION_REFUND_FAILED,
    });
  }
}

function* loadExportExcelFileRefund(actions) {
  try {
    const data = yield call(apiExportExcelFileRefund, actions.data);
    yield put({
      type: constants.EXPORT_EXCEL_FILE_REPORT_REFUND_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.EXPORT_EXCEL_FILE_REPORT_REFUND_FAILED,
    });
  }
}

function* loadApiGetListTranMerchant(actions) {
  try {
    const data = yield call(apiGetListTranMerchant, actions.data);
    yield put({
      type: constants.GET_LIST_TRANSACTION_MERCHANT_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_LIST_TRANSACTION_MERCHANT_FAILED,
    });
  }
}

function* loadExportExcelFileMerchant(actions) {
  try {
    const data = yield call(apiExportExcelFileMerchant, actions.data);
    yield put({
      type: constants.EXPORT_EXCEL_FILE_REPORT_MERCHANT_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.EXPORT_EXCEL_FILE_REPORT_MERCHANT_FAILED,
    });
  }
}

function* loadApiGetListTranMerchantBranch(actions) {
  try {
    const data = yield call(apiGetListTranMerchantBranch, actions.data);
    yield put({
      type: constants.GET_LIST_TRANSACTION_MERCHANT_BRANCH_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_LIST_TRANSACTION_MERCHANT_BRANCH_FAILED,
    });
  }
}

function* loadExportExcelFileMerchantBranch(actions) {
  try {
    const data = yield call(apiExportExcelFileMerchantBranch, actions.data);
    yield put({
      type: constants.EXPORT_EXCEL_FILE_REPORT_MERCHANT_BRANCH_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.EXPORT_EXCEL_FILE_REPORT_MERCHANT_BRANCH_FAILED,
    });
  }
}

function* loadApiGetListTranTerminal(actions) {
  try {
    const data = yield call(apiGetListTranTerminal, actions.data);
    yield put({
      type: constants.GET_LIST_TRANSACTION_TERMINAL_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_LIST_TRANSACTION_TERMINAL_FAILED,
    });
  }
}

function* loadExportExcelFileTerminal(actions) {
  try {
    const data = yield call(apiExportExcelFileTerminal, actions.data);
    yield put({
      type: constants.EXPORT_EXCEL_FILE_REPORT_TERMINAL_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.EXPORT_EXCEL_FILE_REPORT_TERMINAL_FAILED,
    });
  }
}

function* loadApiGetDetailTranBusinessMake(actions) {
  try {
    const data = yield call(apiGetDetailTranBusinessMake, actions.data);
    yield put({
      type: constants.GET_DETAIL_TRAN_BUSINESS_MAKED_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_DETAIL_TRAN_BUSINESS_MAKED_FAILED,
    });
  }
}

function* loadExportExcelFileBusiness(actions) {
  try {
    const data = yield call(apiExportExcelFileBusiness, actions.data);
    yield put({
      type: constants.EXPORT_EXCEL_FILE_REPORT_BUSINESS_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.EXPORT_EXCEL_FILE_REPORT_BUSINESS_FAILED,
    });
  }
}


export default function* statisticalReportSage() {
  yield all([
    takeLatest(constants.GET_DETAIL_TRANSACTION_MAKED, loadApiGetGetgetDetailTransactionMake),
    takeLatest(constants.EXPORT_EXCEL_FILE_REPORT, loadExportExcelFile),
    takeLatest(constants.GET_LIST_TRANSACTION_FAIL, loadApiGetListTranFailed),
    takeLatest(constants.EXPORT_EXCEL_FILE_REPORT_ERROR, loadExportExcelFileError),
    takeLatest(constants.GET_LIST_TRANSACTION_INTERNATIONAL_MCC, loadApiGetListTranInterMcc),
    takeLatest(constants.EXPORT_EXCEL_FILE_REPORT_INTER_MCC, loadExportExcelFileInterMcc),
    takeLatest(constants.GET_LIST_TRANSACTION_MMC, loadApiGetListTranMmc),
    takeLatest(constants.EXPORT_EXCEL_FILE_REPORT_MMC, loadExportExcelFileMmc),
    takeLatest(constants.GET_LIST_TRANSACTION_REFUND, loadApiGetListTranRefund),
    takeLatest(constants.EXPORT_EXCEL_FILE_REPORT_REFUND, loadExportExcelFileRefund),
    takeLatest(constants.GET_LIST_TRANSACTION_MERCHANT, loadApiGetListTranMerchant),
    takeLatest(constants.EXPORT_EXCEL_FILE_REPORT_MERCHANT, loadExportExcelFileMerchant),
    takeLatest(constants.GET_LIST_TRANSACTION_MERCHANT_BRANCH, loadApiGetListTranMerchantBranch),
    takeLatest(constants.EXPORT_EXCEL_FILE_REPORT_MERCHANT_BRANCH, loadExportExcelFileMerchantBranch),
    takeLatest(constants.GET_LIST_TRANSACTION_TERMINAL, loadApiGetListTranTerminal),
    takeLatest(constants.EXPORT_EXCEL_FILE_REPORT_TERMINAL, loadExportExcelFileTerminal),
    takeLatest(constants.GET_DETAIL_TRAN_BUSINESS_MAKED, loadApiGetDetailTranBusinessMake),
    takeLatest(constants.EXPORT_EXCEL_FILE_REPORT_BUSINESS, loadExportExcelFileBusiness),
    takeLatest(constants.GET_DETAIL_TRANSACTION_UPDATE, loadApiGetDetailTransactionUpdate),
    takeLatest(constants.EXPORT_EXCEL_FILE_REPORT_UPDATE, loadExportExcelFileUpdate),
  ]);
}
