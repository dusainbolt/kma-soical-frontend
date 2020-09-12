import { browserHistory } from "./history";
import { actions as actionLayout } from "../pages/Layout/actions";
import { put } from "redux-saga/effects";
import { TIME_UTC_FORMAT, DATE_UTC_FORMAT, TYPE_DATE_TIME, SPAN_GALLEY } from "../common";
import showMessage from "../components/Message";
import showNotify from "../components/Notification";
import moment from "moment";
import { getI18n } from "react-i18next";

export function getTimeNowUnix() {
  return Math.round(new Date().getTime() / 1000);
}

export function countSecondToTime(secs) {
  let days = Math.floor(secs / (60 * 60 * 24));
  let hours = Math.floor((secs % (60 * 60 * 24)) / (60 * 60));
  let divisor_for_minutes = secs % (60 * 60);
  let minutes = Math.floor(divisor_for_minutes / 60);

  let divisor_for_seconds = divisor_for_minutes % 60;
  let seconds = Math.ceil(divisor_for_seconds);

  let obj = {
    d: days,
    h: hours,
    m: minutes,
    s: seconds,
  };
  return obj;
}

export function* effectAfterRequest(typeMsg, msg, typeHide = 0, redirect = "") {
  if (redirect) {
    yield browserHistory.push(redirect);
  }
  if (typeHide === 1) {
    yield put(actionLayout.hideLoadingEvent());
  } else if (typeHide === 2) {
    yield put(actionLayout.hideLoadingAuth());
  }
  if (msg) yield showMessage(typeMsg, msg);
}

export function* showNotifyRequest(title, content, urlAction, typeMsg){
  yield showNotify(title, content, urlAction, typeMsg);
}


export function showNotifyNormal(title, content, urlAction, typeMsg){
  showNotify(title, content, urlAction, typeMsg);
}

export function showTopHeader(header) {
  header.style.boxShadow = "1px 1px 5px #ddd";
  header.style.position = "fixed";
  header.style.backgroundColor = "white";
}

export function showBodyHeader(header) {
  header.style.boxShadow = "none";
  header.style.position = "absolute";
  header.style.backgroundColor = "transparent";
}

export function checkStringRange(value, min, max) {
  if (!value) return false;
  const length = value.trim().length;
  return length >= min && length <= max;
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function convertDateTime(timeNumber, type = "") {
  if (!timeNumber) return "";
  const timeConvert = moment.unix(timeNumber).format(TIME_UTC_FORMAT.TYPE_2);
  const dateConvert = moment.unix(timeNumber).format(DATE_UTC_FORMAT);
  switch (type) {
  case TYPE_DATE_TIME.DATE:
    return dateConvert;
  case TYPE_DATE_TIME.TIME:
    return timeConvert;
  case TYPE_DATE_TIME.TIME_AND_DATE:
    return dateConvert + " " + timeConvert;
  default:
    return dateConvert;
  }
}

export const convertStringDate = (value, format) => {
  return value.unix();
};

export function genderTimeCount(timeNumber) {
  var now = moment(new Date()); //todays date
  var myTime = moment.unix(timeNumber);
  var duration = now.diff(myTime);
  if (duration < 60000) {
    return "now";
  } else if (duration > 60000 && duration < 3600000) {
    return now.diff(myTime, "minutes") + " minutes";
  } else if (duration > 3600000 && duration < 86400000) {
    return now.diff(myTime, "hours") + " hours";
  } else if (duration > 86400000 && duration < 604800000) {
    return now.diff(myTime, "days") + " days";
  } else if (duration > 604800000) {
    return moment.unix(timeNumber).format(DATE_UTC_FORMAT);
  } else {
    return moment.unix(timeNumber).format(DATE_UTC_FORMAT);
  }
}

export function validateNumber(value) {
  if (!value) return true;
  var re = /^[0-9]+$/;
  return re.test(value);
}

export function onlyNumberCharUnder(value) {
  if (!value) return true;
  var re = /^[a-z0-9_]+$/;
  return re.test(value);
}

export const blockSpecialCharInUnder = (setFieldValue, name) => e => {
  let value = e.target.value;
  if (!onlyNumberCharUnder(value) || value.includes("__")) return;
  setFieldValue(name, value);
};

export function onlyNumberChar(value) {
  if (!value) return true;
  var re = /^[a-zA-Z0-9]+$/;
  return re.test(value);
}

export const onlyNumber = (setFieldValue, name) => e => {
  let value = e.target.value;
  console.log(value);
  if (!validateNumber(value)) return;
  setFieldValue(name, value);
};



export const blockSpecialChar = (setFieldValue, name) => e => {
  let value = e.target.value;
  if (!onlyNumberChar(value)) return;
  setFieldValue(name, value.toUpperCase());
};

export const checkCodeStudent = (setFieldValue, name) => e => {
  let value = e.target.value.toUpperCase();
  if (!onlyNumberChar(value) || !validateCodeStudent(value)) return;
  setFieldValue(name, value);
};

export const validateCodeStudent = value => {
  let arr = value.split("");
  let check = true;
  if ((value.length === 1)) {
    check = arr[0] === "A" || arr[0] === "C" || arr[0] === "D";
  } else if ((value.length === 2)) {
    const code = arr[0] + arr[1];
    check = code === "AT" || code === "CT" || code === "DT";
  }
  return check;
};

export const blockSpace = (setFieldValue, values, fieldName) => e => {
  let value = e.target.value;
  if ((!values[fieldName].trim() && !value.trim()) || value.includes("  ")) {
    return;
  }
  setFieldValue(fieldName, value);
};

function removeAscent(str) {
  if (str === null || str === undefined) return str;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  return str;
}

function isNameVN(string) {
  if (!string) return true;
  var re = /^[a-z ]+$/;
  return re.test(removeAscent(string));
}

export const onlyNameVN = (setFieldValue, values, fieldName) => e => {
  let value = e.target.value;
  if ((!values[fieldName].trim() && !value.trim()) || value.includes("  ") || !isNameVN(value)) {
    return;
  }
  setFieldValue(fieldName, value);
};

export function getSelectLocalize(values, localize) {
  if (!values.length) return [];
  return values.map(value => {
    return {
      value,
      label: getI18n().t(`${localize}${value}`),
    };
  });
}

export const onChangeValueFormik = (setFieldValue, name) => value => {
  setFieldValue(name, value);
};

export const disableFeatureDate = () => current => {
  const currentDate = moment(Date.now());
  return current > currentDate;
};

export const getDefaultValueDate = stringdate => {
  return moment(stringdate, DATE_UTC_FORMAT);
};

export function setValueDate(values, name) {
  return values[name] ? moment(values[name]) : "";
}

export const getUrlRedirectEmail = email => {
  return `https://mail.google.com/mail/u/${email}/#inbox`;
};

export const getLastName = fullName => {
  return fullName.split(" ").pop();
};

export const getSpanList = length=>{
  switch (length) {
  case 2:
    return SPAN_GALLEY.COL_12_12;
  case 1:  
  case 3:
    return SPAN_GALLEY.COL_24_12;
  case 4: 
    return SPAN_GALLEY.COL_24_8;
  case 5:
    return SPAN_GALLEY.COL_24_6;    
  default:
    return SPAN_GALLEY.COL_24_6;
  }
}