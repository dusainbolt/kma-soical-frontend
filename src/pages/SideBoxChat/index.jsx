import React from "react";
import BoxChat from "../../components/BoxChat";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "./actions";

function BoxChatContainer({ className, isMobile, closeBoxChat }) {
  const listChat = useSelector(state => state.boxChat.listChat);
  const roomChat = useSelector(state => state.boxChat.roomChat);
  const indexLoad = useSelector(state => state.boxChat.indexLoad);
  const userInbox = useSelector(state => state.boxChat.userInbox);
  const exact = useSelector(state => state.boxChat.exact);
  const userId = useSelector(state => state.loginReducer.userDetail?.id);
  const myAvatar = useSelector(state => state.loginReducer.userDetail?.avatar);
  const isLoadingBoxChat = useSelector(state => state.boxChat.isLoadingBoxChat);

  const dispatch = useDispatch();

  const sendMessage = values => {
    dispatch(actions.postMessageStart(values));
  };

  const getMessage = params => {
    dispatch(actions.getListChatStart(params));
  };

  const resetSettingReducer = () => {
    dispatch(actions.resetSettingBoxChatStart());
  };

  return (
    <BoxChat
      userId={userId}
      userInbox={userInbox}
      indexLoad={indexLoad}
      listChat={listChat}
      roomChat={roomChat}
      closeBoxChat={closeBoxChat}
      myAvatar={myAvatar}
      className={className}
      isLoadingBoxChat={isLoadingBoxChat}
      callbackSendMessage={sendMessage}
      exact={exact}
      isMobile={isMobile}
      callBackResetSettingReducer={resetSettingReducer}
      callbackGetListMessage={getMessage}
    />
  );
}

export default BoxChatContainer;
