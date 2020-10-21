import { put, takeLatest } from "redux-saga/effects";
import { actions, ActionTypes } from "./actions";
import {
  getListNewFeedAPI,
  postAddNewFeedAPI,
  putHandleLikeFeedAPI,
  getListCommentAPI,
  postAddCommentAPI,
  getDetailDashboardAPI,
  getUserDetailAPI,
  getFriendsDetailAPI,
  postChangeAvatarAPI,
} from "../../services/NewsRequest";

function* getListNewFeed(action) {
  try {
    const response = yield getListNewFeedAPI(action.params);
    if (response.meta.code === 0) {
      yield put(actions.getNewFeedSuccess(response.data));
    } else {
      yield put(actions.getNewFeedError());
    }
  } catch (e) {
    yield put(actions.getNewFeedError());
  }
}

function* postAddNewFeed(action) {
  try {
    const response = yield postAddNewFeedAPI(action.body);
    if (response.meta.code === 0) {
      yield put(actions.postAddNewFeedSuccess([response.data]));
    } else {
      yield put(actions.postAddNewFeedError());
    }
  } catch (e) {
    yield put(actions.postAddNewFeedError());
  }
}

function* putLikeFeed(action) {
  try {
    const response = yield putHandleLikeFeedAPI(action.body);
    if (response.meta.code === 0) {
      yield put(actions.putLikeFeedSuccess(response.data));
    } else {
      yield put(actions.putLikeFeedError());
    }
  } catch (e) {
    yield put(actions.putLikeFeedError());
  }
}

function* getListCommentPost(action) {
  try {
    const { postId } = action;
    const response = yield getListCommentAPI({ postId });
    if (response.meta.code === 0) {
      yield put(actions.getListCommentSuccess(response.data, postId));
    } else {
      yield put(actions.getListCommentError());
    }
  } catch (e) {
    yield put(actions.getListCommentError());
  }
}

function* postAddComment(action) {
  try {
    const response = yield postAddCommentAPI(action.body);
    if (response.meta.code === 0) {
      return;
    } else {
      yield put(actions.postAddNewCommentError());
    }
  } catch (e) {
    yield put(actions.postAddNewCommentError());
  }
}

function* getDetailDashBoard(action) {
  try {
    const response = yield getDetailDashboardAPI(action.params);
    if (response.meta.code === 0) {
      yield put(actions.getUserDashBoardSuccess(response.data));
    } else {
      yield put(actions.getUserDashBoardError());
    }
  } catch (e) {
    yield put(actions.getUserDashBoardError());
  }
}

function* getUserDetail(action) {
  try {
    const response = yield getUserDetailAPI(action.params);
    if (response.meta.code === 0) {
      yield put(actions.getUserDetailSuccess(response.data));
    } else {
      yield put(actions.getUserDetailError());
    }
  } catch (e) {
    yield put(actions.getUserDetailError());
  }
}

function* getFriendsDetail(action) {
  try {
    const response = yield getFriendsDetailAPI(action.params);
    if (response.meta.code === 0) {
      yield put(actions.getFriendsDetailSuccess(response.data));
    } else {
      yield put(actions.getFriendsDetailError());
    }
  } catch (e) {
    yield put(actions.getFriendsDetailError());
  }
}

function* postChangeAvatar(action) {
  try {
    const response = yield postChangeAvatarAPI(action.body);
    if (response.meta.code === 0) {
      yield put(actions.postChangeAvatarSuccess(response.data));
    } else {
      yield put(actions.postChangeAvatarError());
    }
  } catch (e) {
    yield put(actions.postChangeAvatarError());
  }
}

export function* watchNewFeed() {
  yield takeLatest(ActionTypes.GET_NEW_FEED_START, getListNewFeed);
  yield takeLatest(ActionTypes.POST_ADD_NEW_FEED_START, postAddNewFeed);
  yield takeLatest(ActionTypes.PUT_LIKE_FEED_START, putLikeFeed);
  yield takeLatest(ActionTypes.GET_LIST_COMMENT_START, getListCommentPost);
  yield takeLatest(ActionTypes.POST_ADD_NEW_COMMENT_START, postAddComment);
  yield takeLatest(ActionTypes.GET_USER_DASHBOARD_START, getDetailDashBoard);
  yield takeLatest(ActionTypes.GET_USER_DETAIL_START, getUserDetail);
  yield takeLatest(ActionTypes.POST_CHANGE_AVATAR_START, postChangeAvatar);
  yield takeLatest(ActionTypes.GET_FRIENDS_DETAIL_START, getFriendsDetail);
}
