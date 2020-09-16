import io from "socket.io-client";
import { SOCKET } from "../common";
import { actionsSocket as actions } from "../pages/Layout/actions";
let socket = null;

function initSocket(dispatch, userId) {
  console.log(SOCKET.API_URL);
  socket = io(SOCKET.API_URL);
  socket.on("connect", () => {
    console.log("---->>>>>>>>>>>> CONNECT SOCKET <<<<<<<<<--------");
    // socket.emit("join-room", userId.toString());
    // getMessage(callbackMessage);
    // getMessage1(callbackMessage);
    console.log(userId, "------->");
    getMessage(dispatch);
    speakOnline(userId);
    getListOnline(dispatch);
  });
  connectSocketError();
}

function connectSocketError() {
  socket.on("connect_error", res => {
    console.log(res);
    console.log("!!!!!!!!!!!!!! SOCKET ERROR !!!!!!!!!!!!!", res);
  });
}

function getMessage(dispatch) {
  socket.on("__chatSocket", res => {
    console.log("----->Data", res);
    dispatch(actions.getMessageSocket(res.data));
  });
}

function getListOnline(dispatch) {
  socket.on("__listOnline", res => {
    console.log("----->Data", res);
    // dispatch(actions.getMessageSocket(res.data));
  });
}

function speakOnline(userId) {
  socket.emit("__speakerUserId", userId);
}

export { initSocket };
