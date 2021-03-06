export const ActionTypes = {
  SHOW_LOADING_AUTH: "SHOW_LOADING_AUTH",
  HIDE_LOADING_AUTH: "HIDE_LOADING_AUTH",
  SHOW_LOADING_EVENT: "SHOW_LOADING_EVENT",
  HIDE_LOADING_EVENT: "HIDE_LOADING_EVENT",
  POST_LOGOUT_START: "POST_LOGOUT_START",
  POST_LOGOUT_SUCCESS: "POST_LOGOUT_SUCCESS",
  POST_LOGOUT_ERROR: "POST_LOGOUT_ERROR",
  GET_LIST_SUBJECT_START: "GET_LIST_SUBJECT_START",
  GET_LIST_SUBJECT_SUCCESS: "GET_LIST_SUBJECT_SUCCESS",
  GET_LIST_SUBJECT_ERROR: "GET_LIST_SUBJECT_ERROR",
  GET_LIST_HISTORY_SEARCH_START: "GET_LIST_HISTORY_SEARCH_START",
  GET_LIST_HISTORY_SEARCH_SUCCESS: "GET_LIST_HISTORY_SEARCH_SUCCESS",
  GET_LIST_HISTORY_SEARCH_ERROR: "GET_LIST_HISTORY_SEARCH_ERROR",
  OPEN_BOX_CHAT_START: "OPEN_BOX_CHAT_START",
  OPEN_BOX_CHAT_SUCCESS: "OPEN_BOX_CHAT_SUCCESS",
  OPEN_BOX_CHAT_ERROR: "OPEN_BOX_CHAT_ERROR",
  CLOSE_BOX_CHAT_START: "CLOSE_BOX_CHAT_START",
  CHANGE_SCREEN_PIXEL: "CHANGE_SCREEN_PIXEL",
  GET_MESSAGE_SOCKET: "GET_MESSAGE_SOCKET",
  GET_LIST_ONLINE_SOCKET: "GET_LIST_ONLINE_SOCKET",
  GET_MY_INBOX_SOCKET: "GET_MY_INBOX_SOCKET",
  POST_SEARCH_TOP_START: "POST_SEARCH_TOP_START",
  POST_SEARCH_TOP_SUCCESS: "POST_SEARCH_TOP_SUCCESS",
  POST_SEARCH_TOP_ERROR: "POST_SEARCH_TOP_ERROR",
  RECEIVE_BOX_CHAT_SOCKET: "RECEIVE_BOX_CHAT_SOCKET",
  RECEIVE_READ_BOX_CHAT_SOCKET: "RECEIVE_READ_BOX_CHAT_SOCKET",
  RECEIVE_DATA_BOX_COMMENT_SOCKET: "RECEIVE_DATA_BOX_COMMENT_SOCKET",
};

export const actions = {
  showLoadingAuth: function () {
    return {
      type: ActionTypes.SHOW_LOADING_AUTH,
    };
  },
  hideLoadingAuth: function () {
    return {
      type: ActionTypes.HIDE_LOADING_AUTH,
    };
  },
  showLoadingEvent: function () {
    return {
      type: ActionTypes.SHOW_LOADING_EVENT,
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
      body,
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
  postSearchTopStart: function (body) {
    return {
      type: ActionTypes.POST_SEARCH_TOP_START,
      body,
    };
  },
  postSearchTopSuccess: function (success) {
    return {
      type: ActionTypes.POST_SEARCH_TOP_SUCCESS,
      payload: success,
    };
  },
  postSearchTopError: function (error) {
    return {
      type: ActionTypes.POST_SEARCH_TOP_ERROR,
      payload: error,
    };
  },
  getListHistorySearchStart: function (params) {
    return {
      type: ActionTypes.GET_LIST_HISTORY_SEARCH_START,
      params,
    };
  },
  getListHistorySearchSuccess: function (success) {
    return {
      type: ActionTypes.GET_LIST_HISTORY_SEARCH_SUCCESS,
      payload: success,
    };
  },
  getListHistorySearchError: function (error) {
    return {
      type: ActionTypes.GET_LIST_HISTORY_SEARCH_ERROR,
      payload: error,
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
  },
  getListSubjectStart: function () {
    return {
      type: ActionTypes.GET_LIST_SUBJECT_START,
    };
  },
  getListSubjectSuccess: function (success) {
    return {
      type: ActionTypes.GET_LIST_SUBJECT_SUCCESS,
      payload: success,
    };
  },
  getListSubjectError: function (error) {
    return {
      type: ActionTypes.GET_LIST_SUBJECT_ERROR,
      payload: error,
    };
  },
  closeBoxChatStart: function () {
    return {
      type: ActionTypes.CLOSE_BOX_CHAT_START,
    };
  },
};

export const actionsSocket = {
  getMessageSocket: function (payload) {
    return {
      type: ActionTypes.GET_MESSAGE_SOCKET,
      payload,
    };
  },
  getListOnlineSocket: function (payload) {
    return {
      type: ActionTypes.GET_LIST_ONLINE_SOCKET,
      payload,
    };
  },
  getMyInboxSocket: function (payload) {
    return {
      type: ActionTypes.GET_MY_INBOX_SOCKET,
      payload,
    };
  },
  receiveBoxChatSocket: function (payload) {
    return {
      type: ActionTypes.RECEIVE_BOX_CHAT_SOCKET,
      payload,
    };
  },
  receiveReadRoom: function (myRead, idUserRead) {
    return {
      type: ActionTypes.RECEIVE_READ_BOX_CHAT_SOCKET,
      myRead,
      idUserRead,
    };
  },
  receiveDataBoxComment: function (payload) {
    return {
      type: ActionTypes.RECEIVE_DATA_BOX_COMMENT_SOCKET,
      payload,
    };
  },
};
