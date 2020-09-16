import React from "react";
import { Menu } from "antd";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import BoxChat from "../../components/BoxChat";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "./actions";

function SidebarEvent() {
  const listChat = useSelector(state => state.sideEvent.listChat);
  const idChatBox = useSelector(state => state.sideEvent.listChat);
  const dispatch = useDispatch();
  const sendMessage = values => {
    dispatch(actions.postMessageStart(values));
  };

  return (
    // <Menu mode="inline" theme="light" className="layout-page-sider-menu">
    //   {renderMenu()}
    // </Menu>
    <div className="side-event">
      <div className="side-event__notify"></div>
      <div className="side-event__top-dashboard side-event__mess-box">
        {/* <div>Dashboard</div> */}
        <BoxChat listChat={listChat} idBoxChat={idChatBox} callbackSendMessage={sendMessage}/>
      </div>
    </div>
  );
}

export default SidebarEvent;
