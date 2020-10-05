import React from "react";
import {
  GlobalOutlined,
  EllipsisOutlined,
  HeartFilled,
  HeartOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
function ActionNew({ toggleLike, index, viewLike }) {
  console.log("--------------------->", viewLike);
  const [isLoaddingLike, setIsLoaddingLike] = useState(false);
  useEffect(()=>{

  });
  return (
    <div className="form-feed__action-post">
      <div onClick={() => toggleLike(index)}  className="form-feed__action-post--item">
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
