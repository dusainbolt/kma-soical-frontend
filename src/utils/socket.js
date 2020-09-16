import io from "socket.io-client";
import { SOCKET } from "../common";
import { actionsSocket as actions } from "../pages/Layout/actions";
let socket = null;

function initSocket(dispatch) {
  console.log(SOCKET.API_URL);
  socket = io(SOCKET.API_URL);
  socket.on("connect", () => {
    console.log("---->>>>>>>>>>>> CONNECT SOCKET <<<<<<<<<--------");
    // socket.emit("join-room", userId.toString());
    // getMessage(callbackMessage);
    // getMessage1(callbackMessage);
    getMessage(dispatch);
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
function getMessage1(callbackMessage) {
  socket.on("__chatSocket1", res => {
    console.log("----->Data", res);
    callbackMessage(res.data);
  });
}
// message
// new message

export { initSocket };
