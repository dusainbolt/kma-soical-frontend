export const ActionTypes = {
  GET_NEW_FEED_START: "GET_NEW_FEED_START",
  GET_NEW_FEED_SUCCESS: "GET_NEW_FEED_SUCCESS",
  GET_NEW_FEED_ERROR: "GET_NEW_FEED_ERROR",
  POST_ADD_NEW_FEED_START: "POST_ADD_NEW_FEED_START",
  POST_ADD_NEW_FEED_SUCCESS: "POST_ADD_NEW_FEED_SUCCESS",
  POST_ADD_NEW_FEED_ERROR: "POST_ADD_NEW_FEED_ERROR",
  PUT_LIKE_FEED_START: "PUT_LIKE_FEED_START",
  PUT_LIKE_FEED_SUCCESS: "PUT_LIKE_FEED_SUCCESS",
  PUT_LIKE_FEED_ERROR: "PUT_LIKE_FEED_ERROR",
  GET_LIST_COMMENT_START: "GET_LIST_COMMENT_START",
  GET_LIST_COMMENT_SUCCESS: "GET_LIST_COMMENT_SUCCESS",
  GET_LIST_COMMENT_ERROR: "GET_LIST_COMMENT_ERROR",
  POST_ADD_NEW_COMMENT_START: "POST_ADD_NEW_COMMENT_START",
  POST_ADD_NEW_COMMENT_SUCCESS: "POST_ADD_NEW_COMMENT_SUCCESS",
  POST_ADD_NEW_COMMENT_ERROR: "POST_ADD_NEW_COMMENT_ERROR",
  GET_USER_DASHBOARD_START: "GET_USER_DASHBOARD_START",
  GET_USER_DASHBOARD_SUCCESS: "GET_USER_DASHBOARD_SUCCESS",
  GET_USER_DASHBOARD_ERROR: "GET_USER_DASHBOARD_ERROR",
  GET_FRIENDS_DETAIL_START: "GET_FRIENDS_DETAIL_START",
  GET_FRIENDS_DETAIL_SUCCESS: "GET_FRIENDS_DETAIL_SUCCESS",
  GET_FRIENDS_DETAIL_ERROR: "GET_FRIENDS_DETAIL_ERROR",
  GET_USER_DETAIL_START: "GET_USER_DETAIL_START",
  GET_USER_DETAIL_SUCCESS: "GET_USER_DETAIL_SUCCESS",
  GET_USER_DETAIL_ERROR: "GET_USER_DETAIL_ERROR",
  POST_CHANGE_AVATAR_START: "POST_CHANGE_AVATAR_START",
  POST_CHANGE_AVATAR_SUCCESS: "POST_CHANGE_AVATAR_SUCCESS",
  POST_CHANGE_AVATAR_ERROR: "POST_CHANGE_AVATAR_ERROR",
};

export const actions = {
  getNewFeedStart: function (params) {
    return {
      type: ActionTypes.GET_NEW_FEED_START,
      params,
    };
  },
  getNewFeedSuccess: function (success) {
    return {
      type: ActionTypes.GET_NEW_FEED_SUCCESS,
      payload: success,
    };
  },
  getNewFeedError: function (error) {
    return {
      type: ActionTypes.GET_NEW_FEED_ERROR,
      payload: error,
    };
  },
  postAddNewFeedStart: function (body) {
    return {
      type: ActionTypes.POST_ADD_NEW_FEED_START,
      body,
    };
  },
  postAddNewFeedSuccess: function (success) {
    return {
      type: ActionTypes.POST_ADD_NEW_FEED_SUCCESS,
      payload: success,
    };
  },
  postAddNewFeedError: function (error) {
    return {
      type: ActionTypes.POST_ADD_NEW_FEED_ERROR,
      payload: error,
    };
  },
  putLikeFeedStart: function (body) {
    return {
      type: ActionTypes.PUT_LIKE_FEED_START,
      body,
    };
  },
  putLikeFeedSuccess: function (success) {
    return {
      type: ActionTypes.PUT_LIKE_FEED_SUCCESS,
      payload: success,
    };
  },
  putLikeFeedError: function (error) {
    return {
      type: ActionTypes.PUT_LIKE_FEED_ERROR,
      payload: error,
    };
  },
  getListCommentStart: function (postId) {
    return {
      type: ActionTypes.GET_LIST_COMMENT_START,
      postId,
    };
  },
  getListCommentSuccess: function (success, postId) {
    return {
      type: ActionTypes.GET_LIST_COMMENT_SUCCESS,
      payload: success,
      postId,
    };
  },
  getListCommentError: function (error) {
    return {
      type: ActionTypes.GET_LIST_COMMENT_ERROR,
      payload: error,
    };
  },
  postAddNewCommentStart: function (body) {
    return {
      type: ActionTypes.POST_ADD_NEW_COMMENT_START,
      body,
    };
  },
  postAddNewCommentSuccess: function (body) {
    return {
      type: ActionTypes.POST_ADD_NEW_COMMENT_SUCCESS,
      body,
    };
  },
  postAddNewCommentError: function (body) {
    return {
      type: ActionTypes.POST_ADD_NEW_COMMENT_ERROR,
      body,
    };
  },
  getUserDashBoardStart: function (params) {
    return {
      type: ActionTypes.GET_USER_DASHBOARD_START,
      params,
    };
  },
  getUserDashBoardSuccess: function (success) {
    return {
      type: ActionTypes.GET_USER_DASHBOARD_SUCCESS,
      payload: success,
    };
  },
  getUserDashBoardError: function (error) {
    return {
      type: ActionTypes.GET_USER_DASHBOARD_ERROR,
      error,
    };
  },
  getUserDetailStart: function (params) {
    return {
      type: ActionTypes.GET_USER_DETAIL_START,
      params,
    };
  },
  getUserDetailSuccess: function (success) {
    return {
      type: ActionTypes.GET_USER_DETAIL_SUCCESS,
      payload: success,
    };
  },
  getUserDetailError: function (error) {
    return {
      type: ActionTypes.GET_USER_DETAIL_ERROR,
      error,
    };
  },
  getFriendsDetailStart: function (params) {
    return {
      type: ActionTypes.GET_FRIENDS_DETAIL_START,
      params,
    };
  },
  getFriendsDetailSuccess: function (success) {
    return {
      type: ActionTypes.GET_FRIENDS_DETAIL_SUCCESS,
      payload: success,
    };
  },
  getFriendsDetailError: function (error) {
    return {
      type: ActionTypes.GET_FRIENDS_DETAIL_ERROR,
      error,
    };
  },
  postChangeAvatarStart: function (body) {
    return {
      type: ActionTypes.POST_CHANGE_AVATAR_START,
      body,
    };
  },
  postChangeAvatarSuccess: function (success) {
    return {
      type: ActionTypes.POST_CHANGE_AVATAR_SUCCESS,
      payload: success,
    };
  },
  postChangeAvatarError: function (error) {
    return {
      type: ActionTypes.POST_CHANGE_AVATAR_ERROR,
      error,
    };
  },
};
