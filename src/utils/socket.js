import io from "socket.io-client";
import { CHANEL } from "./chanelSocket";
import { actionsSocket as actions } from "../pages/Layout/actions";
import { convertObjectToArray } from "../utils";
import showNotification from "../components/Notification";
import { NOTIFY } from "../common";

let socket = null;
let dispatch = null;
let idRoomChat = null;
let userId = null;
let boxComment = [];
const arrayUrl = window.location.href.split("/");
function initSocket(dispatchVal, myUserId) {
  if (!socket) {
    socket = io(CHANEL.API_URL);
    socket.on("connect", () => {
      console.log("---->>>>>>>>>>>> CONNECT SOCKET <<<<<<<<<--------");
      dispatch = dispatchVal;
      userId = myUserId;
      speakOnline();
      getListOnline();
      getMyInbox();
      baseSocket();
      receiveBoxChat();
      receiveLikeNewFeed();
      receiveNotification();
    });
    connectSocketError();
  }
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

function onReadRoom() {
  console.log("----->onReadRoom", idRoomChat);
  socket.emit(`${CHANEL.ON_READ_ROOM}`, userId, idRoomChat);
  socket.on(`__receiveReadRoom:id=${idRoomChat}`, idUserRead => {
    console.log("----->receiveReadRoom", idUserRead);
    dispatch(actions.receiveReadRoom(idUserRead === userId, idUserRead));
  });
}

function openBoxChatSocket(userInbox) {
  console.log("-------------->openBoxChat: ", userInbox);
  socket.emit(`${CHANEL.OPEN_MY_BOX_CHAT}`, userInbox, userId);
}

function receiveBoxChat() {
  socket.on(`${CHANEL.RECEIVE_BOX_CHAT}${userId}`, res => {
    console.log("----->receiveBoxChat: ", res);
    dispatch(actions.receiveBoxChatSocket(res));
  });
}

function receiveLikeNewFeed() {
  socket.on(`${CHANEL.RECEIVE_LIKE_NEW_FEED}${userId}`, res => {
    console.log("----->receiveLikeNewFeed: ", res);
    if (res.data.sendNotify) {
      showNotification(NOTIFY.LIKE, "new_like_notify_title", res.data, `/post/${res.data.id}`);
    }
  });
}

function resetSocketNewFeed(userIdVar) {
  if (socket) {
    socket.off(`${CHANEL.RECEIVE_LIKE_NEW_FEED}${userIdVar}`);
    socket.off(`${CHANEL.RECEIVE_BOX_CHAT}${userIdVar}`);
  }
}

function resetBoxChatSocket() {
  console.log("-------------------->resetBoxChat", idRoomChat);
  socket.off(`${CHANEL.ROOM_CHAT}${idRoomChat}`);
  socket.off(`${CHANEL.RECEIVE_TYPING_CHAT}${idRoomChat}`);
  socket.off(`${CHANEL.RECEIVE_READ_ROOM}${idRoomChat}`);
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
    if (res.roomId !== idRoomChat) {
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
    dispatch(actions.receiveReadRoom(res.userId === userId, res.userId));
  });
}

function initSocketBoxComment(postId, isOpen) {
  socket.off(`${CHANEL.CHANNEL_COMMENT_FEED}${postId}`);
  if (isOpen) {
    boxComment.push(postId);
    console.log("<<<<<<<<<<<- Init Comment socket ID = " + postId + " ->>>>>>>>>>>>");
    socket.on(`${CHANEL.CHANNEL_COMMENT_FEED}${postId}`, res => {
      console.log("----->getCommentSocket", res);
      dispatch(actions.receiveDataBoxComment(res.data));
    });
  }
}

function receiveNotification() {
  console.log("---------------------->USER_ID", userId);
  socket.on(`${CHANEL.CHANNEL_NOTIFY}${userId}`, res => {
    console.log("<<<<<<<<<<<- Notification = ", res);
    if (userId !== res.data.userId)
      showNotification(
        NOTIFY.COMMENT,
        "new_like_notify_title",
        res.data,
        `/post/${res.data.postId}`
      );
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
  onReadRoom,
  resetSocketNewFeed,
  initSocketBoxComment,
};
