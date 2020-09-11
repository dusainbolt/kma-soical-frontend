import React from "react";
import {
  GlobalOutlined,
  EllipsisOutlined,
  HeartFilled,
  HeartOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
function PostTop() {
  const isMobile = useSelector(state => state.layoutReducer.isMobile);
  return (
    <div className="form-feed__top">
      <img className="avatar" src="https://www.w3schools.com/howto/img_avatar.png" alt="avatar" />
      <div className="form-feed__top--info">
        <div className="form-feed__top--name">Du sainbolt</div>
        <span className="form-feed__top--time">
          1 Giờ <GlobalOutlined className="form-feed__top--i-security" />
        </span>
      </div>
      <EllipsisOutlined className="form-feed__top--i-action" onClick={() => console.log("ok") } />
    </div>
  );
}

export default PostTop;
