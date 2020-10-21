import React, { useState } from "react";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { validateIMG } from "../../common";
import { beforeUpload } from "../../utils/upload";
import { useTranslation } from "react-i18next";

function UploadImage({ content, cover = true, callbackUpload, className = "" }) {
  const { t } = useTranslation();

  const [fileUpload, setFileUpload] = useState(null);

  const onChangeFile = ({ file }) => {
    if (file && file?.uid !== fileUpload?.uid && file?.originFileObj) {
      setFileUpload(file);
      callbackUpload(file.originFileObj);
    }
  };

  const beforeCrop = file => {
    return beforeUpload(file);
  };

  return (
    <ImgCrop
      modalTitle={t("txt.crop_image")}
      beforeCrop={beforeCrop}
      grid
      shape={cover ? "rect" : "round"}
      aspect={cover ? 650 / 365 : 300 / 300}
      modalCancel={t("txt.cancel")}
      modalOk={t("txt.btn_done")}>
      <Upload
        className={`upload-avatar ${className}`}
        action="/"
        method="GET"
        accept={validateIMG.toString()}
        onChange={onChangeFile}>
        {content}
      </Upload>
    </ImgCrop>
  );
}
export default UploadImage;
