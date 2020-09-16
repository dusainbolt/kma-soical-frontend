export const ActionTypes = {
  GET_LIST_FRIENDS_START: "GET_LIST_FRIENDS_START",
  GET_LIST_FRIENDS_SUCCESS: "GET_LIST_FRIENDS_SUCCESS",
  GET_LIST_FRIENDS_ERROR: "GET_LIST_FRIENDS_ERROR",
};

export const actions = {
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