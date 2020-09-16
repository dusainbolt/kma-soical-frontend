import { ActionTypes } from "./actions";

const DEFAULT_STATE = {
  listChat: [],
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
  default:
    return state;
  }
};
