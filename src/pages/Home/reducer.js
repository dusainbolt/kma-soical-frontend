import { ActionTypes } from "./actions";

const DEFAULT_STATE = {
  listNewFeed: [],
  isLoadingNewFeed: false,
  isLoadingAddNewFeed: false,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ActionTypes.GET_NEW_FEED_START:
      return {
        ...state,
        listNewFeed: [],
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
    case ActionTypes.POST_ADD_NEW_FEED_START:
      return {
        ...state,
        isLoadingAddNewFeed: true,
      };
    case ActionTypes.POST_ADD_NEW_FEED_SUCCESS:
      return {
        ...state,
        listNewFeed: action.payload.concat(state.listNewFeed),
        isLoadingAddNewFeed: false,
      };
    case ActionTypes.POST_ADD_NEW_FEED_ERROR:
      return {
        ...state,
        isLoadingAddNewFeed: false,
      };
    default:
      return state;
  }
};
