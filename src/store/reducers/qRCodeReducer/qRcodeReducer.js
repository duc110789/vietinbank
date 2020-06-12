import * as constants from '../../constants/qRCode/qRCodeConstant';

const initState = {
  responseServer: {},
  responseServerEdit: {},
  qrCodeDetail: {},
  listQrCodeTable: {},
  changePageSearchQrCode: 0,
  dataSearchQrCode: {},
  qrcodeId: null,
  isOpenLockModal: false,
  isOpenUnLockModal: false,
  merchantCode: null,
  isLockSuccess: null,
};

function qRCodeReducer(state = initState, action) {
  switch (action.type) {
    case constants.ADD_QRCODE:
      return { ...state };
    case constants.ADD_QRCODE_SUCCESS:
      state.responseServer = action.data;
      return { ...state };
    case constants.ADD_QRCODE_FAILED:
      return { ...state };

    case constants.EDIT_QRCODE:
      return { ...state };
    case constants.EDIT_QRCODE_SUCCESS:
      state.responseServerEdit = action.data;
      return { ...state };
    case constants.EDIT_QRCODE_FAILED:
      return { ...state };

    case constants.GET_QRCODE:
      return { ...state };
    case constants.GET_QRCODE_SUCCESS:
      state.qrCodeDetail = action.data;
      return { ...state };
    case constants.GET_QRCODE_FAILED:
      return { ...state };

    case constants.GET_QRCODE_LIST:
      if (action.data.fromRow === 0) {
        state.changePageSearchQrCode = 1;
      } else {
        state.changePageSearchQrCode = 0;
      }
      state.dataSearchQrCode = action.data;
      return { ...state };
    case constants.GET_QRCODE_LIST_SUCCESS:
      state.listQrCodeTable = action.data.data;
      return { ...state };
    case constants.GET_QRCODE_LIST_FAILED:
      return { ...state };

    case constants.CLICK_OPEN_LOCK_MODAL:
      return { ...state, isOpenLockModal: true, qrcodeId: action.data };

    case constants.CLICK_CLOSE_LOCK_MODAL:
      return { ...state, isOpenLockModal: false };

    case constants.CLICK_OPEN_UN_LOCK_MODAL:
      return { ...state, isOpenUnLockModal: true, qrcodeId: action.data };

    case constants.CLICK_CLOSE_UN_LOCK_MODAL:
      return { ...state, isOpenUnLockModal: false };

    case constants.LOCK_UNLOCK_QRCODE:
      return { ...state };

    case constants.LOCK_UNLOCK_QRCODE_SUCCESS:
      if (action.data.code === '00') {
        return {
          ...state, isLockSuccess: action.data, isOpenLockModal: false, isOpenUnLockModal: false,
        };
      }
      return { ...state };
    case constants.LOCK_UNLOCK_QRCODE_FAILED:
      return { ...state };

    default:
      return { ...state };
  }
}

export default qRCodeReducer;
