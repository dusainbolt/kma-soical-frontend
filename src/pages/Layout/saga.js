import { put, takeLatest } from "redux-saga/effects";
import { actions, ActionTypes } from "./actions";
import { postLogoutAPI } from "../../services/UserRequest";

import { showNotifyRequest } from "../../utils";

function* postLogout(action) {
  try {
    const response = yield postLogoutAPI(action.body);
    yield console.log("----------------->", response);
    if (response.meta.code === 0) {
      yield put(actions.postLogoutSuccess());
    } else {
      yield put(actions.postLogoutError());
    }
  } catch (e) {
    yield put(actions.postLogoutError());
    yield showNotifyRequest("msg_500_error", "msg_500_content");
  }
}

export function* watchLayout() {
  yield takeLatest(ActionTypes.POST_LOGOUT_START, postLogout);
}
