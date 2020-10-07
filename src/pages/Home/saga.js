import { put, takeLatest } from "redux-saga/effects";
import { actions, ActionTypes } from "./actions";
import { getListNewFeedAPI, postAddNewFeedAPI, putHandleLikeFeedAPI  } from "../../services/NewsRequest";

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

export function* watchNewFeed() {
  yield takeLatest(ActionTypes.GET_NEW_FEED_START, getListNewFeed);
  yield takeLatest(ActionTypes.POST_ADD_NEW_FEED_START, postAddNewFeed);
  yield takeLatest(ActionTypes.PUT_LIKE_FEED_START, putLikeFeed);


}
