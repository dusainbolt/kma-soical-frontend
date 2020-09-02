import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./i18n/i18n";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { persistor, store, sagaMiddleware } from "./redux/configStore";
import { PersistGate } from "redux-persist/es/integration/react";
import { Provider } from "react-redux";
import api from "./services/api";
import rootSaga from "./redux/rootSaga";
import "antd/dist/antd.css";

const onBeforeLift = store => () => {
  const { loginReducer } = store.getState();
  api.setAuthRequest(loginReducer.userDetail?.token);
};

ReactDOM.render(
  <Provider store={store}>
    <PersistGate onBeforeLift={onBeforeLift(store)} loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
sagaMiddleware.run(rootSaga);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
