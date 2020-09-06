import { put, takeLatest, delay, takeEvery } from "redux-saga/effects";
import { actions, ActionTypes } from "./actions";
import { postRegisterAPI, getEmptyUserAPI } from "../../services/UserRequest";

import { showNotifyRequest, getUrlRedirectEmail } from "../../utils";

function* register(action) {
  try {
    const response = yield postRegisterAPI(action.body);
    if (response.meta.code === 0) {
      yield put(actions.postRegisterSuccess(response));
      yield showNotifyRequest(
        "msg_register_title",
        "msg_register_content",
        getUrlRedirectEmail(response.data.email)
      );
    } else {
      yield put(actions.postRegisterError({}));
      yield showNotifyRequest("msg_500_error", "msg_500_content");
    }
  } catch (e) {
    yield put(actions.postRegisterError(e));
    yield showNotifyRequest("msg_500_error", "msg_500_content");
  }
}

function* getEmptyUser(action) {
  try {
    const response = yield getEmptyUserAPI(action.params);
    if (response.meta.code === 0) {
      yield put(actions.getEmptyUserSuccess(response.meta.msg));
    } else {
      yield put(actions.getEmptyUserError(response.meta.msg));
    }
  } catch (e) {
    yield showNotifyRequest("msg_500_error", "msg_500_content");
  }
}

export function* watchRegister() {
  yield takeLatest(ActionTypes.POST_REGISTER_START, register);
  yield takeEvery(ActionTypes.GET_EMPTY_USER_START, getEmptyUser);
}
