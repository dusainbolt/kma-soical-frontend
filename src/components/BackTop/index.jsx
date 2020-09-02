import React from "react";
import { BackTop } from "antd";
import { UpOutlined  } from "@ant-design/icons";

function BackTopCommon() {
  return (
    <BackTop className="back-top-wrapper">
      <UpOutlined  className="back-top"></UpOutlined >
    </BackTop>
  );
}
export default BackTopCommon;
