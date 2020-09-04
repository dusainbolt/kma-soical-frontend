import { all } from "redux-saga/effects";

import { watchLogin } from "../pages/Login/saga";
import { watchRegister } from "../pages/Register/saga";


function* rootSaga() {
  yield all([
    watchLogin(),
    watchRegister(),
  ]);
}
export default rootSaga;
