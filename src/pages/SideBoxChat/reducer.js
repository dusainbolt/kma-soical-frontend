import { ActionTypes } from "./actions";

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
  default:
    return state;
  }
};
