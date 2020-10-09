import React, { useState } from "react";
import { Comment, Tooltip } from "antd";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { genderAvatarUrl, genderTimeCount } from "../../utils";
import { useTranslation } from "react-i18next";

function BoxComment({ comment, className = "" }) {
  const { t } = useTranslation();
  const [likes, setLikes] = useState(0);
  const [action, setAction] = useState(null);

  const like = () => {
    setLikes(1);
    setAction("liked");
  };

  return (
    <Comment
      className={className}
      actions={[
        <Tooltip key="comment-basic-like" title={t("news_feed.like")}>
          <span className="comment-info" onClick={like}>
            {t("news_feed.like")}
            {comment.countLike !== 0 && (action === "liked" ? LikeFilled : LikeOutlined) && (
              <span className="comment-action">{comment.countLike}</span>
            )}
          </span>
        </Tooltip>,
        <span className="comment-info" key="comment-basic-reply-to">
          {t("news_feed.rep_comment")}
        </span>,
        <span key="comment-basic-reply-to">{genderTimeCount(comment.created_at)}</span>,
      ]}
      author={<Link to="/home">{comment.fullName}</Link>}
      avatar={<img src={genderAvatarUrl(comment.avatarUrl)} alt="avatar" />}
      content={<div>{comment.content}</div>}></Comment>
  );
}
export default BoxComment;
