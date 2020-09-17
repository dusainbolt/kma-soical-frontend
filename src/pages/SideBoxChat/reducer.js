import { ActionTypes } from "./actions";
import { ActionTypes as SocketType } from "../Layout/actions";
const DEFAULT_STATE = {
  listChat: [],
  userInbox: {},
  indexLoad:  0,
  roomChat: {},
  
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
  case ActionTypes.GET_MESSAGE_SOCKET: 
    return{
      ...state,
      indexLoad: action.payload.indexLoad,
      listChat: state.listChat.concat(action.payload),
    };
  case SocketType.GET_LIST_ONLINE_SOCKET:
    return{
      ...state,
      userInbox: {
        ...state.userInbox,
        isOnline: action.payload.indexOf(state.userInbox.userId) !== -1 ? true : false,
      },
    };  
  case ActionTypes.OPEN_BOX_CHAT_START:
    return{
      ...state,
      isLoadingBoxChat: true,
      listChat: state.userInbox?.userId === action.itemUser.userId  ? state.listChat : [],
      userInbox: action.itemUser
    };   
  case ActionTypes.OPEN_BOX_CHAT_SUCCESS:
    return {
      ...state,
      isLoadingBoxChat: false,
      listChat: action.payload.listChat,
      roomChat: action.payload.roomChat
    }; 
  default:
    return state;
  }
};
