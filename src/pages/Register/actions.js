export const ActionTypes = {
  POST_REGISTER_START: "POST_REGISTER_START",
  POST_REGISTER_SUCCESS: "POST_REGISTER_SUCCESS",
  POST_REGISTER_ERROR: "POST_REGISTER_ERROR",
  POST_REGISTER_CODE: "POST_REGISTER_CODE",
  GET_EMPTY_USER_START: "GET_EMPTY_USER_START",
  GET_EMPTY_USER_SUCCESS: "GET_EMPTY_USER_SUCCESS",
  GET_EMPTY_USER_ERROR: "GET_EMPTY_USER_ERROR",
  RESET_USER_CONFIRM: "RESET_USER_CONFIRM",
};

export const actions = {
  postRegisterStart: function (body) {
    return {
      type: ActionTypes.POST_REGISTER_START,
      body,
    };
  },
  postRegisterSuccess: function (data) {
    return {
      type: ActionTypes.POST_REGISTER_SUCCESS,
      payload: data,
    };
  },
  postRegisterError: function (error) {
    return {
      type: ActionTypes.POST_REGISTER_ERROR,
      payload: error,
    };
  },
  postRegisterCode: function (data) {
    return {
      type: ActionTypes.POST_REGISTER_CODE,
      payload: data,
    };
  },
  getEmptyUserStart: function (params) {
    return {
      type: ActionTypes.GET_EMPTY_USER_START,
      params,
    };
  },
  getEmptyUserSuccess: function (data) {
    return {
      type: ActionTypes.GET_EMPTY_USER_SUCCESS,
      payload: data,
    };
  },
  getEmptyUserError: function (error) {
    return {
      type: ActionTypes.GET_EMPTY_USER_ERROR,
      payload: error,
    };
  },
};
