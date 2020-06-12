import * as constants from '../../constants/StaffManagementConstants/StaffManagementListConstants';

const inititalState = {
  responseDataStaff: null,
  dataSearchStaff: null,
  isOpenStaffModal: false,
  changeStatusByStaffCode: null,
  isChangeStatusSuccess: null,
};

function StaffManagementListReducer(state = inititalState, action) {
  switch (action.type) {
    case constants.LOAD_DEFAULT_DATA_STAFF:
      return { ...state, dataSearchStaff: action.data };

    case constants.LOAD_DEFAULT_DATA_STAFF_SUCCESS:
      return { ...state, responseDataStaff: action.data.data };

    case constants.LOAD_DEFAULT_DATA_STAFF_FAIL:
      return { ...state };

    case constants.SEARCH_BY_PAGINATION:
      return { ...state };

    case constants.SEARCH_BY_PAGINATION_SUCCESS:
      if (action.data.code === '00') {
        return { ...state, responseDataStaff: action.data.data };
      }
      return { ...state };

    case constants.SEARCH_BY_PAGINATION_FAIL:
      return { ...state };

    case constants.CLICK_TO_OPEN_STAFF_MODAL:
      return { ...state, isOpenStaffModal: true, changeStatusByStaffCode: action.data };

    case constants.CLICK_TO_CLOSE_STAFF_MODAL:
      return { ...state, isOpenStaffModal: false };

    case constants.CHANGE_STATUS_STAFF:
      return { ...state };

    case constants.CHANGE_STATUS_STAFF_SUCCESS:
      if (action.data.code === '00') {
        return { ...state, isOpenStaffModal: false, isChangeStatusSuccess: action.data };
      }
      return { ...state };

    case constants.CHANGE_STATUS_STAFF_FAIL:
      return { ...state };

    default: return state;
  }
}
export default StaffManagementListReducer;
