import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { browserHistory } from "../../utils/history";
import { Layout } from "antd";
import { connect, useSelector, useDispatch } from "react-redux";
import CommonHeader from "../../components/Header";
import Sidebar from "../../components/SlideBar";
import "./index.scss";
import { actions } from "../Login/actions";

const { Header, Content, Sider } = Layout;

function App({ component: Mycomponent, classes, name, path, ...remainProps }) {
  const token = useSelector(state => state.loginReducer.auth?.token);
  // const [collapsed, setCollapsed] = useState(true);
  // const dispatch = useDispatch();

  // const toggleMenu = () => {
  //   setCollapsed(!collapsed);
  // };

  // const onClickContent = () => {
  //   setCollapsed(true);
  // };

  // useEffect(() => {
  //   if (token) {
  //     dispatch(actions.postAuthAdminStart(token));
  //   } else {
  //     browserHistory.push("/login");
  //   }
  // }, []);

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
