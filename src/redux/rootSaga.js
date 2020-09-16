import { all } from "redux-saga/effects";

import { watchLogin } from "../pages/Login/saga";
import { watchRegister } from "../pages/Register/saga";
import { watchConfirmCode } from "../pages/ConfirmCodeForm/saga";
import { watchLayout } from "../pages/Layout/saga";
import { watchNewFeed } from "../pages/Home/saga";
import { watchListFriends } from "../pages/SideListFriends/saga";

function* rootSaga() {
  yield all([
    watchLogin(),
    watchRegister(),
    watchConfirmCode(),
    watchLayout(),
    watchNewFeed(),
    watchListFriends(),
  ]);
}
export default rootSaga;
