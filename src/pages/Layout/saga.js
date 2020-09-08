import { put, takeLatest } from "redux-saga/effects";
import { actions, ActionTypes } from "./actions";
import { postLogoutAPI } from "../../services/UserRequest";

import { showNotifyRequest } from "../../utils";

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

export function* watchLayout() {
  yield takeLatest(ActionTypes.POST_LOGOUT_START, postLogout);
}
