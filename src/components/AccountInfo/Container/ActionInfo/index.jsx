import React from "react";
import { UserAddOutlined, EyeOutlined, MessageFilled, StopOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function ActionInfo({ callbackClickMessage, fullName, userDetail }) {
  const { t } = useTranslation();

  const listOnline = useSelector(state => state.sideBarMessage.listOnline);

  const clickMessage = () => {
    callbackClickMessage({
      fullName,
      userId: userDetail.id,
      avatarUrl: userDetail.avatar,
      isOnline: listOnline.includes(userDetail.id),
    });
  };

  return (
    <div className="action-info">
      <div onClick={clickMessage} className="item inbox-wrapper">
        <MessageFilled />
        {t("account.inbox")}
      </div>
      <div className="item action-other-wrapper">
        <UserAddOutlined />
      </div>
      <div className="item action-other-wrapper">
        <EyeOutlined />
      </div>
      <div className="item action-other-wrapper">
        <StopOutlined />
      </div>
    </div>
  );
}
export default ActionInfo;
