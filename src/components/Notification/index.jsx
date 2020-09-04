import { notification } from "antd";
import React from "react";
import { getI18n } from "react-i18next";
import logo from "../../common/image/logo.png";

export default function Notification(msgType, msgTitle, msgContent) {
  notification[msgType]({
    message: getI18n().t(`txt.${msgTitle}`),
    className: "event-notify",
    icon: renderIcon(),
    description: getI18n().t(`txt.${msgContent}`),
    placement: "bottomRight",
    duration: 5,
  });
}

const renderIcon = () => {
  return <img className="event-notify__logo" src={logo} alt="logo"/>;
};
