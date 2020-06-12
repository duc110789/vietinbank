import * as constants from '../../constants/StaffManagementConstants/StaffManagementUpdateConstants';
import {messageError} from "../../../utils";

const inititalState = {
  isGetInfoStaffSuccess: null,
  isUpdateInfoStaffSuccess: null,
};

function StaffManagementUpdateReducer(state = inititalState, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case constants.GET_INFO_STAFF:
      return { ...state };

    case constants.GET_INFO_STAFF_SUCCESS:
      if (action.data.code === '00') {
        return { ...state, isGetInfoStaffSuccess: action.data.data };
      }
      messageError(action.data.description);
      return { ...state };

    case constants.GET_INFO_STAFF_FAIL:
      return { ...state };

    case constants.UPDATE_INFO_STAFF:
      return { ...state };

    case constants.UPDATE_INFO_STAFF_SUCCESS:
      if (action.data.code === '00') {
        return { ...state, isUpdateInfoStaffSuccess: action.data };
      }
      messageError(action.data.description);
      return { ...state };

    case constants.UPDATE_INFO_STAFF_FAIL:
      return { ...state };
  }

  return state;
}
export default StaffManagementUpdateReducer;
