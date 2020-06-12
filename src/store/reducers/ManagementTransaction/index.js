import * as constants from '../../constants/ManagementTransaction/index';

const initState = {
  responseServer: {},
  listTransactionTable: {},
  changePageSearchTransaction: 0,
  dataSearchTransaction: {},
  exportReportFileTran: {},
  listTransactionTableRefund: {},
  changePageSearchTransactionRefund: 0,
  dataSearchTransactionRefund: {},
  exportReportFileTranRefund: {},
  transactionDetail: null,
  transactionDetailRefund: null,
  responseServerUpdateTransaction: {},
  responseServerUpdateTransactionRefund: {},
  response: {},
};

function TransactionListReducer(state = initState, action) {
  switch (action.type) {
    case constants.GET_TRANSACTION_LIST:
      if (action.data.fromRow === 0) {
        state.changePageSearchTransaction = 1;
      } else {
        state.changePageSearchTransaction = 0;
      }
      state.dataSearchTransaction = action.data;
      return { ...state, transactionDetail: null };
    case constants.GET_TRANSACTION_LIST_SUCCESS:
      state.listTransactionTable = action.data.data;
      return { ...state };
    case constants.GET_TRANSACTION_LIST_FAILED:
      return { ...state };

    case constants.EXPORT_EXCEL_FILE_REPORT_TRAN:
      return { ...state };
    case constants.EXPORT_EXCEL_FILE_REPORT_TRAN_SUCCESS:
      return { ...state, exportReportFileTran: action.data.data.data };
    case constants.EXPORT_EXCEL_FILE_REPORT_TRAN_FAILED:
      return { ...state };

    case constants.CREATE_TRANSACTION_REFUND:
      return { ...state };
    case constants.CREATE_TRANSACTION_REFUND_SUCCESS:
      return { ...state, responseServer: action.data };
    case constants.CREATE_TRANSACTION_REFUND_FAILED:
      return { ...state };

    case constants.UPDATE_TRANSACTION_STATUS:
      return { ...state };
    case constants.UPDATE_TRANSACTION_STATUS_SUCCESS:
      return { ...state, responseServerUpdateTransaction: action.data };
    case constants.UPDATE_TRANSACTION_STATUS_FAILED:
      return { ...state };

    case constants.UPDATE_TRANSACTION_REFUND_STATUS:
      return { ...state };
    case constants.UPDATE_TRANSACTION_REFUND_STATUS_SUCCESS:
      return { ...state, responseServerUpdateTransactionRefund: action.data };
    case constants.UPDATE_TRANSACTION_REFUND_STATUS_FAILED:
      return { ...state };

    case constants.GET_TRANSACTION_DETAIL:
      return { ...state };
    case constants.GET_TRANSACTION_DETAIL_SUCCESS:
      return { ...state, transactionDetail: action.data.data, response: action.data };
    case constants.GET_TRANSACTION_DETAIL_FAILED:
      return { ...state };

    case constants.GET_TRANSACTION_LIST_REFUND:
      if (action.data.fromRow === 0) {
        state.changePageSearchTransactionRefund = 1;
      } else {
        state.changePageSearchTransactionRefund = 0;
      }
      state.dataSearchTransactionRefund = action.data;
      return { ...state, transactionDetail: null };
    case constants.GET_TRANSACTION_LIST_REFUND_SUCCESS:
      state.listTransactionTableRefund = action.data.data;
      return { ...state };
    case constants.GET_TRANSACTION_LIST_REFUND_FAILED:
      return { ...state };

    case constants.EXPORT_EXCEL_FILE_REPORT_TRAN_REFUND:
      return { ...state };
    case constants.EXPORT_EXCEL_FILE_REPORT_TRAN_REFUND_SUCCESS:
      return { ...state, exportReportFileTranRefund: action.data.data };
    case constants.EXPORT_EXCEL_FILE_REPORT_TRAN_REFUND_FAILED:
      return { ...state };

    case constants.GET_TRANSACTION_DETAIL_REFUND:
      return { ...state };
    case constants.GET_TRANSACTION_DETAIL_REFUND_SUCCESS:
      return { ...state, transactionDetailRefund: action.data.data };
    case constants.GET_TRANSACTION_DETAIL_REFUND_FAILED:
      return { ...state };

    default:
      return { ...state };
  }
}

export default TransactionListReducer;
