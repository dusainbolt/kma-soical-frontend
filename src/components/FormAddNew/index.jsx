import React from "react";
import LazyloadImg from "../LazyLoadingImg";
import { PictureFilled, VideoCameraFilled, EditFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { getLastName } from "../../utils";

function FormAddNew() {
  const { t } = useTranslation();
  return (
    <div className="form-new__wrapper">
      <div className="form-new__input">
        <LazyloadImg
          className="form-new__avatar avatar"
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="avatar"
        />
        <div className="form-new__input--field">
          {t("txt.place_holder_add_new", { name: getLastName("Du LE HUY") })}
        </div>
      </div>
      <div className="form-new__action">
        <div>
          <PictureFilled/>
          <span className="action-text">Anh</span>
        </div>
        <div>
          <VideoCameraFilled />
          <span className="action-text">Video</span>
        </div>
        <div>
          <EditFilled />
          <span className="action-text">Trang thai</span>
        </div>
      </div>
    </div>
  );
}
export default FormAddNew;
