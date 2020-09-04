import { put, takeLatest } from "redux-saga/effects";
import { actions, ActionTypes } from "./actions";
import {
  postRegisterAPI,
  getEmptyUserAPI
} from "../../services/UserRequest";

import { showNotifyRequest } from "../../utils";
import { TYPE_ANT } from "../../common";


function* register(action) {
  try {
    const response = yield postRegisterAPI(action.body);
    if (response.meta.code === 0) {
      yield put(actions.postRegisterSuccess(response));
    } else {
      yield put(actions.postRegisterError({}));
      yield showNotifyRequest(TYPE_ANT.ERROR, "msg_500_error", "msg_500_content");
    }
  } catch (e) {
    yield put(actions.postRegisterError(e));
    yield showNotifyRequest(TYPE_ANT.ERROR, "msg_500_error", "msg_500_content");
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
    yield showNotifyRequest(TYPE_ANT.ERROR, "msg_500_error", "msg_500_content");
  }
}

export function* watchRegister() {
  yield takeLatest(ActionTypes.POST_REGISTER_START, register);
  yield takeLatest(ActionTypes.GET_EMPTY_USER_START, getEmptyUser);
}
