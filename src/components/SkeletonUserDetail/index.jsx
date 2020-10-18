import React from "react";
import LazyloadImg from "../LazyLoadingImg";
import Avatar from "antd/lib/avatar/avatar";
import { useTranslation } from "react-i18next";
import { genderAvatarUrl } from "../../utils";
import { CameraFilled } from "@ant-design/icons";
import { Skeleton } from "antd";

const url_img =
  "https://img.vn/uploads/thuvien/viber-image-2019-08-06-10-40-38-jpg-20190807145944LO3qbinQdG.jpg";

function SkeletonUserDetail() {
  const { t } = useTranslation();
  return (
    <div className="account form-feed">
      <div className="account__cover-wrapper">
        <LazyloadImg delayThrottle={100} height={390} className="img-cover" src={url_img} />
      </div>
      <div className="account__image-avatar">
        <Skeleton.Avatar size={144} active />
      </div>
    </div>
  );
}
export default SkeletonUserDetail;
