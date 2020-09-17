import { ActionTypes } from "./actions";
import { ActionTypes as SocketType } from "../Layout/actions";
const DEFAULT_STATE = {
  listChat: [],
  userInbox: {},
  indexLoad:  0,
  idChatBox: 0,
  
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
  case ActionTypes.GET_MESSAGE_SOCKET: 
    return{
      ...state,
      indexLoad: action.payload.indexLoad,
      listChat: state.listChat.concat(action.payload),
    };
  case ActionTypes.GET_LIST_CHAT_START:
    return{
      ...state,
      userInbox: action.itemUser
    };
  case SocketType.GET_LIST_ONLINE_SOCKET:
    return{
      ...state,
      userInbox: {
        ...state.userInbox,
        isOnline: action.payload.indexOf(state.userInbox.userId) !== -1 ? true : false,
      },
    };   
  default:
    return state;
  }
};
