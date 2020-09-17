import { ActionTypes } from "./actions";
import { convertObjectCondition } from "../../utils";

const DEFAULT_STATE = {
  listFriends: [],
  listOnline: [],
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
      listFriends: convertObjectCondition(action.payload, state.listOnline, "userId", "isOnline"),
      loadingListUser: false
    };
  case ActionTypes.GET_LIST_FRIENDS_ERROR:
    return {
      ...state,
      loadingListUser: false
    };    
  case ActionTypes.GET_LIST_ONLINE_SOCKET: 
    return {
      ...state,
      listOnline: action.payload,
      listFriends: convertObjectCondition(state.listFriends, action.payload, "userId", "isOnline"),
    };  
  default:
    return state;
  }
};
