import * as Yup from "yup";
import { getI18n } from "react-i18next";
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

export const validateFormChangePassword = Yup.object({
  [PARAMS.PASSWORD]: Yup.string()
    .required(getI18n().t("Vui lòng nhập mật khẩu cũ"))
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
  message: Yup.string()
    .required()
});

export const validateLoginCommon = Yup.object({
  email: Yup.string()
    .required(getI18n().t("msg.msgValidateRequired"))
    .email(getI18n().t("msg.msgValidateEmail")),
  password: Yup.string().required("please enter password"),
});

export const TIME_UTC_FORMAT = {
  TYPE_1: "HHmmss",
  TYPE_2: "HH:mm:ss",
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


export const VALUE_GENDER = [1,2,3];