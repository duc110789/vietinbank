import * as constants from '../../constants/RoleManagementConstants/EditRolesConstants';
import {messageError} from "../../../utils";

const inititalState = {
  isEditRolesSuccess: null,
};

function EditRolePageReducer(state = inititalState, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case constants.EDIT_ROLES:
      return { ...state };

    case constants.EDIT_ROLES_SUCCESS:
      if (action.data.code === '00') {
        return { ...state, isEditRolesSuccess: action.data };
      }
      messageError(action.data.code);
      return { ...state };

    case constants.EDIT_ROLES_FAIL:
      return { ...state };
  }

  return state;
}
export default EditRolePageReducer;
