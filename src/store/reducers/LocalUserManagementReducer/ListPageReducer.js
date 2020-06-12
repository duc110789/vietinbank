import * as constants from '../../constants/LocalUserManageMentConstants/ListPageConstants';
import {messageError} from "../../../utils";

const inititalState = {
  arrayGroupRole: null,
  arrayBranchBankByUser: null,
  resDataListPage: null,
  isOpenChangeStatusAccountModal: false,
  dataChangeStatusLocalAccount: null,
  isChangeStatusLocalAccountSuccess: null,
  changePageSearchLocals: 0,
  dataSearchLocals: null,
};

function ListPageReducer(state = inititalState, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case constants.GET_ALL_GROUP_ROLE:
      return { ...state };

    case constants.GET_ALL_GROUP_ROLE_SUCCESS:
      localStorage.setItem('ALL_ROLES', JSON.stringify(action.data.data));
      return { ...state, arrayGroupRole: action.data.data };

    case constants.GET_ALL_GROUP_ROLE_FAIL:
      return { ...state };

    case constants.GET_ALL_BRANCH_BANK_BY_LOCAL_USER:
      return { ...state };

    case constants.GET_ALL_BRANCH_BANK_BY_LOCAL_USER_SUCCESS:
      return { ...state, arrayBranchBankByUser: action.data.data };

    case constants.GET_ALL_BRANCH_BANK_BY_LOCAL_USER_FAIL:
      return { ...state };

    case constants.GET__DATA_LIST_PAGE:
      if (action.data.fromRow === 0) {
        state.changePageSearchLocals = 1;
      } else {
        state.changePageSearchLocals = 0;
      }
      state.dataSearchLocals = action.data;
      return { ...state };
    case constants.GET__DATA_LIST_PAGE_SUCCESS:
      return { ...state, resDataListPage: action.data.data };
    case constants.GET__DATA_LIST_PAGE_FAIL:
      return { ...state };

    case constants.CLICK_TO_OPEN_MODAL_CHANGE_STATUS_LOCAL_ACCOUNT:
      return { ...state, isOpenChangeStatusAccountModal: true, dataChangeStatusLocalAccount: action.data };

    case constants.CLICK_TO_CLOSE_MODAL_CHANGE_STATUS_LOCAL_ACCOUNT:
      return { ...state, isOpenChangeStatusAccountModal: false };

    case constants.CHANGE_STATUS_LOCAL_ACCOUNT:
      return { ...state };

    case constants.CHANGE_STATUS_LOCAL_ACCOUNT_SUCCESS:
      if (action.data.code === '00') {
        return { ...state, isOpenChangeStatusAccountModal: false, isChangeStatusLocalAccountSuccess: action.data };
      }
      messageError(action.data.description);
      return { ...state, isOpenChangeStatusAccountModal: false };

    case constants.CHANGE_STATUS_LOCAL_ACCOUNT_FAIL:
      return { ...state };
  }

  return state;
}
export default ListPageReducer;
