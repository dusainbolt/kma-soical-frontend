import { put, takeLatest } from "redux-saga/effects";
import { actions, ActionTypes } from "./actions";
import { postLoginAPI } from "../../services/UserRequest";

import { showNotifyRequest } from "../../utils";

function* postLogin(action) {
  try {
    const response = yield postLoginAPI(action.values);
    if (response.meta.code === 0) {
      yield put(actions.postLoginSuccess(response.data));
    } else {
      yield put(actions.postLoginError());
      yield showNotifyRequest(`msg_title_${response.meta.msg}`, `msg_content_${response.meta.msg}`);
    }
  } catch (e) {
    yield showNotifyRequest("msg_500_error", "msg_500_content");
  }
}

export function* watchLogin() {
  yield takeLatest(ActionTypes.POST_LOGIN_START, postLogin);
}
