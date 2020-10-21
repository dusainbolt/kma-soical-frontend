import { ActionTypes } from "./actions";
import { ActionTypes as ActionHeader } from "../Layout/actions";
import { TYPE_UPLOAD } from "../../common";
const DEFAULT_STATE = {
  token: "",
  userDetail: {},
  isLoadingLogin: false,
  errorLogin: "",
  isLoadingAvatar: false,
  isLoadingCoverImage: false,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ActionTypes.POST_LOGIN_START: {
      return {
        ...state,
        isLoadingLogin: true,
      };
    }
    case ActionTypes.POST_LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userDetail: action.payload.userInfo,
        isLoadingLogin: false,
      };
    case ActionTypes.POST_LOGIN_ERROR:
      return {
        ...state,
        isLoadingLogin: false,
        errorLogin: action.payload,
      };
    case ActionHeader.POST_LOGOUT_SUCCESS:
      return {
        ...state,
        token: "",
        userDetail: {},
      };
    case ActionTypes.RESET_USER_CONFIRM_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userDetail: action.payload.userInfo,
      };
    case ActionTypes.POST_CHANGE_IMAGE_INFO_START:
      return {
        ...state,
        isLoadingAvatar: action.typeUpload === TYPE_UPLOAD.AVATAR ? true : false,
        isLoadingCoverImage: action.typeUpload === TYPE_UPLOAD.COVER ? true : false,
      };
    case ActionTypes.POST_CHANGE_IMAGE_INFO_SUCCESS:
      return {
        ...state,
        userDetail: action.payload,
        isLoadingAvatar: false,
        isLoadingCoverImage: false,
      };

    default:
      return state;
  }
};
