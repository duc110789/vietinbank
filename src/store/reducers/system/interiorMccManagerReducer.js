import * as constants from '../../constants/system/systemInteriorMccConstant';

const initState = {
  listMccInteriorManager: null,
  responseLockOrUnlockMcc: null,
  responseEditMcc: null,
  isOpenModalMcc: false,
  dataChangeStatus: {},
  responseAddMcc: {},
  interiorMccDetail: null,
};

function interiorMccReducer(state = initState, action) {
  switch (action.type) {
    case constants.GET_ALL_INTERIOR_MMC:
      return { ...state };
    case constants.GET_ALL_INTERIOR_MMC_SUCCESS:
      state.listMccInteriorManager = action.data.data;
      return { ...state };
    case constants.GET_ALL_INTERIOR_MMC_FAIL:
      return { ...state };

    case constants.LOCK_OR_UNLOCK_INTERIOR_MMC:
      return { ...state };
    case constants.LOCK_OR_UNLOCK_INTERIOR_MMC_SUCCESS:
      state.responseLockOrUnlockMcc = action.data;
      return { ...state, isOpenModalMcc: false ,statusIMCC: action.data.status};
    case constants.LOCK_OR_UNLOCK_INTERIOR_MMC_FAIL:
      return { ...state };

    case constants.CLICK_TO_OPEN_INTERIOR_MCC:
      return { ...state, isOpenModalMcc: true, dataChangeStatus: action.data };

    case constants.CLICK_TO_CLOSE_INTERIOR_MCC:
      return { ...state, isOpenModalMcc: false };

    case constants.CLEAR_LIST_INTERIOR_MCC:
      return { ...state, listMccInteriorManager: null };

      // ========= search

    case constants.ADD_INTERIOR_MMC:
      return { ...state };
    case constants.ADD_INTERIOR_MMC_SUCCESS:
      state.responseAddMcc = action.data;
      return { ...state };
    case constants.ADD_INTERIOR_MMC_FAIL:
      return { ...state };

    case constants.GET_INTERIOR_MMC:
      return { ...state };
    case constants.GET_INTERIOR_MMC_SUCCESS:
      state.interiorMccDetail = action.data;
      return { ...state };
    case constants.GET_INTERIOR_MMC_FAIL:
      return { ...state };

    case constants.EDIT_INTERIOR_MMC:
      return { ...state };
    case constants.EDIT_INTERIOR_MMC_SUCCESS:
      state.responseEditMcc = action.data;
      return { ...state };
    case constants.EDIT_INTERIOR_MMC_FAIL:
      return { ...state };

    default:
      return { ...state };
  }
}

export default interiorMccReducer;
