import { ActionTypes } from "./actions";

const DEFAULT_STATE = {
  userConfirm: {},
  typeConfirm: "",
  isLoading: false,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
  case ActionTypes.POST_CONFIRM_CODE_START:
    return {
      ...state,
      isLoading: true,
      typeConfirm: action.body.type,
    };
  case ActionTypes.POST_CONFIRM_CODE_SUCCESS:
    return {
      ...state,
      userConfirm: action.payload,
      isLoading: false,
    };
  case ActionTypes.POST_CONFIRM_CODE_ERROR:
    return {
      ...state,
      isLoading: false,
    };
  default:
    return state;
  }
};
