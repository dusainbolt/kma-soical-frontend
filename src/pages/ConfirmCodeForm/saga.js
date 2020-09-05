import { put, takeLatest } from "redux-saga/effects";
import { actions, ActionTypes } from "./actions";
import { postConfirmCodeAPI } from "../../services/UserRequest";
import { showNotifyRequest } from "../../utils";

function* postConfirmCode(action) {
  try {
    const response = yield postConfirmCodeAPI(action.body);
    if (response.meta.code === 0) {
      yield put(actions.postConfirmCodeSuccess(response.data));
    } else {
      yield put(actions.postConfirmCodeError({}));
    }
  } catch (e) {
    yield showNotifyRequest("msg_500_error", "msg_500_content");
  }
}

export function* watchConfirmCode() {
  yield takeLatest(ActionTypes.POST_CONFIRM_CODE_START, postConfirmCode);
}
