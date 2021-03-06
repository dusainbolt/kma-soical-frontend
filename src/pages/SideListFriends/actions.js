export const ActionTypes = {
  GET_LIST_FRIENDS_LOAD: "GET_LIST_FRIENDS_LOAD",
  GET_LIST_FRIENDS_START: "GET_LIST_FRIENDS_START",
  GET_LIST_FRIENDS_SUCCESS: "GET_LIST_FRIENDS_SUCCESS",
  GET_LIST_FRIENDS_ERROR: "GET_LIST_FRIENDS_ERROR",
  GET_LIST_ONLINE_SOCKET: "GET_LIST_ONLINE_SOCKET",
  GET_MY_INBOX_SOCKET: "GET_MY_INBOX_SOCKET",
  RECEIVE_BOX_CHAT_SOCKET: "RECEIVE_BOX_CHAT_SOCKET",
};

export const actions = {
  getListFriendsLoadStart: function () {
    return {
      type: ActionTypes.GET_LIST_FRIENDS_LOAD,
    };
  },
  getListFriendsStart: function (params) {
    return {
      type: ActionTypes.GET_LIST_FRIENDS_START,
      params,
    };
  },
  getListFriendsSuccess: function (success) {
    return {
      type: ActionTypes.GET_LIST_FRIENDS_SUCCESS,
      payload: success,
    };
  },
  getListFriendsError: function (error) {
    return {
      type: ActionTypes.GET_LIST_FRIENDS_ERROR,
      payload: error,
    };
  },
};
