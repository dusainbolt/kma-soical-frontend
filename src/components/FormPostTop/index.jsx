import React from "react";
import LazyloadImg from "../LazyLoadingImg";
import { PictureFilled, VideoCameraFilled, EditFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { getLastName } from "../../utils";
import { TYPE_FEED } from "../../common";

function FormPostTop({ avatarUrl, fullName, callBackOpenFormAddNew }) {
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
        <div onClick={callBackOpenFormAddNew(TYPE_FEED.IMAGE)}>
          <PictureFilled/>
          <span className="action-text">{t("news_feed.image")}</span>
        </div>
        <div onClick={callBackOpenFormAddNew(TYPE_FEED.VIDEO)}>
          <VideoCameraFilled />
          <span className="action-text">{t("news_feed.video")}</span>
        </div>
        <div onClick={callBackOpenFormAddNew(TYPE_FEED.TEXT)}>
          <EditFilled />
          <span className="action-text">{t("news_feed.status")}</span>
        </div>
      </div>
    </div>
  );
}
export default FormPostTop;
