export const ActionTypes = {
  POST_MESSAGE_START: "POST_MESSAGE_START",
  POST_MESSAGE_ERROR: "POST_MESSAGE_ERROR",
  GET_MESSAGE_SOCKET: "GET_MESSAGE_SOCKET",
};

export const actions = {
  postMessageStart: function (body) {
    return {
      type: ActionTypes.POST_MESSAGE_START,
      body,
    };
  },
  postMessageError: function (error) {
    return {
      type: ActionTypes.POST_MESSAGE_ERROR,
      payload: error,
    };
  },
};