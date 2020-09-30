import React from "react";
import { LockFilled, CaretDownFilled } from "@ant-design/icons";

function SecurityStatus() {
  return (
    <div className="security-status">
      <LockFilled />
      <span>Công khai</span>
      <CaretDownFilled />
    </div>
  );
}

export default SecurityStatus;
