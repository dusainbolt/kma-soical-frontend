import { put, takeLatest } from "redux-saga/effects";
import { actions, ActionTypes } from "./actions";
import { postLogoutAPI, openBoxChatAPI, getListSubjectAPI } from "../../services/UserRequest";

function* postLogout(action) {
  yield put(actions.showLoadingAuth());
  try {
    const response = yield postLogoutAPI(action.body);
    if (response.meta.code === 0) {
      yield put(actions.postLogoutSuccess());
      yield put(actions.hideLoadingAuth());
      // yield window.location.reload();
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

function* getListSubject() {
  try {
    const response = yield getListSubjectAPI();
    if (response.meta.code === 0) {
      yield put(actions.getListSubjectSuccess(response.data));
    } else {
      yield put(actions.getListSubjectError());
    }
  } catch (e) {
    yield put(actions.getListSubjectError());
  }
}

export function* watchLayout() {
  yield takeLatest(ActionTypes.OPEN_BOX_CHAT_START, openBoxChat);
  yield takeLatest(ActionTypes.POST_LOGOUT_START, postLogout);
  yield takeLatest(ActionTypes.GET_LIST_SUBJECT_START, getListSubject);
}
