import * as constants from '../../constants/system/systemInteriorMccConstant';

export const getListInteriorMcc = (data) => ({
  type: constants.GET_ALL_INTERIOR_MMC,
  data,
});

export const lockOrUnlockInteriorMcc = (data) => ({
  type: constants.LOCK_OR_UNLOCK_INTERIOR_MMC,
  data,
});

export const openModalChangeStatusInteriorMcc = (data) => ({
  type: constants.CLICK_TO_OPEN_INTERIOR_MCC,
  data,
});

export const closeModalChangeStatusInteriorMcc = () => ({
  type: constants.CLICK_TO_CLOSE_INTERIOR_MCC,
});

export const clearListInteriorMcc = () => ({
  type: constants.CLEAR_LIST_INTERIOR_MCC,
});
// ========= search

export const addInteriorMcc = (data) => ({
  type: constants.ADD_INTERIOR_MMC,
  data,
});

export const getInteriorMcc = (data) => ({
  type: constants.GET_INTERIOR_MMC,
  data,
});

export const editInteriorMcc = (data) => ({
  type: constants.EDIT_INTERIOR_MMC,
  data,
});
