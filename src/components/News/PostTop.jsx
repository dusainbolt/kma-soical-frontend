import React from "react";
import { GlobalOutlined, EllipsisOutlined } from "@ant-design/icons";
import { genderTimeCountNewFeed, onRedirect, genderAvatarUrl } from "../../utils";

function PostTop({ avatarUrl, fullName, created_at, userId, note }) {
  return (
    <div className="form-feed__top">
      <img
        className="avatar"
        onClick={() => onRedirect(`/user-detail/${userId}`)}
        src={genderAvatarUrl(avatarUrl)}
        alt="avatar"
      />
      <div className="form-feed__top--info">
        <div className="form-feed__top--name">
          {fullName} {note}
        </div>
        <span className="form-feed__top--time">
          {genderTimeCountNewFeed(created_at)}
          <GlobalOutlined className="form-feed__top--i-security" />
        </span>
      </div>
      <EllipsisOutlined className="form-feed__top--i-action" onClick={() => console.log("ok")} />
    </div>
  );
}

export default PostTop;
