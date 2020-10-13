import { delay, put, takeLatest } from "redux-saga/effects";
import { actions, ActionTypes } from "./actions";
import {
  postLogoutAPI,
  openBoxChatAPI,
  getListSubjectAPI,
  getListHistorySearchAPI,
  postSearchTopAPI,
} from "../../services/UserRequest";

function* postLogout(action) {
  yield put(actions.showLoadingAuth());
  try {
    const response = yield postLogoutAPI(action.body);
    if (response.meta.code === 0) {
      yield put(actions.postLogoutSuccess());
      yield window.location.reload();
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

function* getListHistorySearch() {
  try {
    const response = yield getListHistorySearchAPI();
    if (response.meta.code === 0) {
      yield put(actions.getListHistorySearchSuccess(response.data));
    } else {
      yield put(actions.getListHistorySearchError());
    }
  } catch (e) {
    yield put(actions.getListHistorySearchError());
  }
}

function* postSearchTop(action) {
  try {
    const response = yield postSearchTopAPI(action.body);
    if (response.meta.code === 0) {
      yield put(actions.postSearchTopSuccess(response.data));
    } else {
      yield put(actions.postSearchTopError());
    }
  } catch (e) {
    yield put(actions.postSearchTopError(e));
  }
}

export function* watchLayout() {
  yield takeLatest(ActionTypes.OPEN_BOX_CHAT_START, openBoxChat);
  yield takeLatest(ActionTypes.POST_LOGOUT_START, postLogout);
  yield takeLatest(ActionTypes.GET_LIST_HISTORY_SEARCH_START, getListHistorySearch);
  yield takeLatest(ActionTypes.GET_LIST_SUBJECT_START, getListSubject);
  yield takeLatest(ActionTypes.POST_SEARCH_TOP_START, postSearchTop);
}
