export const ActionTypes = {
  POST_LOGIN_START: "POST_LOGIN_START",
  POST_LOGOUT_START: "POST_LOGOUT_START",
  POST_LOGOUT_SUCCESS: "POST_LOGOUT_SUCCESS",
  POST_REDIRECT_START: "POST_REDIRECT_START",
  POST_AUTH_START: "POST_AUTH_START",
  POST_AUTH_SUCCESS: "POST_AUTH_SUCCESS",
  POST_AUTH_ERROR: "POST_AUTH_ERROR",
  POST_LOGIN_SUCCESS: "POST_LOGIN_SUCCESS",
  POST_LOGIN_ERROR: "POST_LOGIN_ERROR",
  POST_CHANGE_PASSWORD_START: "POST_CHANGE_PASSWORD_START",
  POST_CHANGE_PASSWORD_SUCCESS: "POST_CHANGE_PASSWORD_SUCCESS",
  POST_CHANGE_PASSWORD_ERROR: "POST_CHANGE_PASSWORD_ERROR",

};

export const actions = {
  postLoginStart: function (values) {
    return {
      type: ActionTypes.POST_LOGIN_START,
      values,
    };
  },
  postAuthAdminStart: function (values) {
    return {
      type: ActionTypes.POST_AUTH_START,
      values,
    };
  },
  postRedirectLoginStart: function (values) {
    return {
      type: ActionTypes.POST_REDIRECT_START,
      values,
    };
  },
  postAuthAdminSuccess: function (token, data) {
    return {
      type: ActionTypes.POST_AUTH_SUCCESS,
      payload: {
        token,
        data,
      },
    };
  },
  postAuthAdminError: function (error) {
    return {
      type: ActionTypes.POST_AUTH_ERROR,
      payload: error,
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
  postLogoutStart: function (token) {
    return {
      type: ActionTypes.POST_LOGOUT_START,
      token,
    };
  },
  postLogoutSuccess: function (success) {
    return {
      type: ActionTypes.POST_LOGOUT_SUCCESS,
      payload: success,
    };
  },
  postChangePasswordStart: function (values) {
    return {
      type: ActionTypes.POST_CHANGE_PASSWORD_START,
      values,
    };
  },
  postChangePasswordSuccess: function (success) {
    return {
      type: ActionTypes.POST_CHANGE_PASSWORD_SUCCESS,
      payload: success,
    };
  },
  postChangePasswordError: function (error) {
    return {
      type: ActionTypes.POST_CHANGE_PASSWORD_ERROR,
      error,
    };
  },
};
