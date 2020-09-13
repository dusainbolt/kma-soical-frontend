import React from "react";
import LazyloadImg from "../LazyLoadingImg";
import { PictureFilled, VideoCameraFilled, EditFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { getLastName } from "../../utils";
import { useSelector } from "react-redux";

function FormAddNew({ avatarUrl, fullName }) {
  const { t } = useTranslation();

  return (
    <div className="form-new__wrapper">
      <div className="form-new__input">
        <LazyloadImg
          className="form-new__avatar avatar"
          src={avatarUrl}
          alt="avatar"
        />
        <div className="form-new__input--field">
          {t("txt.place_holder_add_new", { name: getLastName(fullName) })}
        </div>
      </div>
      <div className="form-new__action">
        <div>
          <PictureFilled/>
          <span className="action-text">{t("news_feed.image")}</span>
        </div>
        <div>
          <VideoCameraFilled />
          <span className="action-text">{t("news_feed.video")}</span>
        </div>
        <div>
          <EditFilled />
          <span className="action-text">{t("news_feed.status")}</span>
        </div>
      </div>
    </div>
  );
}
export default FormAddNew;
