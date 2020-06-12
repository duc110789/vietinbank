import * as constants from '../../constants/AuthenConstants/accPersonalInfoConstants';

const inititalState = {
  accPersonalInfoData: null,
  messageChangePass: null,
  responseUpdateAcc: null,
};

let index = 0;

function accPersonalInfoReducer(state = inititalState, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case constants.GET_ACC_PERSONAL_INFO:
      return { ...state };

    case constants.GET_ACC_PERSONAL_INFO_SUCCESS:
      return { ...state, accPersonalInfoData: action.data.data };

    case constants.GET_ACC_PERSONAL_INFO_FAIL:
      return { ...state };

    case constants.UPDATE_ACC_INFO:
      return { ...state };

    case constants.UPDATE_ACC_INFO_SUCCESS:
      return { ...state, responseUpdateAcc: action.data };

    case constants.UPDATE_ACC_INFO_FAIL:
      return { ...state };

    case constants.ACC_CHANGE_PASSWORD:
      return { ...state };

    case constants.ACC_CHANGE_PASSWORD_SUCCESS:
      index += 1;
      return {
        ...state,
        messageChangePass: {
          ...action.data,
          ...index,
        },
      };

    case constants.ACC_CHANGE_PASSWORD_FAIL:
      return { ...state };
  }

  return state;
}
export default accPersonalInfoReducer;
