import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { browserHistory } from "../../utils/history";
import { useSelector } from "react-redux";
import api from "../../services/api";
import {} from "../../utils/socket";

function App({ component: Mycomponent, classes, name, path, ...remainProps }) {
  const token = useSelector(state => state.loginReducer.token);

  useEffect(() => {
    if (token) {
      api.setAuthRequest(token);
      browserHistory.push("/");
    } else {
    }
  }, [token]);

  return (
    <Route
      {...remainProps}
      render={routeProps => {
        return !token && <Mycomponent {...routeProps} />;
      }}
    />
  );
}

export default App;
