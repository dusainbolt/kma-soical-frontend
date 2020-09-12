export const ActionTypes = {
  GET_NEW_FEED_START: "GET_NEW_FEED_START",
  GET_NEW_FEED_SUCCESS: "GET_NEW_FEED_SUCCESS",
  GET_NEW_FEED_ERROR: "GET_NEW_FEED_ERROR",
};

export const actions = {
  getNewFeedStart: function (body) {
    return {
      type: ActionTypes.GET_NEW_FEED_START,
      body,
    };
  },
  getNewFeedSuccess: function (data) {
    return {
      type: ActionTypes.GET_NEW_FEED_SUCCESS,
      payload: data,
    };
  },
  getNewFeedError: function (error) {
    return {
      type: ActionTypes.GET_NEW_FEED_ERROR,
      payload: error,
    };
  },
};
