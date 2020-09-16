export const ActionTypes = {
  POST_MESSAGE_START: "POST_MESSAGE_START",
  POST_MESSAGE_SUCCESS: "POST_MESSAGE_SUCCESS",
  POST_MESSAGE_ERROR: "POST_MESSAGE_ERROR",
};

export const actions = {
  postMessageStart: function (body) {
    return {
      type: ActionTypes.POST_MESSAGE_START,
      body,
    };
  },
  postMessageSuccess: function (data) {
    return {
      type: ActionTypes.POST_MESSAGE_SUCCESS,
      payload: data,
    };
  },
  postMessageError: function (error) {
    return {
      type: ActionTypes.POST_MESSAGE_ERROR,
      payload: error,
    };
  },
};
