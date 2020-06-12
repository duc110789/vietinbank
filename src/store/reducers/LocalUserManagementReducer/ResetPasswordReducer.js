/* eslint-disable */
import * as constants from '../../constants/LocalUserManageMentConstants/ResetPasswordConstants';
import {messageError} from "../../../utils";

const inititalState = {
isChangePasswordSuccess: null,
};

function ResetPasswordPageReducer(state = inititalState, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case constants.RESET_PASSWORD_LOCAL_ACC:
      return { ...state };

    case constants.RESET_PASSWORD_LOCAL_ACC_SUCCESS:
      if (action.data.code === '00') {
        return { ...state, isChangePasswordSuccess: action.data };
      }
      messageError(action.data.description);
      return { ...state };


    case constants.RESET_PASSWORD_LOCAL_ACC_FAIL:
      return { ...state };
  }

  return state;
}
export default ResetPasswordPageReducer;
