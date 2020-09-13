import { delay, put, takeLatest } from "redux-saga/effects";
import { actions, ActionTypes } from "./actions";
import { getListNewFeedAPI } from "../../services/NewsRequest";

function* getListNewFeed(action) {
  try {
    const response = yield getListNewFeedAPI(action.body);
    if (response.meta.code === 0) {
      yield put(actions.getNewFeedSuccess(response.data));
    } else {
      yield put(actions.getNewFeedError());
    }
  } catch (e) {
    yield put(actions.getNewFeedError());
  }
}

export function* watchNewFeed() {
  yield takeLatest(ActionTypes.GET_NEW_FEED_START, getListNewFeed);
}
