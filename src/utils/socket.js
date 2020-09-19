import io from "socket.io-client";
import { CHANEL } from "./chanelSocket";
import { actionsSocket as actions } from "../pages/Layout/actions";
import { convertObjectToArray } from "../utils";
let socket = null;
let dispatch = null;
let idRoomChat = null;
let userId = null;
function initSocket(dispatchVal, myUserId) {
  socket = io(CHANEL.API_URL);
  socket.on("connect", () => {
    console.log("---->>>>>>>>>>>> CONNECT SOCKET <<<<<<<<<--------");
    dispatch = dispatchVal;
    userId= myUserId;
    speakOnline();
    getListOnline();
    getMyInbox();
    baseSocket();
    receiveBoxChat();
  });
  connectSocketError();
}

function connectSocketError() {
  socket.on("connect_error", res => {
    console.log("!!!!!!!!!!!!!! SOCKET ERROR !!!!!!!!!!!!!", res);
  });
}

function getMessage(roomId) {
  idRoomChat = roomId;
  socket.on(`${CHANEL.ROOM_CHAT}${roomId}`, res => {
    console.log("----->messageRoomChat", res);
    dispatch(actions.getMessageSocket(res.data));
  });
}

function openBoxChatSocket(userInbox){
  console.log("-------------->openBoxChat: ", userInbox);
  socket.emit(`${CHANEL.OPEN_MY_BOX_CHAT}`, userInbox, userId);
}

function receiveBoxChat(){
  socket.on(`${CHANEL.RECEIVE_BOX_CHAT}${userId}`, res => {
    console.log("----->receiveBoxChat: ", res);
    // dispatch(actions.getMessageSocket(res.data));
  });
}

function resetBoxChatSocket() {
  console.log("-------------------->resetBoxChat", idRoomChat);
  socket.off(`${CHANEL.ROOM_CHAT}${idRoomChat}`);
  socket.off(`${CHANEL.RECEIVE_TYPING_CHAT}${idRoomChat}`);
}

function getListOnline() {
  socket.on(CHANEL.LIST_ONLINE, res => {
    console.log("----->listOnline", res);
    dispatch(actions.getListOnlineSocket(convertObjectToArray(res)));
  });
}

function getMyInbox() {
  socket.on(`${CHANEL.MY_INBOX}${userId}`, res => {
    console.log("----->getMyInbox", res);
    if(res.roomId !== idRoomChat){
      dispatch(actions.getMyInboxSocket(res));
    }
  });
}

function logoutSocket() {
  console.log("----->Logout socket", socket.id);
  socket.emit(CHANEL.LOG_OUT, socket.id);
  socket.disconnect();

}

function speakOnline() {
  console.log("----->Speak User Id", userId);
  socket.emit(CHANEL.SPEAK_USER_ID, userId);
}

function onTypingChat() {
  console.log("------------->Typing chat: ", idRoomChat, userId);
  socket.emit(CHANEL.SEND_TYPING_CHAT, { userId, idRoomChat });
}

function receiverTypingChat(callbackShowTypingChat) {
  socket.on(`${CHANEL.RECEIVE_TYPING_CHAT}${idRoomChat}`, res => {
    console.log("----->getTyping", res);
    callbackShowTypingChat(res);
  });
}

function baseSocket() {

  socket.on("disconnect", reason => {
    console.log("----------------_DISCONNECT", reason);
    if (reason === "io server disconnect") {
      // the disconnection was initiated by the server, you need to reconnect manually
      socket.connect();
    }
    // else the socket will automatically try to reconnect
  });
  socket.on("reconnect", attemptNumber => {
    console.log("----------------reconnect", attemptNumber);
    // ...
  });
  socket.on("reconnecting", attemptNumber => {
    console.log("----------------reconnecting", attemptNumber);
  });
  socket.on("reconnect_error", error => {
    console.log("----------------reconnect_error", error);
  });
  socket.on("reconnect_failed", () => {
    console.log("----------------reconnect_fail");
  });
  socket.on("connect_error", error => {
    console.log("----------------connect_error", error);
  });
  socket.on("connect_timeout", timeout => {
    console.log("----------------time_out", timeout);
  });
  socket.on("error", error => {
    console.log("----------------error", error);
  });
}

export {
  initSocket,
  logoutSocket,
  getMessage,
  onTypingChat,
  receiverTypingChat,
  resetBoxChatSocket,
  openBoxChatSocket,
};
