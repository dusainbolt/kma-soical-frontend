import React, { useState, useEffect, useCallback } from "react";
import { Route } from "react-router-dom";
import { browserHistory } from "../../utils/history";
import { Layout } from "antd";
import { useSelector, useDispatch } from "react-redux";
import CommonHeader from "../../components/Header";
import Sidebar from "../SlideBar";
import SideBarEvent from "../SideBoxChat";
import SideListFriends from "../SideListFriends";
import { END_MOBILE_PIXEL } from "../../common";
import { initSocket, logoutSocket } from "../../utils/socket";
import { actions } from "./actions";
import api from "../../services/api";

const { Header, Content, Sider } = Layout;

function App({ component: Mycomponent, classes, name, path, ...remainProps }) {
  const token = useSelector(state => state.loginReducer.token);
  const userId = useSelector(state => state.loginReducer.userDetail?.id);
  const openChatBox = useSelector(state => state.layoutReducer.openChatBox);

  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setCollapsed(!collapsed);
  };

  const onLogoutUser = useCallback(()=>{
    logoutSocket();
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
    initSocket(dispatch, userId);
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

  const openBoxChat = (itemUser, params) => {
    dispatch(actions.openBoxChatStart(itemUser, params));
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
                <SideBarEvent openChatBox={openChatBox}/>
              </Sider>
              <Sider  className="site-layout__side-friends side-friends" trigger={null} collapsible collapsed={collapsed}>
                <SideListFriends callbackOpenBoxChat={openBoxChat} />
              </Sider>
            </Layout>
          </Layout>
        );
      }}
    />
  );
}

export default App;
