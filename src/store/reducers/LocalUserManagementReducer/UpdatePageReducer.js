/* eslint-disable */
import * as constants from '../../constants/LocalUserManageMentConstants/UpdatePageConstants';
import {messageError} from "../../../utils";

const inititalState = {
  dataLocalUser: null,
  isUpdated: false,
};

function UpdatePageReducer(state = inititalState, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case constants.GET_LOCAL_USER_DATA_BY_ID:
      return { ...state };

    case constants.GET_LOCAL_USER_DATA_BY_ID_SUCCESS:
      return { ...state, dataLocalUser: action.data.data };

    case constants.GET_LOCAL_USER_DATA_BY_ID_FAIL:
      return { ...state };

    case constants.UPDATE_ACCOUNT:
      return { ...state };

    case constants.UPDATE_ACCOUNT_SUCCESS:
      if (action.data.code === '00') {
        return { ...state, isUpdated: action.data };
      }
      messageError(action.data.description);
      return { ...state };


    case constants.UPDATE_ACCOUNT_FAIL:
      return { ...state };
  }

  return state;
}
export default UpdatePageReducer;
