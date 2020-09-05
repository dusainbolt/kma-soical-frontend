import { all } from "redux-saga/effects";

import { watchLogin } from "../pages/Login/saga";
import { watchRegister } from "../pages/Register/saga";
import { watchConfirmCode } from "../pages/ConfirmCodeForm/saga";


function* rootSaga() {
  yield all([
    watchLogin(),
    watchRegister(),
    watchConfirmCode(),
  ]);
}
export default rootSaga;
