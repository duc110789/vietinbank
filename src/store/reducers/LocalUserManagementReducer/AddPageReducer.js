import * as constants from '../../constants/LocalUserManageMentConstants/AddPageConstants';

const inititalState = {
  responseAddDataSuccess: {},
};

function AddPageReducer(state = inititalState, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case constants.ADD_NEW_USER:
      return { ...state };

    case constants.ADD_NEW_USER_SUCCESS:
      return { ...state, responseAddDataSuccess: action.data };

    case constants.ADD_NEW_USER_FAIL:
      return { ...state };
  }

  return state;
}
export default AddPageReducer;
