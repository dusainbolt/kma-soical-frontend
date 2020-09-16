import { put, takeLatest } from "redux-saga/effects";
import { actions, ActionTypes } from "./actions";
import { getListFriendsAPI } from "../../services/UserRequest";

function* getListFriends(action) {
  try {
    const response = yield getListFriendsAPI(action.body);
    if (response.meta.code === 0) {
      yield put(actions.getListFriendsSuccess(response.data));
    } else {
      yield put(actions.getListFriendsError({}));
    }
  } catch (e) {
    yield put(actions.getListFriendsError(e));
  }
}

export function* watchListFriends() {
  yield takeLatest(ActionTypes.GET_LIST_FRIENDS_START, getListFriends);
}
