import { ActionTypes } from "./actions";
import { ActionTypes as SocketType } from "../Layout/actions";
import { resetBoxChatSocket } from "../../utils/socket";
import { convertArrayZeroCondition } from "../../utils";

const DEFAULT_STATE = {
  listChat: [],
  userInbox: {},
  indexLoad:  0,
  roomChat: {},
  exact: 0,
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
    if(!(state.userInbox?.userId === action.itemUser.userId && state.roomChat?.id )){
      resetBoxChatSocket(state.roomChat.id);
    }
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
      listChat: action.payload.listChat.reverse(),
      roomChat: action.payload.roomChat,
      exact: action.payload.exact,
    }; 
  case ActionTypes.GET_LIST_CHAT_START:
    return {
      ...state,
      isLoadingBoxChat: true,
    };
  case ActionTypes.GET_LIST_CHAT_SUCCESS:
    return {
      ...state,
      listChat: action.payload.listChat.reverse().concat(state.listChat),
      isLoadingBoxChat: false,
      exact: action.payload.exact,
    }; 
  case ActionTypes.RECEIVE_READ_BOX_CHAT_SOCKET:
    return {
      ...state,
      listChat: convertArrayZeroCondition(action.myRead ? state.userInbox?.userId : action.idUserRead , state.listChat, "userId", "indexLoad")
    };  
  default:
    return state;
  }
};
