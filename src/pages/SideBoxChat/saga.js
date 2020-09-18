import { put, takeLatest } from "redux-saga/effects";
import { actions, ActionTypes } from "./actions";
import { sendMessageAPI, openBoxChatAPI } from "../../services/UserRequest";

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

function* getListChat(action){
  try {
    const response = yield openBoxChatAPI(action.params);
    if (response.meta.code === 0) {
      yield put(actions.getListChatSuccess(response.data));
    }else{
      yield put(actions.getListChatError({}));
    }
  } catch (e) {
    yield put(actions.getListChatError(e));
  }
}

export function* watchRoomChat() {
  yield takeLatest(ActionTypes.POST_MESSAGE_START, postMessage);
  yield takeLatest(ActionTypes.GET_LIST_CHAT_START, getListChat);
}
