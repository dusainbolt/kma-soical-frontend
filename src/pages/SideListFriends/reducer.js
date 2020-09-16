import { ActionTypes } from "./actions";

const DEFAULT_STATE = {
  listFriends: [],
  loadingListUser: false,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
  case ActionTypes.GET_LIST_FRIENDS_START:
    return {
      ...state,
      loadingListUser: true,
    };
  case ActionTypes.GET_LIST_FRIENDS_SUCCESS:
    return {
      ...state,
      listFriends: action.payload,
      loadingListUser: false
    };
  case ActionTypes.GET_LIST_FRIENDS_ERROR:
    return {
      ...state,
      loadingListUser: false
    };    
  default:
    return state;
  }
};
