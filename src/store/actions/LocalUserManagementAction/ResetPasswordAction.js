import * as constants from '../../constants/LocalUserManageMentConstants/ResetPasswordConstants';

export const resetPasswordLocalAcc = (data) => ({
  type: constants.RESET_PASSWORD_LOCAL_ACC,
  data,
});
