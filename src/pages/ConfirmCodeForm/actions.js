export const ActionTypes = {
  POST_CONFIRM_CODE_START: "POST_CONFIRM_CODE_START",
  POST_CONFIRM_CODE_SUCCESS: "POST_CONFIRM_CODE_SUCCESS",
  POST_CONFIRM_CODE_ERROR: "POST_CONFIRM_CODE_ERROR",
  RESET_USER_CONFIRM: "RESET_USER_CONFIRM",
};

export const actions = {
  postConfirmCodeStart: function (body) {
    return {
      type: ActionTypes.POST_CONFIRM_CODE_START,
      body,
    };
  },
  postConfirmCodeSuccess: function (data) {
    return {
      type: ActionTypes.POST_CONFIRM_CODE_SUCCESS,
      payload: data,
    };
  },
  postConfirmCodeError: function (error) {
    return {
      type: ActionTypes.POST_CONFIRM_CODE_ERROR,
      payload: error,
    };
  },
};
