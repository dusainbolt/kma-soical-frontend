import React from "react";
import { Skeleton } from "antd";

function LoadBoxChat({ total = 1 }) {
  const renderListLoad = () => {
    const html = [];
    for (let i = 0; i < total; i++) {
      const check = i % 2 ? true : false;
      html.push(
        <div key={i} className={`load-comment no-${i} ${check ? "chat-left" : "chat-right"}`}>
          <Skeleton avatar={check ? true : null} paragraph={{ rows: 0 }} active />
        </div>
      );
    }
    return html;
  };

  return renderListLoad();
}
export default LoadBoxChat;
