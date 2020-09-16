import { put, takeLatest, takeEvery } from "redux-saga/effects";
import { actions, ActionTypes } from "./actions";
import { sendMessageAPI } from "../../services/UserRequest";
import { showNotifyRequest, getUrlRedirectEmail } from "../../utils";
import { KEY_NOTIFY } from "../../common";

function* postMessage(action) {
  try {
    const response = yield sendMessageAPI(action.body);
    if (response.meta.code === 0) {
      yield put(actions.postRegisterSuccess(response));
      yield showNotifyRequest(KEY_NOTIFY.REGISTER_TITLE, KEY_NOTIFY.REGISTER_CONTENT, getUrlRedirectEmail(response.data.email));
    } else {
      yield put(actions.postRegisterError({}));
    }
  } catch (e) {
    yield put(actions.postRegisterError(e));
  }
}

export function* watchRegister() {
  yield takeLatest(ActionTypes.POST_MESSAGE_START, postMessage);
}
