import React from "react";
import { Button } from "antd";

export default function ButtonCommon({ title, ...props }) {
  return <Button {...props}>{title}</Button>;
}
