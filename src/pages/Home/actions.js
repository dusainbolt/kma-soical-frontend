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
      postId
    };
  },
  getListCommentError: function (error) {
    return {
      type: ActionTypes.GET_LIST_COMMENT_ERROR,
      payload: error,
    };
  },
};
