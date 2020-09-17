export const ActionTypes = {
  SHOW_LOADING_AUTH: "SHOW_LOADING_AUTH",
  HIDE_LOADING_AUTH: "HIDE_LOADING_AUTH",
  SHOW_LOADING_EVENT: "SHOW_LOADING_EVENT",
  HIDE_LOADING_EVENT: "HIDE_LOADING_EVENT",
  POST_LOGOUT_START: "POST_LOGOUT_START",
  POST_LOGOUT_SUCCESS: "POST_LOGOUT_SUCCESS",
  POST_LOGOUT_ERROR: "POST_LOGOUT_ERROR",
  GET_LIST_CHAT_START: "GET_LIST_CHAT_START",
  GET_LIST_CHAT_SUCCESS: "GET_LIST_CHAT_SUCCESS",
  GET_LIST_CHAT_ERROR: "GET_LIST_CHAT_ERROR",
  CHANGE_SCREEN_PIXEL: "CHANGE_SCREEN_PIXEL",
  GET_MESSAGE_SOCKET: "GET_MESSAGE_SOCKET",
  GET_LIST_ONLINE_SOCKET: "GET_LIST_ONLINE_SOCKET",
};

export const actions = {
  showLoadingAuth: function () {
    return {
      type: ActionTypes.SHOW_LOADING_AUTH    
    };
  },
  hideLoadingAuth: function () {
    return {
      type: ActionTypes.HIDE_LOADING_AUTH,
    };
  },
  showLoadingEvent: function () {
    return {
      type: ActionTypes.SHOW_LOADING_EVENT    
    };
  },
  hideLoadingEvent: function () {
    return {
      type: ActionTypes.HIDE_LOADING_EVENT,
    };
  },
  postLogoutStart: function (body) {
    return {
      type: ActionTypes.POST_LOGOUT_START,
      body
    };
  },
  postLogoutSuccess: function () {
    return {
      type: ActionTypes.POST_LOGOUT_SUCCESS,
    };
  },
  postLogoutError: function () {
    return {
      type: ActionTypes.POST_LOGOUT_ERROR,
    };
  },
  changeScreenPixel: function (conditionPixel) {
    return {
      type: ActionTypes.CHANGE_SCREEN_PIXEL,
      conditionPixel,
    };
  },
  getListChatStart: function (itemUser) {
    return {
      type: ActionTypes.GET_LIST_CHAT_START,
      itemUser,
    };
  }
};

export const actionsSocket = {
  getMessageSocket: function (payload) {
    return {
      type: ActionTypes.GET_MESSAGE_SOCKET,
      payload,
    };
  },
  getListOnlineSocket: function(payload){
    return {
      type: ActionTypes.GET_LIST_ONLINE_SOCKET,
      payload,
    };
  },
};
