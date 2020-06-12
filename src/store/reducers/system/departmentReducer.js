import * as constants from '../../constants/system/systemDepartmentConstant';

const initState = {
  listDepartmentManager: null,
  responseLockOrUnlockDepartment: null,
  responseEditDepartment: null,
  isOpenModalDepartment: false,
  dataChangeStatus: {},
  responseAddDepartment: {},
  interiorDepartmentDetail: null,
};

function departmentReducer(state = initState, action) {
  switch (action.type) {
    case constants.GET_ALL_DEPARTMENT:
      return { ...state };
    case constants.GET_ALL_DEPARTMENT_SUCCESS:
      state.listDepartmentManager = action.data.data;
      return { ...state };
    case constants.GET_ALL_DEPARTMENT_FAIL:
      return { ...state };

    case constants.LOCK_OR_UNLOCK_DEPARTMENT:
      return { ...state };
    case constants.LOCK_OR_UNLOCK_DEPARTMENT_SUCCESS:
      state.responseLockOrUnlockDepartment = action.data.data;
      return { ...state, isOpenModalDepartment: false };
    case constants.LOCK_OR_UNLOCK_DEPARTMENT_FAIL:
      return { ...state };

    case constants.CLICK_TO_OPEN_DEPARTMENT:
      return { ...state, isOpenModalDepartment: true, dataChangeStatus: action.data };

    case constants.CLICK_TO_CLOSE_DEPARTMENT:
      return { ...state, isOpenModalDepartment: false };

    case constants.CLEAR_LIST_DEPARTMENT:
      return { ...state, listDepartmentManager: null };

      // ========= search

    case constants.ADD_DEPARTMENT:
      return { ...state };
    case constants.ADD_DEPARTMENT_SUCCESS:
      state.responseAddDepartment = action.data;
      return { ...state };
    case constants.ADD_DEPARTMENT_FAIL:
      return { ...state };

    case constants.GET_DEPARTMENT:
      return { ...state };
    case constants.GET_DEPARTMENT_SUCCESS:
      state.interiorDepartmentDetail = action.data;
      return { ...state };
    case constants.GET_DEPARTMENT_FAIL:
      return { ...state };

    case constants.EDIT_DEPARTMENT:
      return { ...state };
    case constants.EDIT_DEPARTMENT_SUCCESS:
      state.responseEditDepartment = action.data;
      return { ...state };
    case constants.EDIT_DEPARTMENT_FAIL:
      return { ...state };

    default:
      return { ...state };
  }
}

export default departmentReducer;
