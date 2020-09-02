import { ActionTypes } from "./actions";

const DEFAULT_STATE = {
  isLoadingChangePassword: false,
  auth: {},
  userDetail: {},
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
  case ActionTypes.POST_LOGIN_SUCCESS:
    return {
      ...state,
      auth: action.payload,
    };
  case ActionTypes.POST_LOGIN_ERROR:
    return {
      ...state,
    };
  case ActionTypes.POST_AUTH_SUCCESS:
    return {
      ...state,
      auth: action.payload.token,
      userDetail: action.payload.data,
    };
  case ActionTypes.POST_AUTH_ERROR:
    return {
      ...state,
      auth: action.payload,
    };
  case ActionTypes.POST_CHANGE_PASSWORD_START:
    return {
      ...state,
      isLoadingChangePassword: false,
    };  
  case ActionTypes.POST_CHANGE_PASSWORD_SUCCESS:
    return {
      ...state,
      userDetail: action.payload.data,
      isLoadingChangePassword: true,
    };
  case ActionTypes.POST_CHANGE_PASSWORD_ERROR:
    return {
      ...state,
      isLoadingChangePassword: false,
    };
  default:
    return state;
  }
};
