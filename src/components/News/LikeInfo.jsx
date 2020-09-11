import React from "react";
import {
  GlobalOutlined,
  EllipsisOutlined,
  HeartFilled,
  HeartOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
function LikeInfo() {
  const isMobile = useSelector(state => state.layoutReducer.isMobile);
  return (
    <div className="form-feed__like-share">
      <HeartFilled />
      <div className="like-info">
        {isMobile ? "164" : "Lê Huy Du, Nguyễn Thị Bình và 150 người khác"}
      </div>
      <label className="comment-info">5 Binh luan</label>
    </div>
  );
}

export default LikeInfo;
