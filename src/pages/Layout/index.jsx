import React, { useState, useEffect, useCallback } from "react";
import { Route } from "react-router-dom";
import { browserHistory } from "../../utils/history";
import { Layout } from "antd";
import { useSelector, useDispatch } from "react-redux";
import CommonHeader from "../../components/Header";
import Sidebar from "../SlideBar";
import SideBarEvent from "../SideBarEvent";
import SideBarMessage from "../../components/SideBarMessage";
import { END_MOBILE_PIXEL } from "../../common";
import "./index.scss";
import { initSocket } from "../../utils/socket";
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

  useEffect(() => {
    // componentDidMount events
    initSocket(dispatch);
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => {
      // componentWillUnmount events
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const updateDimensions = () => {
    const isMobileCheck = window.innerWidth < END_MOBILE_PIXEL;
    dispatch(actions.changeScreenPixel(isMobileCheck));
  };
  
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
              <Sider className="site-layout__side-left" trigger={null} collapsible collapsed={collapsed}>
                <Sidebar />
              </Sider>
              <Content className="site-layout-background">
                <Mycomponent {...routeProps} />
              </Content>
              <Sider className="site-layout__side-bg" trigger={null} collapsible collapsed={collapsed}>
                <SideBarEvent />
              </Sider>
              <Sider  className="site-layout__side-mess side-mess" trigger={null} collapsible collapsed={collapsed}>
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
