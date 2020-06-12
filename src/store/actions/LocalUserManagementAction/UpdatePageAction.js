import * as constants from '../../constants/LocalUserManageMentConstants/UpdatePageConstants';

export const getDataLocalUserById = (data) => ({
  type: constants.GET_LOCAL_USER_DATA_BY_ID,
  data,
});

export const updateNewAccount = (data) => ({
  type: constants.UPDATE_ACCOUNT,
  data,
});
