import React from "react";
import { Divider, notification } from "antd";
import { getI18n } from "react-i18next";
import logo from "../../resource/image/logo.png";
import { playNotifySound } from "../../resource/sound";
import {
  genderAvatarUrl,
  getArrayImg,
  onRedirect,
  renderContentCommentNotify,
  renderContentLikeNotify,
} from "../../utils";
import ContentNew from "../News/ContentNew";
import { NOTIFY } from "../../common";

export default function Notification(
  typeContent = 0,
  msgTitle,
  msgContent,
  urlAction = "",
  msgType = "success",
  key = `open${Date.now()}`
) {
  const renderIcon = (typeContent, avatarUrl) => {
    return (
      <img
        className="event-notify__logo"
        src={typeContent ? genderAvatarUrl(avatarUrl) : logo}
        alt="logo"
      />
    );
  };

  const renderContentNotify = type => {
    const { get_user, content, caption, typePost, myUserId, postUserId } = msgContent;
    switch (type) {
      case NOTIFY.LIKE:
        return renderContentNewFeed(msgContent);
      case NOTIFY.COMMENT:
        return renderContentCommentNotify(
          get_user.get_user_info.fullName,
          content,
          caption,
          typePost,
          myUserId === postUserId
        );
      default:
        break;
    }
  };

  const renderContentNewFeed = item => {
    const { fullNameLike, avatarUrl, tag, type, content, caption, totalLike } = item;
    return (
      <div className="event-notify__description">
        {renderContentLikeNotify(fullNameLike, totalLike)}
        <div className="form-feed">
          <ContentNew
            caption={caption}
            callbackViewImg={e => e.preventDefault()}
            avatarUrl={avatarUrl}
            tags={tag ? tag.toString().split(",") : []}
            content={getArrayImg(content, type)}
            type={type}
          />
        </div>
      </div>
    );
  };

  const getFunctionNotify = url => {
    console.log(url);
    window.open(url, "_blank");
  };

  const onClickNotify = () => {
    notification.close(key);
    if (typeContent) {
      onRedirect(urlAction);
    } else {
      getFunctionNotify(urlAction);
    }
  };

  notification[msgType]({
    key,
    message: getI18n().t(`txt.${msgTitle}`),
    className: `event-notify ${urlAction && "action"}`,
    onClick: onClickNotify,
    icon: renderIcon(typeContent, msgContent?.avatarUserNotify),
    description: typeContent ? renderContentNotify(typeContent) : getI18n().t(`txt.${msgContent}`),
    placement: "bottomRight",
    duration: 12,
  });
  playNotifySound();
}
