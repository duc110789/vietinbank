import * as constants from '../../constants/AuthenConstants/LoginPageConstants';

export const login = (data) => ({
  type: constants.LOG_IN,
  data,
});

export const logout = () => ({
  type: constants.LOG_OUT,
});

export const refreshToken = (data) => ({
  type: constants.REFRESH_TOKEN,
  data,
});
