import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { browserHistory } from "../../utils/history";
import { useSelector } from "react-redux";

function App({ component: Mycomponent, classes, name, path, ...remainProps }) {
  const token = useSelector(state => state.loginReducer.token);

  useEffect(() => {
    if (token) {
      browserHistory.push("/");
    }
  }, [token]);

  return (  
    <Route
      {...remainProps}
      render={routeProps => {
        return <Mycomponent {...routeProps} />;
      }}
    />
  );
}

export default App;
