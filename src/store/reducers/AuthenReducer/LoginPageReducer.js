import * as constants from '../../constants/AuthenConstants/LoginPageConstants';
import {messageError} from '../../../utils';

const inititalState = {
  token: null,
  refreshToken: null,
  errMessage: null,
  reasonFailLogin: '',
  response: null,
};

function authenLoginPageReducer(state = inititalState, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case constants.LOG_IN:
      return { ...state };

    case constants.LOG_IN_SUCCESS:
      if (action.data.code === '00') {
        return {
          ...state,
          token: action.data.data.token,
          refreshToken: action.data.data.refreshToken,
          reasonFailLogin: '',
        };
      }
      messageError(action.data.description);

      return { ...state, };

    case constants.LOG_IN_FAILED:
      return { ...state };

    case constants.REFRESH_TOKEN:
      return { ...state };

    case constants.REFRESH_TOKEN_SUCCESS:
      return { ...state, refreshToken: action.data };

    case constants.REFRESH_TOKEN_FAILED:
      return { ...state };

    case constants.LOG_OUT:
      return { ...state };

    case constants.LOG_OUT_SUCCESS:
      return { ...state, response: action.data };

    case constants.LOG_OUT_FAILED:
      return { ...state };
  }

  return state;
}
export default authenLoginPageReducer;
