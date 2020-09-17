import React from "react";
import BoxChat from "../../components/BoxChat";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "./actions";

function SidebarEvent({ openChatBox }) {
  const listChat = useSelector(state => state.sideEvent.listChat);
  const idChatBox = useSelector(state => state.sideEvent.idChatBox);
  const indexLoad  = useSelector(state => state.sideEvent.indexLoad);
  const userInbox  = useSelector(state => state.sideEvent.userInbox);
  const dispatch = useDispatch();
  
  const sendMessage = values => {
    dispatch(actions.postMessageStart(values));
  };

  return (
    <div className="side-event">
      <div className="side-event__notify">
      </div>
      {openChatBox && 
        <div className="side-event__top-dashboard side-event__mess-box">
          <BoxChat userInbox={userInbox} indexLoad={indexLoad} listChat={listChat} idBoxChat={idChatBox} callbackSendMessage={sendMessage}/>
        </div>
      }
      {!openChatBox && 
        <div className="side-event__top-dashboard">

        </div>
      }
    </div>
  );
}

export default SidebarEvent;
