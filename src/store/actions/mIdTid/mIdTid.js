import * as constants from '../../constants/midTid/mIdTIdConstant';

export const addMidTid = (data) => ({
  type: constants.ADD_MID_TID,
  data,
});

export const editMidTid = (data) => ({
  type: constants.EDIT_MID_TID,
  data,
});

export const getUserInfo = (data) => ({
  type: constants.GET_USER_INFO,
  data,
});

export const getMidTidList = (data) => ({
  type: constants.GET_MID_TID_LIST,
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

export const lockOrUnlockMidTid = (data) => ({
  type: constants.LOCK_UNLOCK_MID_TID,
  data,
});

export const onCLickOpenResetPasswordModal = (data) => ({
  type: constants.CLICK_OPEN_RESET_PASSWORD_MODAL,
  data,
});

export const onClickCloseResetPasswordModal = (data) => ({
  type: constants.CLICK_CLOSE_RESET_PASSWORD_MODAL,
  data,
});

export const resetPassUserMidTid = (data) => ({
  type: constants.RESET_PASS_MID_TID,
  data,
});
