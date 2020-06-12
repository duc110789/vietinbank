import * as constants from '../../constants/RoleManagementConstants/AddNewRolesConstants';
import {messageError} from "../../../utils";

const inititalState = {
  isAddNewRolesSuccess: null,
};

function AddRolePageReducer(state = inititalState, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case constants.ADD_NEW_ROLES:
      return { ...state };

    case constants.ADD_NEW_ROLES_SUCCESS:
      if (action.data.code === '00') {
        return { ...state, isAddNewRolesSuccess: action.data.data };
      }
      messageError(action.data.description);
      return { ...state };

    case constants.ADD_NEW_ROLES_FAIL:
      return { ...state };
  }

  return state;
}
export default AddRolePageReducer;
