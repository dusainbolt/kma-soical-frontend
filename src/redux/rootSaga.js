import { all } from "redux-saga/effects";

import { watchLogin } from "../pages/Login/saga";

function* rootSaga() {
  yield all([
    watchLogin(),
  ]);
}
export default rootSaga;
