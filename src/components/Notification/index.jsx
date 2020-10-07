import { notification } from "antd";
import React from "react";
import { getI18n } from "react-i18next";
import logo from "../../common/image/logo.png";

export default function Notification( typeContent = 0, msgTitle, msgContent, urlAction = "", msgType = "success") {
  notification[msgType]({
    message: getI18n().t(`txt.${msgTitle}`),
    className: `event-notify ${urlAction && "action"}`,
    onClick: urlAction ? getFunctionNotify(urlAction) : e => e.preventDefault(),
    icon: renderIcon(),
    description: typeContent ? "ssssssssssssssssssssssssssssssssssssssssssssssssssss" : getI18n().t(`txt.${msgContent}`),
    placement: "bottomRight",
    duration: 5,
  });
}

const renderIcon = () => {
  return <img className="event-notify__logo" src={logo} alt="logo" />;
};

const getFunctionNotify = url => () => {
  window.open(url, "_blank");
};
