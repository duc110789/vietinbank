import * as constants from '../../constants/qRCode/qRCodeConstant';

export const addQrCode = (data) => ({
  type: constants.ADD_QRCODE,
  data,
});

export const editQrCode = (data) => ({
  type: constants.EDIT_QRCODE,
  data,
});

export const getQrCode = (data) => ({
  type: constants.GET_QRCODE,
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

export const lockOrUnlockQrCode = (data) => ({
  type: constants.LOCK_UNLOCK_QRCODE,
  data,
});

export const getQrCodeList = (data) => ({
  type: constants.GET_QRCODE_LIST,
  data,
});
