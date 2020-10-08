import React from "react";
import { HeartFilled } from "@ant-design/icons";
import { useSelector } from "react-redux";
function LikeInfo({ totalLike, noteLike, noteComment, index, toggleComment }) {
  const isMobile = useSelector(state => state.layoutReducer.isMobile);
  return (
    <div className="form-feed__like-share">
      <HeartFilled />
      <div className="like-info">{isMobile ? totalLike : noteLike}</div>
      <label onClick={() => toggleComment(index)} className="comment-info">
        {noteComment}
      </label>
    </div>
  );
}

export default LikeInfo;
