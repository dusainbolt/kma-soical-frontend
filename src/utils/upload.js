import { message } from "antd";
import { getI18n as i8 } from "react-i18next";

export const beforeUpload = file => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png" || "image/heic";
  if (!isJpgOrPng) {
    message.error(i8().t("txt.format_img_invalid"));
  }
  const isLt2M = file.size / 1024 / 1024 < 1;
  if (!isLt2M) {
    message.error(i8().t("txt.size_img_invalid"));
  }
  return isJpgOrPng && isLt2M;
};

export const getBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};
