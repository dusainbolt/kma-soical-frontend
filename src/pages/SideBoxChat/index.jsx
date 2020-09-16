import React from "react";
import BoxChat from "../../components/BoxChat";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "./actions";

function SidebarEvent() {
  const listChat = useSelector(state => state.sideEvent.listChat);
  const idChatBox = useSelector(state => state.sideEvent.idChatBox);
  const indexLoad  = useSelector(state => state.sideEvent.indexLoad);
  const dispatch = useDispatch();
  const sendMessage = values => {
    dispatch(actions.postMessageStart(values));
  };

  return (
    <div className="side-event">
      <div className="side-event__notify"></div>
      <div className="side-event__top-dashboard side-event__mess-box">
        <BoxChat indexLoad={indexLoad} listChat={listChat} idBoxChat={idChatBox} callbackSendMessage={sendMessage}/>
      </div>
    </div>
  );
}

export default SidebarEvent;
