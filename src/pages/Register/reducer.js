import { ActionTypes } from "./actions";

const DEFAULT_STATE = {
  loadingRegister: false,
  userNew: {},
  errorDuplicate: {
    email: false,
    userName: false,
    codeStudent: false,
  },
  loadingDuplicate: {
    email: false,
    userName: false,
    codeStudent: false,
  },
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ActionTypes.POST_REGISTER_START:
      return {
        ...state,
        loadingRegister: true,
      };
    case ActionTypes.POST_REGISTER_SUCCESS:
      return {
        ...state,
        userNew: action.payload.data,
        loadingRegister: false,
      };
    case ActionTypes.POST_REGISTER_ERROR:
      return {
        ...state,
        loadingRegister: false,
      };
    case ActionTypes.POST_REGISTER_CODE:
      return {
        ...state,
        userNew: action.payload,
      };
    case ActionTypes.GET_EMPTY_USER_START:
      return {
        ...state,
        loadingDuplicate: {
          ...state.loadingDuplicate,
          [action.params.type]: true,
        },
      };
    case ActionTypes.GET_EMPTY_USER_SUCCESS:
      return {
        ...state,
        loadingDuplicate: {
          ...state.loadingDuplicate,
          [action.payload]: false,
        },
        errorDuplicate: {
          ...state.errorDuplicate,
          [action.payload]: false,
        },
      };
    case ActionTypes.GET_EMPTY_USER_ERROR:
      return {
        ...state,
        loadingDuplicate: {
          ...state.loadingDuplicate,
          [action.payload]: false,
        },
        errorDuplicate: {
          ...state.errorDuplicate,
          [action.payload]: true,
        },
      };
    default:
      return state;
  }
};
