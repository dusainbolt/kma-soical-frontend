import React, { useState, useEffect, useCallback } from "react";
import { Route } from "react-router-dom";
import { browserHistory } from "../../utils/history";
import { Layout } from "antd";
import { useSelector, useDispatch } from "react-redux";
import CommonHeader from "../../components/Header";
import Sidebar from "../../components/SlideBar";
import SideBarEvent from "../../components/SideBarEvent";
import SideBarMessage from "../../components/SideBarMessage";

import "./index.scss";
import { actions } from "./actions";
import api from "../../services/api";

const { Header, Content, Sider } = Layout;

function App({ component: Mycomponent, classes, name, path, ...remainProps }) {
  const token = useSelector(state => state.loginReducer.token);
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setCollapsed(!collapsed);
  };

  const onLogoutUser = useCallback(()=>{
    dispatch(actions.postLogoutStart({ token }));
  },[]);

  useEffect(() => {
    if (!token) {
      browserHistory.push("/welcome");
    }else{
      api.setAuthRequest(token);
    }
  }, [token]);

  return (
    <Route
      {...remainProps}
      render={routeProps => {
        return (
          <Layout className="layout">
            <Header className="layout__header">
              <CommonHeader callbackLogout={onLogoutUser} toggleMenu={toggleMenu} />
            </Header>
            <Layout className="site-layout">
              <Sider trigger={null} collapsible collapsed={collapsed}>
                <Sidebar />
              </Sider>
              <Content className="site-layout-background">
                <Mycomponent {...routeProps} />
              </Content>
              <Sider className="layout__side-bg" trigger={null} collapsible collapsed={collapsed}>
                <SideBarEvent />
              </Sider>
              <Sider trigger={null} collapsible collapsed={collapsed}>
                <SideBarMessage />
              </Sider>
            </Layout>
          </Layout>
        );
      }}
    />
  );
}

export default App;
