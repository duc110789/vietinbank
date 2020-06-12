import * as constants from '../../constants/LocalUserManageMentConstants/AddPageConstants';

export const addNewUser = (data) => ({
  type: constants.ADD_NEW_USER,
  data,
});
