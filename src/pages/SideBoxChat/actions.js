export const ActionTypes = {
  POST_MESSAGE_START: "POST_MESSAGE_START",
  POST_MESSAGE_ERROR: "POST_MESSAGE_ERROR",
  GET_MESSAGE_SOCKET: "GET_MESSAGE_SOCKET",
  OPEN_BOX_CHAT_START: "OPEN_BOX_CHAT_START",
  OPEN_BOX_CHAT_SUCCESS: "OPEN_BOX_CHAT_SUCCESS",
  GET_LIST_CHAT_START: "GET_LIST_CHAT_START",
  GET_LIST_CHAT_SUCCESS: "GET_LIST_CHAT_SUCCESS",
  GET_LIST_CHAT_ERROR: "GET_LIST_CHAT_ERROR",
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
  getListChatStart: function (params) {
    return {
      type: ActionTypes.GET_LIST_CHAT_START,
      params,
    };
  },
  getListChatSuccess: function (success) {
    return {
      type: ActionTypes.GET_LIST_CHAT_SUCCESS,
      payload: success,
    };
  },
  getListChatError: function (error) {
    return {
      type: ActionTypes.GET_LIST_CHAT_ERROR,
      payload: error,
    };
  },
};