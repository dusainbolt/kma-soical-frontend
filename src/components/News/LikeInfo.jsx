import React from "react";
import {
  GlobalOutlined,
  EllipsisOutlined,
  HeartFilled,
  HeartOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
function LikeInfo({
  totalLike,
  noteLike,
  viewLike,
  noteComment,
  index,
  toggleComment,
  toggleLike,
}) {
  const isMobile = useSelector(state => state.layoutReducer.isMobile);
  return (
    <div className="form-feed__like-share">
      <HeartFilled/>
      <div className="like-info">{isMobile ? totalLike : noteLike}</div>
      <label onClick={() => toggleComment(index)} className="comment-info">
        {noteComment}
      </label>
    </div>
  );
}

export default LikeInfo;
