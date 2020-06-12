import * as constants from '../../constants/LocalUserManageMentConstants/ListPageConstants';

export const loadAllGroupRole = () => ({
  type: constants.GET_ALL_GROUP_ROLE,
});


export const loadAllBranchBankByUser = () => ({
  type: constants.GET_ALL_BRANCH_BANK_BY_LOCAL_USER,
});


export const getDataListPage = (data) => ({
  type: constants.GET__DATA_LIST_PAGE,
  data,
});


export const openLocalAccountModal = (data) => ({
  type: constants.CLICK_TO_OPEN_MODAL_CHANGE_STATUS_LOCAL_ACCOUNT,
  data,
});

export const closeLocalAccountModal = () => ({
  type: constants.CLICK_TO_CLOSE_MODAL_CHANGE_STATUS_LOCAL_ACCOUNT,
});

export const changeStatusLocalAccount = (data) => ({
  type: constants.CHANGE_STATUS_LOCAL_ACCOUNT,
  data,
});
