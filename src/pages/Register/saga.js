import { put, takeLatest, takeEvery } from "redux-saga/effects";
import { actions, ActionTypes } from "./actions";
import { postRegisterAPI, getEmptyUserAPI } from "../../services/UserRequest";
import { showNotifyRequest, getUrlRedirectEmail } from "../../utils";
import { KEY_NOTIFY } from "../../common";

function* register(action) {
  try {
    const response = yield postRegisterAPI(action.body);
    if (response.meta.code === 0) {
      yield put(actions.postRegisterSuccess(response));
      yield showNotifyRequest(
        KEY_NOTIFY.REGISTER_TITLE,
        KEY_NOTIFY.REGISTER_CONTENT,
        getUrlRedirectEmail(response.data.email)
      );
    } else {
      yield put(actions.postRegisterError({}));
    }
  } catch (e) {
    yield put(actions.postRegisterError(e));
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
    yield put(actions.getEmptyUserError());
  }
}

export function* watchRegister() {
  yield takeLatest(ActionTypes.POST_REGISTER_START, register);
  yield takeEvery(ActionTypes.GET_EMPTY_USER_START, getEmptyUser);
}
