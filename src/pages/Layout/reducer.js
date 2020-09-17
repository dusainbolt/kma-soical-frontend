import { ActionTypes } from "./actions";

const DEFAULT_STATE = {
  isLoadingAuth: false,
  isLoadingEvent: false,
  isMobile: false,
  openChatBox: false,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
  case ActionTypes.SHOW_LOADING_AUTH:
    return {
      ...state,
      isLoadingAuth: true,
    };
  case ActionTypes.HIDE_LOADING_AUTH:
    return {
      ...state,
      isLoadingAuth: false,
    };
  case ActionTypes.SHOW_LOADING_EVENT:
    return {
      ...state,
      isLoadingEvent: true,
    };
  case ActionTypes.HIDE_LOADING_EVENT:
    return {
      ...state,
      isLoadingEvent: false,
    };
  case ActionTypes.CHANGE_SCREEN_PIXEL: 
    return {
      ...state,
      isMobile: action.conditionPixel
    }; 
  case ActionTypes.GET_LIST_CHAT_START: 
    return {
      ...state,
      openChatBox: true,
    };   
  default:
    return state;
  }
};
