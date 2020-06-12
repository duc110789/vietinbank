import * as constants from '../../constants/AuthenConstants/ResetPasswordConstants';

const inititalState = {
  description: '',
};

function resetPasswordPageReducer(state = inititalState, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case constants.RESET_PASSWORD:
      return { ...state };

    case constants.RESET_PASSWORD_SUCCESS:
      return { ...state, description: action.data };

    case constants.RESET_PASSWORD_FAILED:
      return { ...state };
  }

  return state;
}
export default resetPasswordPageReducer;
