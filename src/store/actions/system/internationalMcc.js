import * as constants from '../../constants/system/systemInternationalMccConstant';

export const getListInternationalMcc = (data) => ({
  type: constants.GET_ALL_INTERNATIONAL_MMC,
  data,
});

export const lockOrUnlockInternationalMcc = (data) => ({
  type: constants.LOCK_OR_UNLOCK_INTERNATIONAL_MMC,
  data,
});

export const openModalChangeStatusInternationalMcc = (data) => ({
  type: constants.CLICK_TO_OPEN_INTERNATIONAL_MCC,
  data,
});

export const closeModalChangeStatusInternationalMcc = () => ({
  type: constants.CLICK_TO_CLOSE_INTERNATIONAL_MCC,
});

export const clearListInternationalMcc = () => ({
  type: constants.CLEAR_LIST_INTERNATIONAL_MCC,
});
// ========= search

export const addInternationalMcc = (data) => ({
  type: constants.ADD_INTERNATIONAL_MMC,
  data,
});

export const getInternationalMcc = (data) => ({
  type: constants.GET_INTERNATIONAL_MMC,
  data,
});

export const editInternationalMcc = (data) => ({
  type: constants.EDIT_INTERNATIONAL_MMC,
  data,
});
