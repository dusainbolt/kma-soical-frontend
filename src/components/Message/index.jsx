import { message } from "antd";
import { getI18n } from "react-i18next";

export default function showMessage(msgType, msgContent){
  message[msgType]({
    content: getI18n().t(msgContent),
    className: "event-message",
    duration: 3,
    style: {
      marginTop: "1vh",
    },
  });
}