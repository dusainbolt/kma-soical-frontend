import { combineReducers } from "redux";

import loginReducer from "../pages/Login/reducer";
import registerReducer from "../pages/Register/reducer";
import layoutReducer from "../pages/Layout/reducer";
import confirmReducer from "../pages/ConfirmCodeForm/reducer";
import newFeedReducer from "../pages/Home/reducer";
import sideEvent from "../pages/SideBoxChat/reducer";
import sideBarMessage from "../pages/SideListFriends/reducer";

export default combineReducers({
  loginReducer,
  layoutReducer,
  registerReducer,
  confirmReducer,
  newFeedReducer,
  sideEvent,
  sideBarMessage,
});
