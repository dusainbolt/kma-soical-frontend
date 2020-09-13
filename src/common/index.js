import * as Yup from "yup";
import { getI18n as i8 } from "react-i18next";
import { checkStringRange } from "../utils";

//note:
// /^[A-Za-z0-9 ]+$/ "true",
// /[^A-Za-z0-9]+/g "false"

export const REVIEW = {
  NOT_SATISFIED: 1,
  NORMAL: 2,
  SATISFIED: 3,
};

export const SOCKET = {
  API_URL: `${process.env.REACT_APP_SOCKET_URL}`,
};

export const PARAMS = {
  PASSWORD: "password",
  PASSWORD_NEW: "passwordNew",
  PASSWORD_CONFIRM: "passwordConfirm",
  EMAIL: "email",
  NAME: "name",
  CONTACT: "contact",
  VOTE: "vote",
};

export const CONFIRM = {
  REGISTER: "CONFIRM_REGISTER",
};

export const ERROR_NETWORK = {
  TITLE: "msg_500_error",
  CONTENT: "msg_500_content",
};

export const ERROR_AUTH = {
  TITLE: "notify_login_fail_title",
  CONTENT: "msg_401_content",
};

export const KEY_NOTIFY = {
  REGISTER_TITLE: "msg_register_title",
  REGISTER_CONTENT: "msg_register_content",
};

export const validateFormChangePassword = Yup.object({
  [PARAMS.PASSWORD]: Yup.string()
    .required(i8().t("Vui lòng nhập mật khẩu cũ"))
    .max(255, "Vui lòng nhập dưới 255 ký tự"),
  [PARAMS.PASSWORD_NEW]: Yup.string()
    .required("Vui lòng nhập mật khẩu mới")
    .min(6, "Vui lòng nhập ít nhất 6 ký tự")
    .notOneOf([Yup.ref("password"), null], "Mật khẩu mới không được trùng")
    .max(27, "Vui lòng nhập dưới 27 ký tự"),
  [PARAMS.PASSWORD_CONFIRM]: Yup.string()
    .required("Vui lòng nhập lại mật khẩu mới")
    .oneOf([Yup.ref("passwordNew"), null], "Mật khẩu xác nhận không trùng khớp")
    .min(6, "Vui lòng nhập ít nhất 6 ký tự")
    .max(27, "Vui lòng nhập dưới 27 ký tự"),
});

export const validateMessage = Yup.object({
  message: Yup.string().required(),
});

export const validateLoginCommon = Yup.object({
  email: Yup.string()
    .required(i8().t("msg.msgValidateRequired"))
    .email(i8().t("msg.msgValidateEmail")),
  password: Yup.string().required("please enter password"),
});

export const TIME_UTC_FORMAT = {
  TYPE_1: "HHmmss",
  TYPE_2: "HH:mm:ss",
  TYPE_HH_MM: "HH:mm",
};

export const DATE_UTC_FORMAT = "DD/MM/YYYY";

export const TYPE_DATE_TIME = {
  DATE: DATE_UTC_FORMAT,
  TIME: TIME_UTC_FORMAT.TYPE_2,
  TIME_AND_DATE: TIME_UTC_FORMAT + " " + DATE_UTC_FORMAT,
};

export const TYPE_ANT = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
};

export const REP_COMMENT = "rep_comment";
export const END_MOBILE_PIXEL = 576;

export const VALUE_GENDER = [1, 2, 3];
export const VALUE_STATUS = [1, 2, 3];

export const SPAN_GALLEY = {
  COL_12_12: {
    one: 12,
    item: 12,
  },
  COL_24_12: {
    one: 24,
    item: 12,
  },
  COL_24_8: {
    one: 24,
    item: 8,
  },
  COL_24_6: {
    one: 24,
    item: 6,
  },
};

export const TYPE_FEED = {
  IMAGE: 1,
  VIDEO: 2,
};

export const OPTION_LiGHTBOX = {
  settings: {
    overlayColor: "rgba(0, 0, 0, 0.79)",
    autoplaySpeed: 1500,
    transitionSpeed: 900,
  },
  buttons: {
    // backgroundColor: "#e4e4e7",
    iconColor: "#fea700",
  },
  caption: {
    captionColor: "white",
    captionFontFamily: "Raleway, sans-serif",
    captionFontWeight: "600",
    // captionTextTransform: "uppercase",
  },
  progressBar: {
    backgroundColor: "#fea700",
    fillColor: "#000000",
    height: "3px",
    showProgressBar: true,
  },
  thumbnails: {
    thumbnailsContainerBackgroundColor: "rgba(30,30,36,0.8)",
  },
  translations: {
    autoplayText: i8().t("light_box.autoplay"),
    closeText: i8().t("light_box.close"),
    downloadText: i8().t("light_box.download"),
    fullscreenText: i8().t("light_box.fullscreen"),
    nextText: i8().t("light_box.next"),
    pauseText: i8().t("light_box.pause"),
    previousText: i8().t("light_box.previous"),
    thumbnailsText: i8().t("light_box.thumbnails"),
    zoomOutText: i8().t("light_box.zoomOut")
  }
};
