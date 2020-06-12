import * as constants from '../../constants/ManagementTransaction/index';

// eslint-disable-next-line import/prefer-default-export
export const getTransactionList = (data) => ({
  type: constants.GET_TRANSACTION_LIST,
  data,
});

export const getExcelFileReportTran = (data) => ({
  type: constants.EXPORT_EXCEL_FILE_REPORT_TRAN,
  data,
});

export const getTransactionDetail = (data) => ({
  type: constants.GET_TRANSACTION_DETAIL,
  data,
});

export const getTransactionDetailRefund = (data) => ({
  type: constants.GET_TRANSACTION_DETAIL_REFUND,
  data,
});

export const getTransactionListRefund = (data) => ({
  type: constants.GET_TRANSACTION_LIST_REFUND,
  data,
});

export const getExcelFileReportTranRefund = (data) => ({
  type: constants.EXPORT_EXCEL_FILE_REPORT_TRAN_REFUND,
  data,
});

export const createTransactionRefund = (data) => ({
  type: constants.CREATE_TRANSACTION_REFUND,
  data,
});

export const updateTransactionStatusPayment = (data) => ({
  type: constants.UPDATE_TRANSACTION_STATUS,
  data,
});

export const updateTransactionStatusRefund = (data) => ({
  type: constants.UPDATE_TRANSACTION_REFUND_STATUS,
  data,
});
