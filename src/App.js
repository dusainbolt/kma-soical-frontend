import React, { useEffect } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { browserHistory } from "./utils/history";
import LayoutAdmin from "./pages/Layout";
import LayoutAuth from "./pages/AuthCommon";
import { Routes, RoutesAuth } from "./Routes";
import AuthLoading from "./components/Loading/AuthenLoading";
import EventLoading from "./components/Loading/EventLoading";
import SimpleReactLightbox from "simple-react-lightbox";
import { actions } from "./pages/Login/actions";
import NotFound from "./pages/NotFound";
import "./App.css";
import "./sass/app.scss";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const layout = useSelector(state => state.layoutReducer);
  const token = useSelector(state => state.loginReducer.token);
  const dispatch = useDispatch();
  const renderLayout = (listRoutes, LayoutCommon) => {
    let html = null;
    html = listRoutes.map(route => {
      return (
        <LayoutCommon
          name={route.name}
          key={route.path}
          component={route.component}
          path={route.path}
          exact={route.exact}
        />
      );
    });
    return html;
  };

  useEffect(() => {
    if (token) {
      dispatch(actions.resetUserConfirmStart());
    }
  }, [token]);

  return (
    <div className="App">
      <SimpleReactLightbox>
        <AuthLoading isLoading={layout.isLoadingAuth} />
        <EventLoading isLoading={layout.isLoadingEvent} />
        <Router history={browserHistory}>
          <Switch>
            {renderLayout(Routes, LayoutAdmin)}
            {renderLayout(RoutesAuth, LayoutAuth)}
            <Route component={NotFound} />
          </Switch>
        </Router>
      </SimpleReactLightbox>
    </div>
  );
}

export default App;
