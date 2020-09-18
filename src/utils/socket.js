import io from "socket.io-client";
import { CHANEL } from "./chanelSocket";
import { actionsSocket as actions } from "../pages/Layout/actions";
import { convertObjectToArray } from "../utils";
let socket = null;
function initSocket(dispatch, userId) {
  socket = io(CHANEL.API_URL);
  socket.on("connect", () => {
    console.log("---->>>>>>>>>>>> CONNECT SOCKET <<<<<<<<<--------");
    speakOnline(userId);
    getListOnline(dispatch);
  });
  connectSocketError();
}

function connectSocketError() {
  socket.on("connect_error", res => {
    console.log("!!!!!!!!!!!!!! SOCKET ERROR !!!!!!!!!!!!!", res);
  });
}

function getMessage(dispatch, idRoomChat) {
  socket.on(`${CHANEL.ROOM_CHAT}${idRoomChat}`, res => {
    console.log("----->Data", res);
    dispatch(actions.getMessageSocket(res.data));
  });
}

function getListOnline(dispatch) {
  socket.on(CHANEL.LIST_ONLINE, res => {
    console.log("----->listOnline", res);
    dispatch(actions.getListOnlineSocket(convertObjectToArray(res)));
  });
}

function logoutSocket(){
  console.log("----->Logout socket", socket.id);
  socket.emit(CHANEL.LOG_OUT, socket.id);
}

function speakOnline(userId) {
  console.log("----->Speak User Id", userId);
  socket.emit(CHANEL.SPEAK_USER_ID, userId);
}

export { initSocket, logoutSocket, getMessage };
