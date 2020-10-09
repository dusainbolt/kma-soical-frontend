import { convertObjectItem } from "../../utils";
import { ActionTypes } from "./actions";
import { ActionTypes as ActionSocket } from "../Layout/actions";

const DEFAULT_STATE = {
  listNewFeed: [],
  isLoadingNewFeed: false,
  isLoadingAddNewFeed: false,
  isLoadingLike: {},
  indexLoadComment: {},
  isLoadingCommentBox: {},
  listComment: {},
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ActionTypes.GET_NEW_FEED_START:
      return {
        ...state,
        listNewFeed: [],
        isLoadingNewFeed: true,
      };
    case ActionTypes.GET_NEW_FEED_SUCCESS:
      return {
        ...state,
        listNewFeed: action.payload,
        isLoadingNewFeed: false,
      };
    case ActionTypes.GET_NEW_FEED_ERROR:
      return {
        ...state,
        isLoadingNewFeed: false,
      };
    case ActionTypes.GET_LIST_COMMENT_START:
      return {
        ...state,
        listComment: {
          ...state.listComment,
          [action.postId]: state.listComment?.[action.postId]
            ? state.listComment[action.postId]
            : [],
        },
        isLoadingCommentBox: { ...state.isLoadingCommentBox, [action.postId]: true },
      };
    case ActionTypes.GET_LIST_COMMENT_SUCCESS:
      return {
        ...state,
        isLoadingCommentBox: { ...state.isLoadingCommentBox, [action.postId]: false },
        listComment: {
          ...state.listComment,
          [action.postId]: action.payload.concat(state.listComment[action.postId]),
        },
      };
    case ActionTypes.POST_ADD_NEW_FEED_START:
      return {
        ...state,
        isLoadingAddNewFeed: true,
      };
    case ActionTypes.POST_ADD_NEW_FEED_SUCCESS:
      return {
        ...state,
        listNewFeed: action.payload.concat(state.listNewFeed),
        isLoadingAddNewFeed: false,
      };
    case ActionTypes.POST_ADD_NEW_FEED_ERROR:
      return {
        ...state,
        isLoadingAddNewFeed: false,
      };
    case ActionTypes.PUT_LIKE_FEED_START:
      return {
        ...state,
        isLoadingLike: { ...state.isLoadingLike, [action.body.postId]: true },
      };
    case ActionTypes.PUT_LIKE_FEED_SUCCESS:
      return {
        ...state,
        listNewFeed: convertObjectItem(state.listNewFeed, action.payload),
        isLoadingLike: { ...state.isLoadingLike, [action.payload.id]: false },
      };
    case ActionSocket.RECEIVE_DATA_BOX_COMMENT_SOCKET:
      return {
        ...state,
        indexLoadComment: {
          ...state.indexLoadComment,
          [action.payload.postId]: action.payload.key,
        },
        listComment: {
          ...state.listComment,
          [action.payload.postId]: state.listComment[action.payload.postId].concat([
            action.payload,
          ]),
        },
      };
    // case ActionTypes.ADD_NEW_COMMENT_ERROR:
    //   return {
    //     ...state,
    //     isLoadingNewFeed: false,
    //   };
    default:
      return state;
  }
};
