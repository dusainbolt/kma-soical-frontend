import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

export default function ButtonCommon({ title, to, ...props }) {
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
    ) : (
      <Button {...props}>{title}</Button>
    );
  }
}
