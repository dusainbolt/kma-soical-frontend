import React from "react";
import { UpOutlined } from "@ant-design/icons";
import LazyloadImg from "../LazyLoadingImg";
import Avatar from "antd/lib/avatar/avatar";
import { CameraFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { genderAvatarUrl } from "../../utils";
import { Col, Row } from "antd";

const avatar_img = "https://dappimg.com/media/image/app/0f5380a30b1b49f2a0f4f21051631a39.jpg";
const url_img =
  "https://img.vn/uploads/thuvien/viber-image-2019-08-06-10-40-38-jpg-20190807145944LO3qbinQdG.jpg";
function AccountInfo({ userDetail }) {
  const { t } = useTranslation();
  console.log(userDetail);
  const {
    get_user_info: { fullName, sologan, gender, birthday },
    avatar,
    codeStudent,
    created_at,
  } = userDetail;
  return (
    <div className="account form-feed">
      <div className="account__cover-wrapper">
        <LazyloadImg delayThrottle={100} className="img-cover" src={url_img} />
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
        <Row gutter={[8, 8]}>
          <Col md={8} sm={12} xs={24}>
            21421
          </Col>
          <Col md={8} sm={12} xs={24}>
            21421
          </Col>
          <Col md={8} sm={12} xs={24}>
            21421
          </Col>
        </Row>
      </div>
    </div>
  );
}
export default AccountInfo;
