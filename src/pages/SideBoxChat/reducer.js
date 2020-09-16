import { ActionTypes } from "./actions";

const DEFAULT_STATE = {
  listChat: [
    {
      avatarUrl: null,
      content: "ABCCCCC",
      type: null,
      userId: 1,
      createAt: 1600134710,
      isRead: null,
    },
    {
      avatarUrl: null,
      content: "ABC 2",
      type: null,
      userId: 1,
      createAt: 1600134710,
      isRead: null,
    },
    {
      avatarUrl: null,
      content: "ABCCsssssssssssssssssssssCCC",
      type: null,
      userId: 1,
      createAt: 1600134710,
      isRead: null,
    },
    {
      avatarUrl: null,
      content: "Hello KMA-social, my name is Du. I'm verry happy for your app",
      type: null,
      userId: 1,
      createAt: 1600134710,
      isRead: null,
    },
    {
      avatarUrl: null,
      content: "Hello KMA-social, my name is Du. I'm verry happy for your app",
      type: null,
      userId: 2,
      createAt: 1600134710,
      isRead: null,
    },
    {
      avatarUrl: null,
      content: "ABC2",
      type: null,
      userId: 2,
      createAt: 1600134710,
      isRead: null,
    },
    {
      avatarUrl: null,
      content: "ABCCCCC",
      type: null,
      userId: 1,
      createAt: 1600134710,
      isRead: 1,
    },
    {
      avatarUrl: null,
      content: "ABC 2s ssssssssssssssssssssssssssssssssss",
      userId: 1,
      createAt: 1600134710,
      isRead: 1,
    },

  ],
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
