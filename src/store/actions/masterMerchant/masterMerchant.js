import * as constants from '../../constants/masterMerchant/masterMerchantConstant';

export const addMasterMerchant = (data) => ({
  type: constants.ADD_MASTER_MERCHANT,
  data,
});

export const getMerchantDetail = (data) => ({
  type: constants.GET_MERCHANT_DETAIL,
  data,
});

export const getMerchantCodeName = (data) => ({
  type: constants.GET_MERCHANT_CODE_NAME,
  data,
});

export const getListTerminalDetail = (data) => ({
  type: constants.GET_LIST_TERMINAL_DETAIL,
  data,
});

export const getMerchantList = (data) => ({
  type: constants.GET_MERCHANT_LIST,
  data,
});

export const getMerchantListDenied = (data) => ({
  type: constants.GET_MERCHANT_LIST_DENIED,
  data,
});

export const getMerchantDetailDenied = (data) => ({
  type: constants.GET_MERCHANT_DETAIL_DENIED,
  data,
});

export const getMerchantInfo = (data) => ({
  type: constants.GET_MERCHANT_INFO,
  data,
});

export const approvedMerchant = (data) => ({
  type: constants.APPROVED_MERCHANT,
  data,
});

export const deniedMerchant = (data) => ({
  type: constants.DENIED_MERCHANT,
  data,
});

export const updateMasterMerchant = (data) => ({
  type: constants.UPDATE_MERCHANT,
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

export const onCLickToChangeStatusInLockModal = (data) => ({
  type: constants.CLICK_TO_CHANGE_STATUS_IN_LOCK_MODAL,
  data,
});

export const onCLickToChangeStatusInUnLockModal = (data) => ({
  type: constants.CLICK_TO_CHANGE_STATUS_IN_UN_LOCK_MODAL,
  data,
});

export const lockOrUnlockMerchant = (data) => ({
  type: constants.LOCK_UNLOCK_MERCHANT,
  data,
});

export const getExcelFile = (data) => ({
  type: constants.EXPORT_EXCEL_FILE,
  data,
});

export const clearMerchantDetail = () => ({
  type: constants.CLEAR_MERCHANT_DETAIL,
});

export const clearMerchantCodeName = () => ({
  type: constants.CLEAR_MERCHANT_CODE_NAME,
});
