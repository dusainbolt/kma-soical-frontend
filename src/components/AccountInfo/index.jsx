import React from "react";
import LazyloadImg from "../LazyLoadingImg";
import Avatar from "antd/lib/avatar/avatar";
import { useTranslation } from "react-i18next";
import { genderAvatarUrl } from "../../utils";
import { Col, Divider, Row } from "antd";
import ActionInfo from "./Container/ActionInfo";
import AccountDashboard from "./Container/AccountDashboard";
import AccountInfoFriends from "./Container/AccountInfoFriends";
import { CameraFilled } from "@ant-design/icons";

const url_img =
  "https://img.vn/uploads/thuvien/viber-image-2019-08-06-10-40-38-jpg-20190807145944LO3qbinQdG.jpg";

function AccountInfo({ userDetail, userDashBoard }) {
  const { t } = useTranslation();
  const {
    get_user_info: { fullName, sologan, gender, birthday },
    avatar,
    codeStudent,
    created_at,
  } = userDetail;
  return (
    <>
      <div className="account form-feed">
        <div className="account__cover-wrapper">
          <LazyloadImg delayThrottle={100} height={390} className="img-cover" src={url_img} />
          <div className="account__cover-wrapper--btn-upload">
            <CameraFilled />
            {t("news_feed.upload_cover_img")}
          </div>
        </div>
        <div className="account__image-avatar">
          <div className="account__image-avatar--icon-upload">
            <CameraFilled />
          </div>
          <Avatar src={genderAvatarUrl(avatar)} />
        </div>
        <div className="account__content-warpper">
          <div className="account__name">{fullName}</div>
          <p className="account__sologan">{sologan}</p>
          <ActionInfo />
          <Divider />
          <AccountDashboard userDashBoard={userDashBoard} />
        </div>
      </div>
      <AccountInfoFriends />
    </>
  );
}
export default AccountInfo;
