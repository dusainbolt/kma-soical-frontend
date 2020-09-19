export const ActionTypes = {
  SHOW_LOADING_AUTH: "SHOW_LOADING_AUTH",
  HIDE_LOADING_AUTH: "HIDE_LOADING_AUTH",
  SHOW_LOADING_EVENT: "SHOW_LOADING_EVENT",
  HIDE_LOADING_EVENT: "HIDE_LOADING_EVENT",
  POST_LOGOUT_START: "POST_LOGOUT_START",
  POST_LOGOUT_SUCCESS: "POST_LOGOUT_SUCCESS",
  POST_LOGOUT_ERROR: "POST_LOGOUT_ERROR",
  OPEN_BOX_CHAT_START: "OPEN_BOX_CHAT_START",
  OPEN_BOX_CHAT_SUCCESS: "OPEN_BOX_CHAT_SUCCESS",
  OPEN_BOX_CHAT_ERROR: "OPEN_BOX_CHAT_ERROR",
  CHANGE_SCREEN_PIXEL: "CHANGE_SCREEN_PIXEL",
  GET_MESSAGE_SOCKET: "GET_MESSAGE_SOCKET",
  GET_LIST_ONLINE_SOCKET: "GET_LIST_ONLINE_SOCKET",
  GET_MY_INBOX_SOCKET: "GET_MY_INBOX_SOCKET",
  RECEIVE_BOX_CHAT_SOCKET: "RECEIVE_BOX_CHAT_SOCKET",
  RECEIVE_READ_BOX_CHAT_SOCKET: "RECEIVE_READ_BOX_CHAT_SOCKET",
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
  openBoxChatStart: function (itemUser, params) {
    return {
      type: ActionTypes.OPEN_BOX_CHAT_START,
      itemUser,
      params,
    };
  },
  openBoxChatSuccess: function (success) {
    return {
      type: ActionTypes.OPEN_BOX_CHAT_SUCCESS,
      payload: success,
    };
  },
  openBoxChatError: function (error) {
    return {
      type: ActionTypes.OPEN_BOX_CHAT_ERROR,
      payload: error,
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
  getMyInboxSocket: function(payload){
    return {
      type: ActionTypes.GET_MY_INBOX_SOCKET,
      payload
    };
  },
  receiveBoxChatSocket: function(payload){
    return {
      type: ActionTypes.RECEIVE_BOX_CHAT_SOCKET,
      payload
    };
  },
  receiveReadRoom: function(myRead, idUserRead){
    return {
      type: ActionTypes.RECEIVE_READ_BOX_CHAT_SOCKET,
      myRead,
      idUserRead
    };
  }
};
