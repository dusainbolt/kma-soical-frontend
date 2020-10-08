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
  OPEN_COMMENT_BOX_START: "OPEN_COMMENT_BOX_START",
  OPEN_COMMENT_BOX_SUCCESS: "OPEN_COMMENT_BOX_SUCCESS",
  OPEN_COMMENT_BOX_ERROR: "OPEN_COMMENT_BOX_ERROR",
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
  openCommentBoxStart: function (postId) {
    return {
      type: ActionTypes.OPEN_COMMENT_BOX_START,
      postId,
    };
  },
  openCommentBoxSuccess: function (success) {
    return {
      type: ActionTypes.OPEN_COMMENT_BOX_SUCCESS,
      payload: success,
    };
  },
  openCommentBoxError: function (error) {
    return {
      type: ActionTypes.OPEN_COMMENT_BOX_ERROR,
      payload: error,
    };
  },
};
