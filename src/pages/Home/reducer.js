import { convertFeedWhenAddComment, convertObjectItem } from "../../utils";
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
  const { payload, type, body, postId } = action;
  const { listNewFeed, isLoadingLike, indexLoadComment, isLoadingCommentBox, listComment } = state;
  switch (type) {
    case ActionTypes.GET_NEW_FEED_START:
      return {
        ...state,
        listNewFeed: [],
        isLoadingNewFeed: true,
      };
    case ActionTypes.GET_NEW_FEED_SUCCESS:
      return {
        ...state,
        listNewFeed: payload,
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
          ...listComment,
          [postId]: listComment?.[postId] ? listComment[postId] : [],
        },
        isLoadingCommentBox: { ...isLoadingCommentBox, [postId]: true },
      };
    case ActionTypes.GET_LIST_COMMENT_SUCCESS:
      return {
        ...state,
        isLoadingCommentBox: { ...isLoadingCommentBox, [postId]: false },
        listComment: {
          ...listComment,
          [postId]: payload.reverse().concat(listComment[postId]),
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
        listNewFeed: payload.concat(listNewFeed),
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
        isLoadingLike: { ...isLoadingLike, [body.postId]: true },
      };
    case ActionTypes.PUT_LIKE_FEED_SUCCESS:
      return {
        ...state,
        listNewFeed: convertObjectItem(listNewFeed, payload),
        isLoadingLike: { ...isLoadingLike, [payload.id]: false },
      };
    case ActionSocket.RECEIVE_DATA_BOX_COMMENT_SOCKET:
      return {
        ...state,
        indexLoadComment: {
          ...indexLoadComment,
          [payload.postId]: payload.key,
        },
        listComment: {
          ...listComment,
          [payload.postId]: listComment[payload.postId].concat([payload]),
        },
        listNewFeed: convertFeedWhenAddComment(
          listNewFeed,
          payload.postId,
          payload.countLikePost,
          payload.countCommentPost
        ),
      };
    default:
      return state;
  }
};
