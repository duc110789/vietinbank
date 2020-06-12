import * as constants from '../../constants/masterMerchant/masterMerchantConstant';

const initState = {
  responseServer: {},
  merchantDetail: {},
  responseServerMerchantDetail: {},
  merchantApproved: {},
  listMerchantCodeName: [],
  listTerminalDetail: {},
  changePageSearchMerchant: 0,
  listMerchantTable: {},
  dataSearchMerchant: {},
  isOpenLockModal: false,
  isOpenUnLockModal: false,
  reloadLockOrUnlockMerchantSearch: 0,
  merchantCode: null,
  isLockSuccess: null,
  listMerchantDenied: {},
  merchantDetailDenied: {},
};

function masterMerchantReducer(state = initState, action) {
  switch (action.type) {
    case constants.ADD_MASTER_MERCHANT:
      return { ...state };
    case constants.ADD_MASTER_MERCHANT_SUCCESS:
      state.responseServer = action.data;
      return { ...state };
    case constants.ADD_MASTER_MERCHANT_FAILED:
      return { ...state };

    case constants.UPDATE_MERCHANT:
      return { ...state };
    case constants.UPDATE_MERCHANT_SUCCESS:
      state.responseServer = action.data;
      return { ...state };
    case constants.UPDATE_MERCHANT_FAILED:
      return { ...state };

    case constants.DENIED_MERCHANT:
      return { ...state };
    case constants.DENIED_MERCHANT_SUCCESS:
      state.responseServer = action.data;
      return { ...state };
    case constants.DENIED_MERCHANT_FAILED:
      return { ...state };

    case constants.APPROVED_MERCHANT:
      return { ...state };
    case constants.APPROVED_MERCHANT_SUCCESS:
      state.responseServer = action.data;
      return { ...state };
    case constants.APPROVED_MERCHANT_FAILED:
      return { ...state };

    case constants.GET_MERCHANT_DETAIL:
      return { ...state };
    case constants.GET_MERCHANT_DETAIL_SUCCESS:
      return {
        ...state,
        responseServerMerchantDetail: action.data,
        merchantDetail: action.data.data,
      };
    case constants.GET_MERCHANT_DETAIL_FAILED:
      return { ...state };

    case constants.GET_MERCHANT_CODE_NAME:
      return { ...state };
    case constants.GET_MERCHANT_CODE_NAME_SUCCESS:
      return {
        ...state,
        listMerchantCodeName: action.data.data.listData,
      };
    case constants.GET_MERCHANT_CODE_NAME_FAILED:
      return { ...state };

    case constants.GET_LIST_TERMINAL_DETAIL:
      return { ...state };
    case constants.GET_LIST_TERMINAL_DETAIL_SUCCESS:
      return {
        ...state,
        listTerminalDetail: action.data.data,
      };
    case constants.GET_LIST_TERMINAL_DETAIL_FAILED:
      return { ...state };

    case constants.GET_MERCHANT_DETAIL_DENIED:
      return { ...state };
    case constants.GET_MERCHANT_DETAIL_DENIED_SUCCESS:
      return {
        ...state,
        merchantDetailDenied: action.data.data,
      };
    case constants.GET_MERCHANT_DETAIL_DENIED_FAILED:
      return { ...state };

    case constants.GET_MERCHANT_LIST:
      if (action.data.fromRow === 0) {
        state.changePageSearchMerchant = 1;
      } else {
        state.changePageSearchMerchant = 0;
      }
      state.dataSearchMerchant = action.data;
      return { ...state };
    case constants.GET_MERCHANT_LIST_SUCCESS:
      return {
        ...state,
        listMerchantTable: action.data.data,
      };
    case constants.GET_MERCHANT_LIST_FAILED:
      return { ...state };

    case constants.GET_MERCHANT_LIST_DENIED:
      if (action.data.fromRow === 0) {
        state.changePageSearchMerchant = 1;
      } else {
        state.changePageSearchMerchant = 0;
      }
      state.dataSearchMerchant = action.data;
      return { ...state };
    case constants.GET_MERCHANT_LIST_DENIED_SUCCESS:
      return {
        ...state,
        listMerchantDenied: action.data.data,
      };
    case constants.GET_MERCHANT_LIST_DENIED_FAILED:
      return { ...state };

    case constants.GET_MERCHANT_INFO:
      return { ...state };
    case constants.GET_MERCHANT_INFO_SUCCESS:
      return {
        ...state,
        merchantApproved: action.data.data,
      };
    case constants.GET_MERCHANT_INFO_FAILED:
      return { ...state };

    case constants.CLICK_OPEN_LOCK_MODAL:
      return { ...state, isOpenLockModal: true, merchantCode: action.data };

    case constants.CLICK_CLOSE_LOCK_MODAL:
      return { ...state, isOpenLockModal: false };

    case constants.CLICK_OPEN_UN_LOCK_MODAL:
      return { ...state, isOpenUnLockModal: true, merchantCode: action.data };

    case constants.CLICK_CLOSE_UN_LOCK_MODAL:
      return { ...state, isOpenUnLockModal: false };

    case constants.LOCK_UNLOCK_MERCHANT:
      return { ...state };

    case constants.LOCK_UNLOCK_MERCHANT_SUCCESS:
      if (action.data.code === '00') {
        return {
          ...state, isLockSuccess: action.data, isOpenLockModal: false, isOpenUnLockModal: false,
        };
      }
      return {
        ...state, isLockSuccess: action.data,
      };

    case constants.LOCK_UNLOCK_MERCHANT_FAILED:
      return { ...state };

    case constants.EXPORT_EXCEL_FILE:
      return { ...state };
    case constants.EXPORT_EXCEL_FILE_SUCCESS:
      return { ...state, exportMerchantFile: action.data.data };
    case constants.EXPORT_EXCEL_FILE_FAILED:
      return { ...state };

    case constants.CLEAR_MERCHANT_DETAIL:
      state.merchantDetail = {};
      return { ...state };

    case constants.CLEAR_MERCHANT_CODE_NAME:
      return { ...state, listMerchantCodeName: [] };
    default:
      return { ...state };
  }
}

export default masterMerchantReducer;
