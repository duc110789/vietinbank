import * as constants from '../../constants/statisticalReport/index';

// eslint-disable-next-line import/prefer-default-export
export const getDetailTransactionSuccess = (data) => ({
  type: constants.GET_DETAIL_TRANSACTION_MAKED,
  data,
});

export const getExcelFileReport = (data) => ({
  type: constants.EXPORT_EXCEL_FILE_REPORT,
  data,
});

export const getDetailTransactionFail = (data) => ({
  type: constants.GET_LIST_TRANSACTION_FAIL,
  data,
});

export const getExcelFileReportError = (data) => ({
  type: constants.EXPORT_EXCEL_FILE_REPORT_ERROR,
  data,
});

export const getDetailTransactionInterMcc = (data) => ({
  type: constants.GET_LIST_TRANSACTION_INTERNATIONAL_MCC,
  data,
});

export const getExcelFileReportInterMcc = (data) => ({
  type: constants.EXPORT_EXCEL_FILE_REPORT_INTER_MCC,
  data,
});

export const getDetailTransactionMmc = (data) => ({
  type: constants.GET_LIST_TRANSACTION_MMC,
  data,
});

export const getExcelFileReportMmc = (data) => ({
  type: constants.EXPORT_EXCEL_FILE_REPORT_MMC,
  data,
});

export const getDetailTransactionRefund = (data) => ({
  type: constants.GET_LIST_TRANSACTION_REFUND,
  data,
});

export const getExcelFileReportRefund = (data) => ({
  type: constants.EXPORT_EXCEL_FILE_REPORT_REFUND,
  data,
});

export const getDetailTransactionMerchant = (data) => ({
  type: constants.GET_LIST_TRANSACTION_MERCHANT,
  data,
});

export const getExcelFileReportMerchant = (data) => ({
  type: constants.EXPORT_EXCEL_FILE_REPORT_MERCHANT,
  data,
});

export const getDetailTransactionMerchantBranch = (data) => ({
  type: constants.GET_LIST_TRANSACTION_MERCHANT_BRANCH,
  data,
});

export const getExcelFileReportMerchantBranch = (data) => ({
  type: constants.EXPORT_EXCEL_FILE_REPORT_MERCHANT_BRANCH,
  data,
});

export const getDetailTransactionTerminal = (data) => ({
  type: constants.GET_LIST_TRANSACTION_TERMINAL,
  data,
});

export const getExcelFileReportTermianl = (data) => ({
  type: constants.EXPORT_EXCEL_FILE_REPORT_TERMINAL,
  data,
});

export const getDetailTranBusinessSuccess = (data) => ({
  type: constants.GET_DETAIL_TRAN_BUSINESS_MAKED,
  data,
});

export const getExcelFileReportBusiness = (data) => ({
  type: constants.EXPORT_EXCEL_FILE_REPORT_BUSINESS,
  data,
});

export const getDetailTransactionUpdate = (data) => ({
  type: constants.GET_DETAIL_TRANSACTION_UPDATE,
  data,
});

export const getExcelFileReportUpdate = (data) => ({
  type: constants.EXPORT_EXCEL_FILE_REPORT_UPDATE,
  data,
});
