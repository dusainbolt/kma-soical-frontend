export const ActionTypes = {
  POST_LOGIN_START: "POST_LOGIN_START",
  POST_LOGIN_SUCCESS: "POST_LOGIN_SUCCESS",
  POST_LOGIN_ERROR: "POST_LOGIN_ERROR",
  RESET_USER_CONFIRM: "RESET_USER_CONFIRM",
};

export const actions = {
  retSetUserNew: function (body) {
    return {
      type: ActionTypes.RESET_USER_CONFIRM,
      body,
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
