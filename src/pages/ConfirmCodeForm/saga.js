import { put, takeLatest } from "redux-saga/effects";
import { actions, ActionTypes } from "./actions";
import { postConfirmCodeAPI } from "../../services/UserRequest";

function* postConfirmCode(action) {
  try {
    const response = yield postConfirmCodeAPI(action.body);
    if (response.meta.code === 0) {
      yield put(actions.postConfirmCodeSuccess(response.data));
    } else {
      yield put(actions.postConfirmCodeError());
    }
  } catch (e) {
    yield put(actions.postConfirmCodeError());
  }
}

export function* watchConfirmCode() {
  yield takeLatest(ActionTypes.POST_CONFIRM_CODE_START, postConfirmCode);
}
