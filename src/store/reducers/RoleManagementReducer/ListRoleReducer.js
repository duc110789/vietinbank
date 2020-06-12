import * as constants from '../../constants/RoleManagementConstants/ListRoleConstants';
import {messageError} from "../../../utils";

const inititalState = {
  resDataRoleGroup: null,
  isOpenModalRole: false,
  dataChangeStatusRole: null,
  isChangeStatusRolesSuccess: null,
  changePageSearchRoles: 0,
  dataSearchRoles: null,
};

function ListRolePageReducer(state = inititalState, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case constants.GET_LIST_ROLE:
      if (action.data.fromRow === 0) {
        state.changePageSearchRoles = 1;
      } else {
        state.changePageSearchRoles = 0;
      }
      state.dataSearchRoles = action.data;
      return { ...state };
    case constants.GET_LIST_ROLE_SUCCESS:
      state.resDataRoleGroup = action.data.data;
      return { ...state };
    case constants.GET_LIST_ROLE_FAIL:
      return { ...state };

    case constants.CLICK_TO_OPEN_CHANGE_STATUS_MODAL_ROLE:
      return { ...state, isOpenModalRole: true, dataChangeStatusRole: action.data };

    case constants.CLICK_TO_CLOSE_CHANGE_STATUS_MODAL_ROLE:
      return { ...state, isOpenModalRole: false };

    case constants.CHANGE_STATUS_ROLE:
      return { ...state };

    case constants.CHANGE_STATUS_ROLE_SUCCESS:
      if (action.data.code === '00') {
        return { ...state, isOpenModalRole: false, isChangeStatusRolesSuccess: action.data };
      }
      messageError(action.data.description);
      return { ...state, isOpenModalRole: false };

    case constants.CHANGE_STATUS_ROLE_FAIL:
      return { ...state };
  }

  return state;
}
export default ListRolePageReducer;
