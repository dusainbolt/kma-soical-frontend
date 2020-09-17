import { put, takeLatest } from "redux-saga/effects";
import { actions, ActionTypes } from "./actions";
import { postLogoutAPI, openBoxChatAPI } from "../../services/UserRequest";

function* postLogout(action) {
  yield put(actions.showLoadingAuth());
  try {
    const response = yield postLogoutAPI(action.body);
    if (response.meta.code === 0) {
      yield put(actions.postLogoutSuccess());
      yield put(actions.hideLoadingAuth());
    } else {
      yield put(actions.postLogoutError());
      yield put(actions.hideLoadingAuth());
    }
  } catch (e) {
    yield put(actions.postLogoutError());
    yield put(actions.hideLoadingAuth());
  }
}

function* openBoxChat(action) {
  try {
    const params = { ...action.params, userId: action.itemUser.userId };
    const response = yield openBoxChatAPI(params);
    if (response.meta.code === 0) {
      yield put(actions.openBoxChatSuccess(response.data));
    } else {
      yield put(actions.openBoxChatError());
    }
  } catch (e) {
    yield put(actions.openBoxChatError());
  }
}

export function* watchLayout() {
  yield takeLatest(ActionTypes.OPEN_BOX_CHAT_START, openBoxChat);
  yield takeLatest(ActionTypes.POST_LOGOUT_START, postLogout);
}
