import * as constants from '../../constants/system/systemInternationalMccConstant';

const initState = {
  listMccInternationalManager: null,
  responseLockOrUnlockMcc: null,
  responseEditMcc: null,
  isOpenModalMcc: false,
  dataChangeStatus: {},
  responseAddMcc: {},
  internationalMccDetail: null,
};

function internationalMccReducer(state = initState, action) {
  switch (action.type) {
    case constants.GET_ALL_INTERNATIONAL_MMC:
      return { ...state };
    case constants.GET_ALL_INTERNATIONAL_MMC_SUCCESS:
      state.listMccInternationalManager = action.data.data;
      return { ...state };
    case constants.GET_ALL_INTERNATIONAL_MMC_FAIL:
      return { ...state };

    case constants.LOCK_OR_UNLOCK_INTERNATIONAL_MMC:
      return { ...state };
    case constants.LOCK_OR_UNLOCK_INTERNATIONAL_MMC_SUCCESS:
      state.responseLockOrUnlockMcc = action.data;
      return { ...state, isOpenModalMcc: false,statusMCC : action.data.status };
    case constants.LOCK_OR_UNLOCK_INTERNATIONAL_MMC_FAIL:
      return { ...state };

    case constants.CLICK_TO_OPEN_INTERNATIONAL_MCC:
      return { ...state, isOpenModalMcc: true, dataChangeStatus: action.data };

    case constants.CLICK_TO_CLOSE_INTERNATIONAL_MCC:
      return { ...state, isOpenModalMcc: false };

    case constants.CLEAR_LIST_INTERNATIONAL_MCC:
      return { ...state, listMccInternationalManager: null };

      // ========= search

    case constants.ADD_INTERNATIONAL_MMC:
      return { ...state };
    case constants.ADD_INTERNATIONAL_MMC_SUCCESS:
      state.responseAddMcc = action.data;
      return { ...state };
    case constants.ADD_INTERNATIONAL_MMC_FAIL:
      return { ...state };

    case constants.GET_INTERNATIONAL_MMC:
      return { ...state };
    case constants.GET_INTERNATIONAL_MMC_SUCCESS:
      state.internationalMccDetail = action.data;
      return { ...state };
    case constants.GET_INTERNATIONAL_MMC_FAIL:
      return { ...state };

    case constants.EDIT_INTERNATIONAL_MMC:
      return { ...state };
    case constants.EDIT_INTERNATIONAL_MMC_SUCCESS:
      state.responseEditMcc = action.data;
      return { ...state };
    case constants.EDIT_INTERNATIONAL_MMC_FAIL:
      return { ...state };

    default:
      return { ...state };
  }
}

export default internationalMccReducer;
