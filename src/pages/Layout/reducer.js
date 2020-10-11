import { actions, ActionTypes } from "./actions";

const DEFAULT_STATE = {
  isLoadingAuth: false,
  isLoadingEvent: false,
  isMobile: 0,
  openChatBox: false,
  listSubject: [],
  listUserSearch: [],
  listGroupsSubjectSearch: [],
  listHistorySearch: [],
  isLoadingSearch: false,
  isLoadingSubject: false,
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
        isMobile: action.conditionPixel,
      };
    case ActionTypes.OPEN_BOX_CHAT_START:
      return {
        ...state,
        openChatBox: true,
      };
    case ActionTypes.GET_LIST_HISTORY_SEARCH_START:
      return {
        ...state,
        isLoadingSearch: true,
      };
    case ActionTypes.GET_LIST_HISTORY_SEARCH_SUCCESS:
      return {
        ...state,
        isLoadingSearch: false,
        listHistorySearch: action.payload.split(",").reverse(),
      };
    case ActionTypes.GET_LIST_HISTORY_SEARCH_ERROR:
      return {
        ...state,
        isLoadingSearch: false,
      };
    case ActionTypes.GET_LIST_SUBJECT_START:
      return {
        ...state,
        isLoadingSubject: true,
      };
    case ActionTypes.GET_LIST_SUBJECT_SUCCESS:
      return {
        ...state,
        isLoadingSubject: false,
        listSubject: action.payload,
      };
    case ActionTypes.GET_LIST_SUBJECT_ERROR:
      return {
        ...state,
        isLoadingSubject: false,
      };
    case ActionTypes.CLOSE_BOX_CHAT_START:
      return {
        ...state,
        openChatBox: false,
      };
    default:
      return state;
  }
};
