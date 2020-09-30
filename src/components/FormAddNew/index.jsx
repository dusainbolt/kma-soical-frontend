import React from "react";
import { PictureFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { getLastName } from "../../utils";
import { Avatar } from "antd";
import SecurityStatus from "../SecurityStatus";

function FormPostTop({ avatarUrl, fullName, callBackOpenFormAddNew }) {
  const { t } = useTranslation();

  return (
    <div className="form-new">
      <div className="form-new__account--wrapper">
        <Avatar className="avatar" size={40} src={avatarUrl} />
        <div className="info">
          <h5 className="title">{fullName}</h5>
          <SecurityStatus />
        </div>
      </div>
      <div className="form-new__input-text">

      </div>
    </div>
  );
}
export default FormPostTop;
