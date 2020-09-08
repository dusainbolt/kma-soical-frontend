import { put, takeLatest } from "redux-saga/effects";
import { actions, ActionTypes } from "./actions";
import { postLoginAPI } from "../../services/UserRequest";
import { VALUE_STATUS } from "../../common";
import { showNotifyRequest } from "../../utils";
import { browserHistory } from "../../utils/history";
import { actions as actionRegister } from "../Register/actions";

function* postLogin(action) {
  try {
    const response = yield postLoginAPI(action.values);
    if (response.meta.code === 0) {
      const userInfo = response.data.userInfo;
      if (userInfo.status === VALUE_STATUS[1]) {
        yield put(actionRegister.postRegisterCode(userInfo));
        yield put(actions.postLoginError());
        yield browserHistory.push("/register");
      } else {
        yield put(actions.postLoginSuccess(response.data));
      }
    } else {
      yield put(actions.postLoginError());
    }
  } catch (e) {
    yield put(actions.postLoginError());
  }
}

export function* watchLogin() {
  yield takeLatest(ActionTypes.POST_LOGIN_START, postLogin);
}
