import { ActionTypes } from "./actions";

const DEFAULT_STATE = {
  token: "",
  userDetail: {},
  isLoadingLogin: false,
  errorLogin: "",
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
  case ActionTypes.POST_LOGIN_START: {
    return {
      ...state,
      isLoadingLogin: true,
    };
  }
  case ActionTypes.POST_LOGIN_SUCCESS:
    return {
      ...state,
      token: action.payload.token,
      userDetail: action.payload.userInfo,
      isLoadingLogin: false,
    };
  case ActionTypes.POST_LOGIN_ERROR:
    return {
      ...state,
      isLoadingLogin: false,
      errorLogin: action.payload
    };
  default:
    return state;
  }
};
