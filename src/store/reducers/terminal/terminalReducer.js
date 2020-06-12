import * as constants from '../../constants/terminal/terminalConstant';

const initState = {
  responseServer: {},
  responseServerApproved: {},
  cacheTerminal: [],
  terminalDetail: {},
  merchantApproved: {},
  listTerminalCodeName: {},
  listTerminalDetail: {},
  changePageSearchTerminal: 0,
  listTerminalTable: {},
  dataSearchTerminal: {},
  isOpenLockModal: false,
  isOpenUnLockModal: false,
  reloadLockOrUnlockMerchantSearch: 0,
  merchantCode: null,
  isLockSuccess: null,
  listMerchantBranch: {},
  listTerminalPlace: [],
  listTerminalTableDenied: {},
  levelTerminal: 1,
  terminalDetailDenied: {},
  exportTerminalFile: {},
};

function terminalReducer(state = initState, action) {
  switch (action.type) {
    case constants.ADD_TERMINAL:
      return { ...state };
    case constants.ADD_TERMINAL_SUCCESS:
      state.responseServer = action.data;
      return { ...state };
    case constants.ADD_TERMINAL_FAILED:
      return { ...state };

    case constants.EDIT_TERMINAL:
      return { ...state };
    case constants.EDIT_TERMINAL_SUCCESS:
      state.responseServerEditTerminal = action.data;
      state.terminalDetail = {};
      return { ...state };
    case constants.EDIT_TERMINAL_FAILED:
      return { ...state };

    case constants.GET_TERMINAL_LIST:
      if (action.data.fromRow === 0) {
        state.changePageSearchTerminal = 1;
      } else {
        state.changePageSearchTerminal = 0;
      }
      state.terminalDetail = {};
      state.dataSearchTerminal = action.data;
      return { ...state };

    case constants.GET_TERMINAL_LIST_SUCCESS:
      return {
        ...state,
        listTerminalTable: action.data.data,
      };
    case constants.GET_TERMINAL_LIST_FAILED:
      return { ...state };

    case constants.GET_MERCHANT_BRANCH:
      return { ...state };
    case constants.GET_MERCHANT_BRANCH_SUCCESS:
      return {
        ...state,
        listMerchantBranch: action.data.data.listData,
      };
    case constants.GET_MERCHANT_BRANCH_FAILED:
      return { ...state };

    case constants.GET_TERMINAL_PLACE:
      return { ...state };
    case constants.GET_TERMINAL_PLACE_SUCCESS:
      return {
        ...state,
        listTerminalPlace: action.data.data.listData,
      };
    case constants.GET_TERMINAL_PLACE_FAILED:
      return { ...state };

    case constants.GET_CACHE_TERMINAL:
      return { ...state };
    case constants.GET_CACHE_TERMINAL_SUCCESS:
      state.cacheTerminal = action.data.data.listData;
      return { ...state };
    case constants.GET_CACHE_TERMINAL_FAILED:
      return { ...state };

    case constants.GET_TERMINAL_DETAIL:
      return { ...state };
    case constants.GET_TERMINAL_DETAIL_SUCCESS:
      return {
        ...state,
        terminalDetail: action.data.data,
      };
    case constants.GET_TERMINAL_DETAIL_FAILED:
      return { ...state };

    case constants.GET_TERMINAL_LIST_DENIED:
      if (action.data.fromRow === 0) {
        state.changePageSearchTerminal = 1;
      } else {
        state.changePageSearchTerminal = 0;
      }
      state.dataSearchTerminal = action.data;
      state.terminalDetail = {};
      return { ...state };
    case constants.GET_TERMINAL_LIST_DENIED_SUCCESS:
      return {
        ...state,
        listTerminalTableDenied: action.data.data,
      };
    case constants.GET_TERMINAL_LIST_DENIED_FAILED:
      return { ...state };

    case constants.SET_LEVEL_TERMINAL:
      state.levelTerminal = action.data;
      return { ...state };

    case constants.GET_TERMINAL_DETAIL_DENIED:
      return { ...state };
    case constants.GET_TERMINAL_DETAIL_DENIED_SUCCESS:
      return {
        ...state,
        terminalDetailDenied: action.data.data,
      };
    case constants.GET_TERMINAL_DETAIL_DENIED_FAILED:
      return { ...state };

    case constants.APPROVED_TERMINAL:
      return { ...state };
    case constants.APPROVED_TERMINAL_SUCCESS:
      state.responseServerApproved = action.data;
      return { ...state };
    case constants.APPROVED_TERMINAL_FAILED:
      return { ...state };

    case constants.DENIED_TERMINAL:
      return { ...state };
    case constants.DENIED_TERMINAL_SUCCESS:
      state.responseServer = action.data;
      return { ...state };
    case constants.DENIED_TERMINAL_FAILED:
      return { ...state };

    case constants.CLICK_OPEN_LOCK_MODAL:
      return { ...state, isOpenLockModal: true, merchantCode: action.data };

    case constants.CLICK_CLOSE_LOCK_MODAL:
      return { ...state, isOpenLockModal: false };

    case constants.CLICK_OPEN_UN_LOCK_MODAL:
      return { ...state, isOpenUnLockModal: true, merchantCode: action.data };

    case constants.CLICK_CLOSE_UN_LOCK_MODAL:
      return { ...state, isOpenUnLockModal: false };

    case constants.LOCK_UNLOCK_TERMINAL:
      return { ...state };

    case constants.LOCK_UNLOCK_TERMINAL_SUCCESS:
      if (action.data.code === '00') {
        return {
          ...state, isLockSuccess: action.data, isOpenLockModal: false, isOpenUnLockModal: false,
        };
      }
      return { ...state };

    case constants.GET_TERMINAL_CODE_NAME:
      return { ...state };
    case constants.GET_TERMINAL_CODE_NAME_SUCCESS:
      return {
        ...state,
        listTerminalCodeName: action.data.data.listData,
      };
    case constants.GET_TERMINAL_CODE_NAME_FAILED:
      return { ...state };

    case constants.LOCK_UNLOCK_TERMINAL_FAILED:
      return { ...state };

    case constants.EXPORT_EXCEL_FILE_TERMINAL:
      return { ...state };
    case constants.EXPORT_EXCEL_FILE_TERMINAL_SUCCESS:
      return { ...state, exportTerminalFile: action.data.data };
    case constants.EXPORT_EXCEL_FILE_TERMINAL_FAILED:
      return { ...state };

    default:
      return { ...state };
  }
}

export default terminalReducer;
