import * as constants from '../../constants/AuthenConstants/ResetPasswordConstants';

export const resetPassword = (data) => ({
  type: constants.RESET_PASSWORD,
  data,
});
