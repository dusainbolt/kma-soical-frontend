import { ActionTypes } from "./actions";
import {
  convertListFriendMessage,
  convertObjectCondition,
  convertArrayZeroCondition,
} from "../../utils";

const DEFAULT_STATE = {
  listFriends: [],
  listOnline: [],
  loadingListUser: false,
  idUserShowMess: null,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ActionTypes.GET_LIST_FRIENDS_START:
    case ActionTypes.GET_LIST_FRIENDS_LOAD:
      return {
        ...state,
        loadingListUser: true,
      };
    case ActionTypes.GET_LIST_FRIENDS_SUCCESS:
      return {
        ...state,
        listFriends: convertObjectCondition(action.payload, state.listOnline, "userId", "isOnline"),
        loadingListUser: false,
      };
    case ActionTypes.GET_LIST_FRIENDS_ERROR:
      return {
        ...state,
        loadingListUser: false,
      };
    case ActionTypes.GET_LIST_ONLINE_SOCKET:
      return {
        ...state,
        listOnline: [...new Set(action.payload)],
        listFriends: convertObjectCondition(
          state.listFriends,
          action.payload,
          "userId",
          "isOnline"
        ),
      };
    case ActionTypes.GET_MY_INBOX_SOCKET:
      return {
        ...state,
        listFriends: convertListFriendMessage(state.listFriends, action.payload),
        idUserShowMess: action.payload.userId,
      };
    case ActionTypes.RECEIVE_BOX_CHAT_SOCKET:
      return {
        ...state,
        idUserShowMess: null,
        listFriends: convertArrayZeroCondition(
          action.payload.userId,
          state.listFriends,
          "userId",
          "countMessage"
        ),
      };
    default:
      return state;
  }
};
