import * as constants from '../../constants/StaffManagementConstants/StaffManagementAddConstants';
import {messageError} from "../../../utils";

const inititalState = {
  isAddStaffSuccess: null,
};

function StaffManagementAddReducer(state = inititalState, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case constants.ADD_NEW_STAFF:
      return { ...state };

    case constants.ADD_NEW_STAFF_SUCCESS:
      if (action.data.code === '00') {
        return { ...state, isAddStaffSuccess: action.data };
      }
      if (action.data.code === '52') {
        messageError('Đã tồn tại mã nhân viên');
      } else {
        messageError(action.data.description);
      }
      return { ...state };

    case constants.ADD_NEW_STAFF_FAIL:
      return { ...state };

  }

  return state;
}
export default StaffManagementAddReducer;
