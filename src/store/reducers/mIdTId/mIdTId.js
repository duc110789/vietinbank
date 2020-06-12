import * as constants from '../../constants/midTid/mIdTIdConstant';

const initState = {
  responseServer: {},
  detailMidTid: {},
  listMidTidTable: {},
  changePageSearchMidTid: 0,
  dataSearchMidTid: {},
  userId: null,
  isOpenLockModal: false,
  isOpenUnLockModal: false,
  isOpenResetPasswordModal: false,
  merchantCode: null,
  isLockSuccess: null,
};

function mIdTIdReducer(state = initState, action) {
  switch (action.type) {
    case constants.ADD_MID_TID:
      return { ...state };
    case constants.ADD_MID_TID_SUCCESS:
      state.responseServer = action.data;
      return { ...state };
    case constants.ADD_MID_TID_FAILED:
      return { ...state };

    case constants.EDIT_MID_TID:
      return { ...state };
    case constants.EDIT_MID_TID_SUCCESS:
      state.responseServer = action.data;
      return { ...state };
    case constants.EDIT_MID_TID_FAILED:
      return { ...state };

    case constants.GET_USER_INFO:
      return { ...state };
    case constants.GET_USER_INFO_SUCCESS:
      state.detailMidTid = action.data;
      return { ...state };
    case constants.GET_USER_INFO_FAILED:
      return { ...state };

    default:
      return { ...state };

    case constants.GET_MID_TID_LIST:
      if (action.data.fromRow === 0) {
        state.changePageSearchMidTid = 1;
      } else {
        state.changePageSearchMidTid = 0;
      }
      state.dataSearchMidTid = action.data;
      return { ...state };
    case constants.GET_MID_TID_LIST_SUCCESS:
      state.listMidTidTable = action.data.data;
      return { ...state };
    case constants.GET_MID_TID_LIST_FAILED:
      return { ...state };

    case constants.CLICK_OPEN_LOCK_MODAL:
      return { ...state, isOpenLockModal: true, userId: action.data };

    case constants.CLICK_CLOSE_LOCK_MODAL:
      return { ...state, isOpenLockModal: false };

    case constants.CLICK_OPEN_UN_LOCK_MODAL:
      return { ...state, isOpenUnLockModal: true, userId: action.data };

    case constants.CLICK_CLOSE_UN_LOCK_MODAL:
      return { ...state, isOpenUnLockModal: false };

    case constants.CLICK_OPEN_RESET_PASSWORD_MODAL:
      return { ...state, isOpenResetPasswordModal: true };

    case constants.CLICK_CLOSE_RESET_PASSWORD_MODAL:
      return { ...state, isOpenResetPasswordModal: false };

    case constants.LOCK_UNLOCK_MID_TID:
      return { ...state };

    case constants.LOCK_UNLOCK_MID_TID_SUCCESS:
      if (action.data.code === '00') {
        return {
          ...state, isLockSuccess: action.data, isOpenLockModal: false, isOpenUnLockModal: false,
        };
      }
      return { ...state };
    case constants.LOCK_UNLOCK_MID_TID_FAILED:
      return { ...state };

    case constants.RESET_PASS_MID_TID:
      state.dataResetPass = action.data;
      return { ...state };

    case constants.RESET_PASS_MID_TID_SUCCESS:
      return { ...state, responseResetPass: action.data, isOpenResetPasswordModal: false };

    case constants.RESET_PASS_MID_TID_FAILED:
      return { ...state };
  }
}

export default mIdTIdReducer;
