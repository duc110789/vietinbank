import * as constants from '../../constants/terminal/terminalConstant';

export const addTerminal = (data) => ({
  type: constants.ADD_TERMINAL,
  data,
});

export const editTerminal = (data) => ({
  type: constants.EDIT_TERMINAL,
  data,
});

export const getCacheTerminal = (data) => ({
  type: constants.GET_CACHE_TERMINAL,
  data,
});

export const getMerchantBranch = (data) => ({
  type: constants.GET_MERCHANT_BRANCH,
  data,
});

export const getTerminalPlace = (data) => ({
  type: constants.GET_TERMINAL_PLACE,
  data,
});

export const getTerminalDetail = (data) => ({
  type: constants.GET_TERMINAL_DETAIL,
  data,
});

export const getTerminalList = (data) => ({
  type: constants.GET_TERMINAL_LIST,
  data,
});

export const getTerminalListDenied = (data) => ({
  type: constants.GET_TERMINAL_LIST_DENIED,
  data,
});

export const setLevelTerminal = (data) => ({
  type: constants.SET_LEVEL_TERMINAL,
  data,
});

export const getTerminalDetailDenied = (data) => ({
  type: constants.GET_TERMINAL_DETAIL_DENIED,
  data,
});

export const approvedTerminal = (data) => ({
  type: constants.APPROVED_TERMINAL,
  data,
});

export const deniedTerminal = (data) => ({
  type: constants.DENIED_TERMINAL,
  data,
});

export const onClickOpenLockModal = (data) => ({
  type: constants.CLICK_OPEN_LOCK_MODAL,
  data,
});

export const onCLickOpenUnLockModal = (data) => ({
  type: constants.CLICK_OPEN_UN_LOCK_MODAL,
  data,
});

export const onClickCloseLockModal = () => ({
  type: constants.CLICK_CLOSE_LOCK_MODAL,
});

export const onClickCloseUnLockModal = () => ({
  type: constants.CLICK_CLOSE_UN_LOCK_MODAL,
});

export const lockOrUnlockTerminal = (data) => ({
  type: constants.LOCK_UNLOCK_TERMINAL,
  data,
});

export const getTerminalCodeName = (data) => ({
  type: constants.GET_TERMINAL_CODE_NAME,
  data,
});

export const getExcelFileTerminal = (data) => ({
  type: constants.EXPORT_EXCEL_FILE_TERMINAL,
  data,
});
