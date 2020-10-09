import React from "react";
import { browserHistory } from "./history";
import { actions as actionLayout } from "../pages/Layout/actions";
import { put } from "redux-saga/effects";
import {
  TIME_UTC_FORMAT,
  DATE_UTC_FORMAT,
  TYPE_DATE_TIME,
  SPAN_GALLEY,
  TYPE_FEED,
  FILTER_NEW_FEED,
} from "../common";
import { HeartFilled, MessageFilled } from "@ant-design/icons";
import showMessage from "../components/Message";
import showNotify from "../components/Notification";
import moment from "moment";
import { getI18n as i8 } from "react-i18next";
import AvatarDefault from "../resource/image/avatar-default.png";

export const renderErrorSearch = className => {
  return (
    <div className={`side-friends__search-mess--error ${className}`}>
      {i8().t("list_friends.err_search")}
    </div>
  );
};

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

export function* showNotifyRequest(title, content, urlAction, typeMsg) {
  yield showNotify(title, content, urlAction, typeMsg);
}

export function showNotifyNormal(title, content, urlAction, typeMsg) {
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

export function getRandomString(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
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
    return i8().t("time.now");
  } else if (duration > 60000 && duration < 3600000) {
    return now.diff(myTime, "minutes") + ` ${i8().t("time.minutes")}`;
  } else if (duration > 3600000 && duration < 86400000) {
    return now.diff(myTime, "hours") + ` ${i8().t("time.hours")}`;
  } else if (duration > 86400000 && duration < 604800000) {
    return now.diff(myTime, "days") + ` ${i8().t("time.day")}`;
  } else if (duration > 604800000) {
    return moment.unix(timeNumber).format(DATE_UTC_FORMAT);
  } else {
    return moment.unix(timeNumber).format(DATE_UTC_FORMAT);
  }
}

export function genderTimeCountNewFeed(timeNumber) {
  var now = moment(new Date()); //todays date
  var myTime = moment.unix(timeNumber);
  var duration = now.diff(myTime);
  var isDiffYear = now.format("Y") !== myTime.format("Y") ? true : false;
  if (isDiffYear) {
    return `${myTime.format("D")} ${i8().t("time.month")} ${myTime.format("M")} ${i8().t(
      "time.year"
    )} ${myTime.format("Y")} ${i8().t("time.on")} ${myTime.format(TIME_UTC_FORMAT.TYPE_HH_MM)}`;
  } else if (duration < 60000) {
    return i8().t("time.now");
  } else if (duration > 60000 && duration < 3600000) {
    return `${now.diff(myTime, "minutes")} ${i8().t("time.minutes")}`;
  } else if (duration > 3600000 && duration < 86400000) {
    return `${now.diff(myTime, "hours")} ${i8().t("time.hours")}`;
  } else if (duration > 86400000) {
    return `${myTime.format("D")} ${i8().t("time.month")} ${myTime.format("M")} ${i8().t(
      "time.on"
    )} ${myTime.format(TIME_UTC_FORMAT.TYPE_HH_MM)}`;
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
  if (value.length === 1) {
    check = arr[0] === "A" || arr[0] === "C" || arr[0] === "D";
  } else if (value.length === 2) {
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
      label: i8().t(`${localize}${value}`),
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
  return fullName?.split(" ").pop();
};

export const getSpanList = length => {
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
};

export const getArrayImg = (content, type) => {
  return type === TYPE_FEED.IMAGE ? content?.split(",") : content;
};

export const renderNotePost = (type, content, subjectName, arrSubjectTotal = []) => {
  const contentStart = i8().t("news_feed.note_shared");
  const subjectId = getSubjectId(arrSubjectTotal, subjectName);
  let subjectContent = (
    <b onClick={() => onRedirect(`/groups-subject/${subjectId}`)}>{subjectName}</b>
  );
  if (!subjectName) {
    subjectContent = i8().t("txt.time_line");
  }
  switch (type) {
    case TYPE_FEED.IMAGE:
      return (
        <span>
          {`${contentStart} ${getArrayImg(content, type).length} ${i8().t(
            "news_feed.image_upper"
          )} ${i8().t("news_feed.to")} `}
          {subjectContent}
        </span>
      );
    case TYPE_FEED.VIDEO:
      return (
        <span>
          {`${contentStart} ${i8().t("news_feed.video_upper")} ${i8().t("news_feed.to")} `}
          {subjectContent}{" "}
        </span>
      );
    default:
      return (
        <span>
          {`${contentStart} ${i8().t("news_feed.status_upper")} ${i8().t("news_feed.to")} `}
          {subjectContent}{" "}
        </span>
      );
  }
};

export const getSubjectId = (arrSubjectTotal, subjectName) => {
  let subjectId = "";
  arrSubjectTotal.forEach(subject => {
    if (subject.name === subjectName) {
      subjectId = subject.id;
    }
  });
  return subjectId;
};

export const renderNoteLike = (total, userLike, isLikeByMe) => {
  if (!total) return 0;
  if (total < 2) return total;
  let note = "";
  const otherPeopleTxt = i8().t("news_feed.other_people");
  const andTxt = i8().t("news_feed.and");
  total = isLikeByMe ? total - 1 : total;
  const otherTotal = `${i8().t(andTxt)} ${total} ${otherPeopleTxt}`;
  if (total > 9) {
    note += isLikeByMe ? i8().t("txt.you") + ", " : "";
    note += `${note}${userLike} ${otherTotal}`;
  } else {
    note += isLikeByMe ? `${i8().t("txt.you")} ${otherTotal} ` : total;
  }
  return note;
};

export const renderNoteComment = total => {
  return `${total ? total : 0} ${i8().t("news_feed.comment")}`;
};

export const genderAvatarUrl = avatarUrl => {
  return avatarUrl ? avatarUrl : AvatarDefault;
};

export const getStatusOnline = status => {
  return status ? i8().t("list_friends.online") : i8().t("list_friends.offline");
};

export const filterArray = (arr, conditionName, conditionValue) => {
  return arr.filter(item => item[conditionName] !== conditionValue);
};

export const convertObjectToArray = object => {
  return Object.values(object);
};

export const convertObjectCondition = (arrayResult, arrayCheck, conditionName, mapName) => {
  return arrayResult.map(item => {
    return {
      ...item,
      [mapName]: arrayCheck.indexOf(item[conditionName]) !== -1 ? true : false,
    };
  });
};

export const convertObjectItem = (arrayCheck, object, conditionName = "id") => {
  return arrayCheck.map(item => {
    return item[conditionName] === object[conditionName] ? object : item;
  });
};

export const renderContentLikeNotify = (fullName, total) => {
  return (
    <p>
      <HeartFilled /> <b>{fullName}</b>
      {total > 2
        ? ` ${i8().t("news_feed.and")} ${total - 1} ${i8().t("news_feed.people")} `
        : ""}{" "}
      {` ${i8().t("txt.notify_like_feed")}`}
    </p>
  );
};

export const renderContentCommentNotify = (fullName, commentContent) => {
  return (
    <div className="event-notify__comment">
      <span>
        <MessageFilled /> <b>{fullName}</b> {i8().t("txt.notify_comment_feed")}
      </span>
      <div>{commentContent}</div>
    </div>
  );
};

export const convertListFriendMessage = (listFriendsReducer, payloadMessage) => {
  let isOnline = null;
  listFriendsReducer = listFriendsReducer.filter(item => {
    const checkInboxOnReducer = item.userId !== payloadMessage.userInbox.userId;
    if (!checkInboxOnReducer) {
      isOnline = item.isOnline;
    }
    return checkInboxOnReducer;
  });
  const userInbox = [
    {
      ...payloadMessage.userInbox,
      content: payloadMessage.message,
      type: payloadMessage.type,
      isOnline,
    },
  ];
  return userInbox.concat(listFriendsReducer);
};

export const convertArrayZeroCondition = (value, listConvert, conditionName, valueName) => {
  return listConvert.map(item => {
    const checkInboxOnReducer = item[conditionName] === value;
    return {
      ...item,
      [valueName]: checkInboxOnReducer ? 0 : item[valueName],
    };
  });
};

export const convertListChatRead = (myRead, idUserRead, listChatReducer) => {
  return listChatReducer.map(item => {
    return {
      ...item,
      indexLoad: idUserRead !== item.userId ? 0 : item.indexLoad,
    };
  });
};

export const onRedirect = path => {
  return browserHistory.push(path);
};

export const renderImageOrder = (listFileUrl, body) => {
  const imageOrder = [];
  imageOrder[0] = body;
  imageOrder[1] = [];
  let typeFile = null;
  listFileUrl.forEach(file => {
    typeFile = file;
    if (file?.size) {
      imageOrder[0].append("images[]", file.originFileObj);
      typeFile = "__file";
    }
    imageOrder[1].push(typeFile);
  });
  imageOrder[0].set("imageOrder", imageOrder[1]);
};

export const renderCurrentFilterFeed = (props, currentValue) => {
  const { params, path } = props.match;
  let initialValue = { type: 0 };
  if (params.subjectId) {
    initialValue = {
      ...currentValue,
      type: TYPE_FEED.GROUP_SUBJECT,
      subjectId: params.subjectId,
    };
  } else if (params.postId) {
    initialValue = {
      type: TYPE_FEED.ONLY_ID,
      postId: params.postId,
    };
  } else if (path) {
    initialValue = {
      ...currentValue,
      type: genderTypeFeedForPath(path),
    };
  }
  return initialValue;
};

export const genderTypeFeedForPath = path => {
  switch (path) {
    case FILTER_NEW_FEED.IMG_NEW_FEED:
      return TYPE_FEED.IMAGE;
    case FILTER_NEW_FEED.IMG_VIDEO_FEED:
      return TYPE_FEED.VIDEO;
    case FILTER_NEW_FEED.IMG_HOT_FEED:
      return TYPE_FEED.HOT_NEW;
    case FILTER_NEW_FEED.IMG_ONLY_NEW_FEED:
      return TYPE_FEED.ONLY_TEXT;
    default:
      return null;
  }
};

export const checkIncludeArray = (item, array) => {
  if (!item || !array?.length) return false;
  return array.includes(item.toString());
};
