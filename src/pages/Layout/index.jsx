import React, { useState, useEffect, useCallback } from "react";
import { Route } from "react-router-dom";
import { browserHistory } from "../../utils/history";
import { Layout } from "antd";
import { useSelector, useDispatch } from "react-redux";
import CommonHeader from "../../components/Header";
import Sidebar from "../SlideBar";
import BoxChatCommon from "../SideBoxChat";
import SideListFriends from "../SideListFriends";
import { END_PC_PIXEL } from "../../common";
import { initSocket, logoutSocket, openBoxChatSocket, resetSocketNewFeed } from "../../utils/socket";
import { actions } from "./actions";
import api from "../../services/api";
import { useMemo } from "react";
import ModalCommon from "../../components/Modal";
const { Header, Content, Sider } = Layout;

function App({ component: Mycomponent, classes, name, path, ...remainProps }) {
  const token = useSelector(state => state.loginReducer.token);
  const openChatBox = useSelector(state => state.layoutReducer.openChatBox);
  const isMobile = useSelector(state => state.layoutReducer.isMobile);
  const listSubject = useSelector(state => state.layoutReducer.listSubject); 
  const isLoadingSubject = useSelector(state => state.layoutReducer.isLoadingSubject); 
  const userDetail = useSelector(state => state.loginReducer.userDetail);

  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setCollapsed(!collapsed);
  };

  const onLogoutUser = useCallback(() => {
    logoutSocket();
    dispatch(actions.postLogoutStart({ token }));
  }, []);

  useEffect(() => {
    if (!token) {
      browserHistory.push("/welcome");
    } else {
      api.setAuthRequest(token);
      if(!listSubject.length){
        dispatch(actions.getListSubjectStart());
      }
      resetSocketNewFeed(userDetail?.id);
      initSocket(dispatch, userDetail?.id);
    }
  }, [token]);

  useEffect(() => {
    // componentDidMount events
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => {
      // componentWillUnmount events
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const updateDimensions = () => {
    const isMobileCheck = window.innerWidth < END_PC_PIXEL;
    dispatch(actions.changeScreenPixel(isMobileCheck));
  };

  const openBoxChat = (itemUser, params) => {
    dispatch(actions.openBoxChatStart(itemUser, params));
    openBoxChatSocket(itemUser);
  };

  const closeBoxChat = () => {
    dispatch(actions.closeBoxChatStart());
  };

  const renderChatBoxTablet = useMemo(() => {
    return (
      isMobile &&
      openChatBox && (
        <ModalCommon
          visible={openChatBox}
          onCancel={closeBoxChat}
          content={<BoxChatCommon isMobile={isMobile} className="box-tablet" />}
        />
      )
    );
  }, [isMobile, openChatBox]);

  const renderChatBoxPC = useMemo(() => {
    return !isMobile && openChatBox && <BoxChatCommon isMobile={isMobile} />;
  }, [isMobile, openChatBox]);

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
              <Sider
                className="site-layout__side-left"
                trigger={null}
                collapsible
                collapsed={collapsed}>
                <Sidebar isLoadingSubject={isLoadingSubject} listSubject={listSubject} userDetail={userDetail}/>
              </Sider>
              <Content className="site-layout-background">
                <Mycomponent {...routeProps} />
              </Content>
              {!isMobile && (
                <Sider
                  className="site-layout__side-bg"
                  trigger={null}
                  collapsible
                  collapsed={collapsed}>
                  <div className="side-event">
                    <div className="side-event__notify"></div>
                    {openChatBox && (
                      <div className="side-event__top-dashboard side-event__mess-box">
                        {/* <BoxChatCommon isMobile={isMobile} /> */}
                        {renderChatBoxPC}
                      </div>
                    )}
                    {!openChatBox && <div className="side-event__top-dashboard"></div>}
                  </div>
                </Sider>
              )}
              <Sider
                className="site-layout__side-friends side-friends"
                trigger={null}
                collapsible
                collapsed={isMobile}>
                <SideListFriends callbackOpenBoxChat={openBoxChat} />
              </Sider>
              {renderChatBoxTablet}
            </Layout>
          </Layout>
        );
      }}
    />
  );
}

export default App;
