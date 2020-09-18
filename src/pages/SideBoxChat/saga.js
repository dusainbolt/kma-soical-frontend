import { put, takeLatest, takeEvery } from "redux-saga/effects";
import { actions, ActionTypes } from "./actions";
import { sendMessageAPI } from "../../services/UserRequest";
import { showNotifyRequest, getUrlRedirectEmail } from "../../utils";
import { KEY_NOTIFY } from "../../common";

function* postMessage(action) {
  try {
    const response = yield sendMessageAPI(action.body);
    if (response.meta.code !== 0) {
      yield put(actions.postMessageError({}));
    }
  } catch (e) {
    yield put(actions.postMessageError(e));
  }
}

export function* watchRoomChat() {
  yield takeLatest(ActionTypes.POST_MESSAGE_START, postMessage);
}
