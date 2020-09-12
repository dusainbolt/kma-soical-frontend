import { combineReducers } from "redux";

import loginReducer from "../pages/Login/reducer";
import registerReducer from "../pages/Register/reducer";
import layoutReducer from "../pages/Layout/reducer";
import confirmReducer from "../pages/ConfirmCodeForm/reducer";
import newFeedReducer from "../pages/Home/reducer";

export default combineReducers({
  loginReducer,
  layoutReducer,
  registerReducer,
  confirmReducer,
  newFeedReducer,
});
