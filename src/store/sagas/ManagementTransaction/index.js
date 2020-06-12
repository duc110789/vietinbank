import {all, call, put, takeLatest,} from 'redux-saga/effects';

import * as constants from '../../constants/ManagementTransaction/index';
import {
  createTransactionRefund,
  getTransactionDetail,
  getTransactionDetailRefund,
  getTransactionList,
  getTransactionListRefund,
  updateTransactionStatusPayment,
  updateTransactionStatusRefund,
} from '../../../apis/managementTransaction/index';

const apiGetTransactionList = async (params) => {
  const data = await getTransactionList(params);
  return data;
};

const apiExportExcelFileTran = async (params) => {
  const data = await getTransactionList(params);
  return data;
};

const apiGetTransactionDetail = async (params) => {
  const data = await getTransactionDetail(params);
  return data;
};

const apiGetTransactionListRefund = async (params) => {
  const data = await getTransactionListRefund(params);
  return data;
};

const apiExportExcelFileTranRefund = async (params) => {
  const data = await getTransactionListRefund(params);
  return data;
};

const apiGetTransactionDetailRefund = async (params) => {
  const data = await getTransactionDetailRefund(params);
  return data;
};

const apiCreateTransactionRefund = async (params) => {
  const data = await createTransactionRefund(params);
  return data;
};

const apiUpdateTransactionStatusPayment = async (params) => {
  const data = await updateTransactionStatusPayment(params);
  return data;
};

const apiUpdateTransactionStatusRefund = async (params) => {
  const data = await updateTransactionStatusRefund(params);
  return data;
};

function* loadApiGetTransactionList(actions) {
  try {
    const data = yield call(apiGetTransactionList, actions.data);
    yield put({
      type: constants.GET_TRANSACTION_LIST_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_TRANSACTION_LIST_FAILED,
    });
  }
}

function* loadExportExcelFileTran(actions) {
  try {
    const data = yield call(apiExportExcelFileTran, actions.data);
    yield put({
      type: constants.EXPORT_EXCEL_FILE_REPORT_TRAN_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.EXPORT_EXCEL_FILE_REPORT_TRAN_FAILED,
    });
  }
}

function* loadApiGetTransactionDetail(actions) {
  try {
    const data = yield call(apiGetTransactionDetail, actions.data);
    yield put({
      type: constants.GET_TRANSACTION_DETAIL_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_TRANSACTION_DETAIL_FAILED,
    });
  }
}

function* loadApiGetTransactionListRefund(actions) {
  try {
    const data = yield call(apiGetTransactionListRefund, actions.data);
    yield put({
      type: constants.GET_TRANSACTION_LIST_REFUND_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_TRANSACTION_LIST_REFUND_FAILED,
    });
  }
}

function* loadExportExcelFileTranRefund(actions) {
  try {
    const data = yield call(apiExportExcelFileTranRefund, actions.data);
    yield put({
      type: constants.EXPORT_EXCEL_FILE_REPORT_TRAN_REFUND_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.EXPORT_EXCEL_FILE_REPORT_TRAN_REFUND_FAILED,
    });
  }
}

function* loadApiGetTransactionDetailRefund(actions) {
  try {
    const data = yield call(apiGetTransactionDetailRefund, actions.data);
    yield put({
      type: constants.GET_TRANSACTION_DETAIL_REFUND_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.GET_TRANSACTION_DETAIL_REFUND_FAILED,
    });
  }
}

function* loadApiCreateTransactionRefund(actions) {
  try {
    const data = yield call(apiCreateTransactionRefund, actions.data);
    yield put({
      type: constants.CREATE_TRANSACTION_REFUND_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.CREATE_TRANSACTION_REFUND_FAILED,
    });
  }
}

function* loadApiUpdateTransactionStatusPayment(actions) {
  try {
    const data = yield call(apiUpdateTransactionStatusPayment, actions.data);
    yield put({
      type: constants.UPDATE_TRANSACTION_STATUS_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.UPDATE_TRANSACTION_STATUS_FAILED,
    });
  }
}

function* loadApiUpdateTransactionStatusRefund(actions) {
  try {
    const data = yield call(apiUpdateTransactionStatusRefund, actions.data);
    yield put({
      type: constants.UPDATE_TRANSACTION_REFUND_STATUS_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: constants.UPDATE_TRANSACTION_REFUND_STATUS_FAILED,
    });
  }
}

export default function* statisticalReportSage() {
  yield all([
    takeLatest(constants.GET_TRANSACTION_LIST, loadApiGetTransactionList),
    takeLatest(constants.EXPORT_EXCEL_FILE_REPORT_TRAN, loadExportExcelFileTran),
    takeLatest(constants.GET_TRANSACTION_DETAIL, loadApiGetTransactionDetail),
    takeLatest(constants.GET_TRANSACTION_LIST_REFUND, loadApiGetTransactionListRefund),
    takeLatest(constants.EXPORT_EXCEL_FILE_REPORT_TRAN_REFUND, loadExportExcelFileTranRefund),
    takeLatest(constants.GET_TRANSACTION_DETAIL_REFUND, loadApiGetTransactionDetailRefund),
    takeLatest(constants.CREATE_TRANSACTION_REFUND, loadApiCreateTransactionRefund),
    takeLatest(constants.UPDATE_TRANSACTION_STATUS, loadApiUpdateTransactionStatusPayment),
    takeLatest(constants.UPDATE_TRANSACTION_REFUND_STATUS, loadApiUpdateTransactionStatusRefund),
  ]);
}
