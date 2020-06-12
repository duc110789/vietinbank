import * as constants from '../../constants/RoleManagementConstants/DetailRolesConstants';

const inititalState = {
  resDataFunctionGroup: null,
  resDetailRules: null,
};

function DetailRolePageReducer(state = inititalState, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case constants.GET_ALL_FUNCTION:
      return { ...state };

    case constants.GET_ALL_FUNCTION_SUCCESS:
      if (action.data.code === '00') {
        return { ...state, resDataFunctionGroup: action.data.data };
      }
      return { ...state };

    case constants.GET_ALL_FUNCTION_FAIL:
      return { ...state };

    case constants.GET_GROUP_DETAIL_ROLES:
      return { ...state };

    case constants.GET_GROUP_DETAIL_ROLES_SUCCESS:
      if (action.data.code === '00') {
        return { ...state, resDetailRules: action.data.data };
      }
      return { ...state };

    case constants.GET_GROUP_DETAIL_ROLES_FAIL:
      return { ...state };
  }

  return state;
}
export default DetailRolePageReducer;
