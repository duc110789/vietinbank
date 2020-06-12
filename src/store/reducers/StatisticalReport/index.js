import * as constants from '../../constants/statisticalReport/index';

const initState = {
  responseServer: {},
  listDetailTransactionMake: {},
  listTransactionFail: {},
  listTransactionInterMcc: {},
  listTransactionMmc: {},
  listTransactionRefund: {},
  listTransactionMerchant: {},
  listTransactionMerchantBranch: {},
  listTransactionTerminal: {},
  listDetailTranBusinessMake: {},
  changePageSearchReport: 0,
  changePageSearchReportMcc: 0,
  changePageSearchReportMmc: 0,
  changePageSearchReportRefund: 0,
  changePageSearchReportMerchant: 0,
  changePageSearchReportMerchantBranch: 0,
  changePageSearchReportTerminal: 0,
  changePageSearchReportBusiness: 0,
  changePageSearchReportUpdate: 0,
  dataSearchReport: {},
  dataSearchReportMcc: {},
  dataSearchReportMmc: {},
  dataSearchReportRefund: {},
  dataSearchReportMerchant: {},
  dataSearchReportMerchantBranch: {},
  dataSearchReportTerminal: {},
  dataSearchReportBusiness: {},
  dataSearchReportUpdate: {},
  exportReportFile: {},
  exportReportFileInterMcc: {},
  exportReportFileError: {},
  exportReportFileMerchant: {},
  exportReportFileMerchantBranch: {},
  exportReportFileTerminal: {},
  exportReportFileBusiness: {},
  exportReportFileRefund: {},
  exportReportFileUpdate: {},
};

function statisticalReportReducer(state = initState, action) {
  switch (action.type) {
    case constants.GET_DETAIL_TRANSACTION_MAKED:
      return { ...state };
    case constants.GET_DETAIL_TRANSACTION_MAKED_SUCCESS:
      state.listDetailTransactionMake = action.data.data;
      return { ...state };
    case constants.GET_DETAIL_TRANSACTION_MAKED_FAILED:
      return { ...state };

    case constants.GET_DETAIL_TRANSACTION_UPDATE:
      if (action.data.fromRow === 0) {
        state.changePageSearchReportUpdate = 1;
      } else {
        state.changePageSearchReportUpdate = 0;
      }
      state.dataSearchReportUpdate = action.data;
      return { ...state };
    case constants.GET_DETAIL_TRANSACTION_UPDATE_SUCCESS:
      state.listDetailTransactionUpdate = action.data.data;
      return { ...state };
    case constants.GET_DETAIL_TRANSACTION_UPDATE_FAILED:
      return { ...state };

    case constants.GET_LIST_TRANSACTION_FAIL:
      if (action.data.fromRow === 0) {
        state.changePageSearchReport = 1;
      } else {
        state.changePageSearchReport = 0;
      }
      state.dataSearchReport = action.data;
      return { ...state };
    case constants.GET_LIST_TRANSACTION_FAIL_SUCCESS:
      state.listTransactionFail = action.data.data;
      return { ...state };
    case constants.GET_LIST_TRANSACTION_FAIL_FAILED:
      return { ...state };

    case constants.EXPORT_EXCEL_FILE_REPORT:
      return { ...state };
    case constants.EXPORT_EXCEL_FILE_REPORT_SUCCESS:
      return { ...state, exportReportFile: action.data.data };
    case constants.EXPORT_EXCEL_FILE_REPORT_FAILED:
      return { ...state };

    case constants.EXPORT_EXCEL_FILE_REPORT_UPDATE:
      return { ...state };
    case constants.EXPORT_EXCEL_FILE_REPORT_UPDATE_SUCCESS:
      return { ...state, exportReportFileUpdate: action.data.data };
    case constants.EXPORT_EXCEL_FILE_REPORT_UPDATE_FAILED:
      return { ...state };

    case constants.EXPORT_EXCEL_FILE_REPORT_ERROR:
      return { ...state };
    case constants.EXPORT_EXCEL_FILE_REPORT_ERROR_SUCCESS:
      return { ...state, exportReportFileError: action.data.data };
    case constants.EXPORT_EXCEL_FILE_REPORT_ERROR_FAILED:
      return { ...state };

    case constants.GET_LIST_TRANSACTION_INTERNATIONAL_MCC:
      if (action.data.fromRow === 0) {
        state.changePageSearchReportMcc = 1;
      } else {
        state.changePageSearchReportMcc = 0;
      }
      state.dataSearchReportMcc = action.data;
      return { ...state };
    case constants.GET_LIST_TRANSACTION_INTERNATIONAL_MCC_SUCCESS:
      state.listTransactionInterMcc = action.data.data;
      return { ...state };
    case constants.GET_LIST_TRANSACTION_INTERNATIONAL_MCC_FAILED:
      return { ...state };

    case constants.EXPORT_EXCEL_FILE_REPORT_INTER_MCC:
      return { ...state };
    case constants.EXPORT_EXCEL_FILE_REPORT_INTER_MCC_SUCCESS:
      return { ...state, exportReportFileInterMcc: action.data.data };
    case constants.EXPORT_EXCEL_FILE_REPORT_INTER_MCC_FAILED:
      return { ...state };

    case constants.GET_LIST_TRANSACTION_MMC:
      if (action.data.fromRow === 0) {
        state.changePageSearchReportMmc = 1;
      } else {
        state.changePageSearchReportMmc = 0;
      }
      state.dataSearchReportMmc = action.data;
      return { ...state };
    case constants.GET_LIST_TRANSACTION_MMC_SUCCESS:
      state.listTransactionMmc = action.data.data;
      return { ...state };
    case constants.GET_LIST_TRANSACTION_MMC_FAILED:
      return { ...state };

    case constants.EXPORT_EXCEL_FILE_REPORT_MMC:
      return { ...state };
    case constants.EXPORT_EXCEL_FILE_REPORT_MMC_SUCCESS:
      return { ...state, exportReportFileMmc: action.data.data };
    case constants.EXPORT_EXCEL_FILE_REPORT_MMC_FAILED:
      return { ...state };

    case constants.GET_LIST_TRANSACTION_REFUND:
      if (action.data.fromRow === 0) {
        state.changePageSearchReportRefund = 1;
      } else {
        state.changePageSearchReportRefund = 0;
      }
      state.dataSearchReportRefund = action.data;
      return { ...state };
    case constants.GET_LIST_TRANSACTION_REFUND_SUCCESS:
      state.listTransactionRefund = action.data.data;
      return { ...state };
    case constants.GET_LIST_TRANSACTION_REFUND_FAILED:
      return { ...state };

    case constants.EXPORT_EXCEL_FILE_REPORT_REFUND:
      return { ...state };
    case constants.EXPORT_EXCEL_FILE_REPORT_REFUND_SUCCESS:
      return { ...state, exportReportFileRefund: action.data.data };
    case constants.EXPORT_EXCEL_FILE_REPORT_REFUND_FAILED:
      return { ...state };

    case constants.GET_LIST_TRANSACTION_MERCHANT:
      if (action.data.fromRow === 0) {
        state.changePageSearchReportMerchant = 1;
      } else {
        state.changePageSearchReportMerchant = 0;
      }
      state.dataSearchReportMerchant = action.data;
      return { ...state };
    case constants.GET_LIST_TRANSACTION_MERCHANT_SUCCESS:
      state.listTransactionMerchant = action.data.data;
      return { ...state };
    case constants.GET_LIST_TRANSACTION_MERCHANT_FAILED:
      return { ...state };

    case constants.EXPORT_EXCEL_FILE_REPORT_MERCHANT:
      return { ...state };
    case constants.EXPORT_EXCEL_FILE_REPORT_MERCHANT_SUCCESS:
      return { ...state, exportReportFileMerchant: action.data.data };
    case constants.EXPORT_EXCEL_FILE_REPORT_MERCHANT_FAILED:
      return { ...state };

    case constants.GET_LIST_TRANSACTION_MERCHANT_BRANCH:
      if (action.data.fromRow === 0) {
        state.changePageSearchReportMerchantBranch = 1;
      } else {
        state.changePageSearchReportMerchantBranch = 0;
      }
      state.dataSearchReportMerchantBranch = action.data;
      return { ...state };
    case constants.GET_LIST_TRANSACTION_MERCHANT_BRANCH_SUCCESS:
      state.listTransactionMerchantBranch = action.data.data;
      return { ...state };
    case constants.GET_LIST_TRANSACTION_MERCHANT_BRANCH_FAILED:
      return { ...state };

    case constants.EXPORT_EXCEL_FILE_REPORT_MERCHANT_BRANCH:
      return { ...state };
    case constants.EXPORT_EXCEL_FILE_REPORT_MERCHANT_BRANCH_SUCCESS:
      return { ...state, exportReportFileMerchantBranch: action.data.data };
    case constants.EXPORT_EXCEL_FILE_REPORT_MERCHANT_BRANCH_FAILED:
      return { ...state };

    case constants.GET_LIST_TRANSACTION_TERMINAL:
      if (action.data.fromRow === 0) {
        state.changePageSearchReportTerminal = 1;
      } else {
        state.changePageSearchReportTerminal = 0;
      }
      state.dataSearchReportTerminal = action.data;
      return { ...state };
    case constants.GET_LIST_TRANSACTION_TERMINAL_SUCCESS:
      state.listTransactionTerminal = action.data.data;
      return { ...state };
    case constants.GET_LIST_TRANSACTION_TERMINAL_FAILED:
      return { ...state };

    case constants.EXPORT_EXCEL_FILE_REPORT_TERMINAL:
      return { ...state };
    case constants.EXPORT_EXCEL_FILE_REPORT_TERMINAL_SUCCESS:
      return { ...state, exportReportFileTerminal: action.data.data };
    case constants.EXPORT_EXCEL_FILE_REPORT_TERMINAL_FAILED:
      return { ...state };

    case constants.GET_DETAIL_TRAN_BUSINESS_MAKED:
      if (action.data.fromRow === 0) {
        state.changePageSearchReportBusiness = 1;
      } else {
        state.changePageSearchReportBusiness = 0;
      }
      state.dataSearchReportBusiness = action.data;
      return { ...state };
    case constants.GET_DETAIL_TRAN_BUSINESS_MAKED_SUCCESS:
      state.listDetailTranBusinessMake = action.data.data;
      return { ...state };
    case constants.GET_DETAIL_TRAN_BUSINESS_MAKED_FAILED:
      return { ...state };

    case constants.EXPORT_EXCEL_FILE_REPORT_BUSINESS:
      return { ...state };
    case constants.EXPORT_EXCEL_FILE_REPORT_BUSINESS_SUCCESS:
      return { ...state, exportReportFileBusiness: action.data.data };
    case constants.EXPORT_EXCEL_FILE_REPORT_BUSINESS_FAILED:
      return { ...state };

    default:
      return { ...state };
  }
}

export default statisticalReportReducer;
