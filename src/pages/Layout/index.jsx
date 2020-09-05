import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { browserHistory } from "../../utils/history";
import { Layout } from "antd";
import { useSelector, useDispatch } from "react-redux";
import CommonHeader from "../../components/Header";
import Sidebar from "../../components/SlideBar";
import "./index.scss";
import { actions } from "../Login/actions";

const { Header, Content, Sider } = Layout;

function App({ component: Mycomponent, classes, name, path, ...remainProps }) {
  const token = useSelector(state => state.loginReducer.token);
  const [collapsed, setCollapsed] = useState(true);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setCollapsed(!collapsed);
  };

  const onClickContent = () => {
    setCollapsed(true);
  };

  useEffect(() => {
    if (!token) {
      browserHistory.push("/welcome");
    }
  }, [token]);

  return (
    <Route
      {...remainProps}
      render={routeProps => {
        return (
          <Layout className="layout">
            <Header className="layout__header">
              <CommonHeader toggleMenu={toggleMenu} />
            </Header>
            <Layout className="site-layout">
              <Sider trigger={null} collapsible collapsed={collapsed}>
                <Sidebar />
              </Sider>
              <Content onClick={onClickContent} className="site-layout-background">
                <Mycomponent {...routeProps} />
              </Content>
            </Layout>
          </Layout>
        );
      }}
    />
  );
}

export default App;
