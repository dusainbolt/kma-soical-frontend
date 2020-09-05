export const ActionTypes = {
  POST_LOGIN_START: "POST_LOGIN_START",
  POST_LOGIN_SUCCESS: "POST_LOGIN_SUCCESS",
  POST_LOGIN_ERROR: "POST_LOGIN_ERROR",
};

export const actions = {
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
