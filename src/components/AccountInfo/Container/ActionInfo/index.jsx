import React from "react";
import { UserAddOutlined, EyeOutlined, MessageFilled, StopOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

function ActionInfo() {
  const { t } = useTranslation();
  return (
    <div className="action-info">
      <div className="item inbox-wrapper">
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
