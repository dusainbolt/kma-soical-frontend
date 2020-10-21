export const ActionTypes = {
  POST_LOGIN_START: "POST_LOGIN_START",
  POST_LOGIN_SUCCESS: "POST_LOGIN_SUCCESS",
  POST_LOGIN_ERROR: "POST_LOGIN_ERROR",
  RESET_USER_CONFIRM_START: "RESET_USER_CONFIRM_START",
  RESET_USER_CONFIRM_SUCCESS: "RESET_USER_CONFIRM_SUCCESS",
  RESET_USER_CONFIRM_ERROR: "RESET_USER_CONFIRM_ERROR",
  POST_CHANGE_AVATAR_SUCCESS: "POST_CHANGE_AVATAR_SUCCESS",
};

export const actions = {
  resetUserConfirmStart: function () {
    return {
      type: ActionTypes.RESET_USER_CONFIRM_START,
    };
  },
  resetUserConfirmSuccess: function (success) {
    return {
      type: ActionTypes.RESET_USER_CONFIRM_SUCCESS,
      payload: success,
    };
  },
  resetUserConfirmError: function (error) {
    return {
      type: ActionTypes.RESET_USER_CONFIRM_ERROR,
      payload: error,
    };
  },
  postLoginStart: function (values) {
    return {
      type: ActionTypes.POST_LOGIN_START,
      values,
    };
  },
  postLoginSuccess: function (success) {
    return {
      type: ActionTypes.POST_LOGIN_SUCCESS,
      payload: success,
    };
  },
  postLoginError: function (error) {
    return {
      type: ActionTypes.POST_LOGIN_ERROR,
      payload: error,
    };
  },
};
