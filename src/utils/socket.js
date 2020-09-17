import io from "socket.io-client";
import { CHANEL } from "./chanelSocket";
import { actionsSocket as actions } from "../pages/Layout/actions";
import { convertObjectToArray } from "../utils";
let socket = null;
function initSocket(dispatch, userId) {
  socket = io(CHANEL.API_URL);
  socket.on("connect", () => {
    console.log("---->>>>>>>>>>>> CONNECT SOCKET <<<<<<<<<--------");
    // getMessage(dispatch);
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

function getMessage(dispatch, idRoomChat) {
  socket.on(`__roomChat:id=${idRoomChat}`, res => {
    console.log("----->Data", res);
    dispatch(actions.getMessageSocket(res.data));
  });
}

function getListOnline(dispatch) {
  socket.on("__listOnline", res => {
    console.log("----->listOnline", res);
    dispatch(actions.getListOnlineSocket(convertObjectToArray(res)));
  });
}

function logoutSocket(){
  console.log("----->Logout socket", socket.id);
  socket.emit("__logout", socket.id);
}

function speakOnline(userId) {
  console.log("----->Speak User Id", userId);
  socket.emit("__speakerUserId", userId);
}

export { initSocket, logoutSocket, getMessage };
