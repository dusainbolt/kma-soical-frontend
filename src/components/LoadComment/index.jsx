import React from "react";
import { Skeleton } from "antd";

function LoadComment({ rowsText = null, className, total = 1 }) {
  const renderListLoad = () => {
    const html = [];
    for (let i = 0; i < total; i++) {
      html.push(
        <div key={i} className={`load-comment ${className}`}>
          <Skeleton avatar paragraph={{ rows: 0 }} active />
          {rowsText !== null && <Skeleton paragraph={{ rows: rowsText }} active />}
        </div>
      );
    }
    return html;
  };

  return renderListLoad();
}
export default LoadComment;
