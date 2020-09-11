import React from "react";
import {
  GlobalOutlined,
  EllipsisOutlined,
  HeartFilled,
  HeartOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
function ActionNew() {
  const isMobile = useSelector(state => state.layoutReducer.isMobile);
  return (
    <div className="form-feed__action-post">
    {/* <HeartFilled /> */}
    <div className="form-feed__action-post--item">
      <HeartOutlined />
      <span className="action-post">Thich</span>
    </div>
    <div className="form-feed__action-post--item">
      <MessageOutlined />
      <span className="action-post">Bình luận</span>
    </div>
  </div>
  );
}

export default ActionNew;