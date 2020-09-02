import React from "react";

function Dot({ className = "" }) {
  return (
    <div className={`dot-loading ${className}`}>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
    </div>
  );
}

export default Dot;
