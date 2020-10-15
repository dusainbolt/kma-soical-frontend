import React from "react";
import { UserAddOutlined, EyeOutlined, MessageFilled, StopOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

function ActionInfoFriends() {
  const { t } = useTranslation();
  return (
    <div className="account__friends form-feed">
      <div className="title-wrapper">
        <h3 className="title">
          {t("txt.friends")}
          <span>sdsddsdsd</span>
        </h3>
        <label>Xem tat ca</label>
      </div>
    </div>
  );
}
export default ActionInfoFriends;
