import { ActionTypes } from "./actions";

const DEFAULT_STATE = {
  listNewFeed: [],
  isLoadingNewFeed: false,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ActionTypes.GET_NEW_FEED_START:
      return {
        ...state,
        isLoadingNewFeed: true,
      };
    case ActionTypes.GET_NEW_FEED_SUCCESS:
      return {
        ...state,
        listNewFeed: action.payload,
        isLoadingNewFeed: false,
      };
    case ActionTypes.GET_NEW_FEED_ERROR:
      return {
        ...state,
        isLoadingNewFeed: false,
      };
    default:
      return state;
  }
};
