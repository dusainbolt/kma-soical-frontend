import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { SendOutlined } from "@ant-design/icons";

export default function ButtonCommon({ title, iconSend, to, ...props }) {
  if (props.onlyLink) {
    return (
      <Link to={to} {...props}>
        {title}
      </Link>
    );
  } else {
    return to ? (
      <Link className="btn-link" to={to}>
        <Button {...props}>{title}</Button>
      </Link>
    ) : iconSend ? (
      <Button icon={<SendOutlined />} {...props}>
        {title}
      </Button>
    ) : (
      <Button {...props}>{title}</Button>
    );
  }
}
