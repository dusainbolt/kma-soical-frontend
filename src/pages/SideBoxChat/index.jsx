import React from "react";
import BoxChat from "../../components/BoxChat";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "./actions";

function SidebarEvent({ openChatBox }) {
  const listChat = useSelector(state => state.sideEvent.listChat);
  const roomChat = useSelector(state => state.sideEvent.roomChat);
  const indexLoad = useSelector(state => state.sideEvent.indexLoad);
  const userInbox = useSelector(state => state.sideEvent.userInbox);
  const userId = useSelector(state => state.loginReducer.userDetail?.id);
  const myAvatar = useSelector(state => state.loginReducer.userDetail?.avatar);
  const isLoadingBoxChat = useSelector(state => state.sideEvent.isLoadingBoxChat);

  const dispatch = useDispatch();

  const sendMessage = values => {
    dispatch(actions.postMessageStart(values));
  };

  return (
    <div className="side-event">
      <div className="side-event__notify"></div>
      {openChatBox && (
        <div className="side-event__top-dashboard side-event__mess-box">
          <BoxChat
            userId={userId}
            userInbox={userInbox}
            indexLoad={indexLoad}
            listChat={listChat}
            roomChat={roomChat}
            myAvatar={myAvatar}
            isLoadingBoxChat={isLoadingBoxChat}
            callbackSendMessage={sendMessage}
          />
        </div>
      )}
      {!openChatBox && <div className="side-event__top-dashboard"></div>}
    </div>
  );
}

export default SidebarEvent;
