import React, { memo } from "react";
import logo from "../../common/image/logo.png";
import { Row, Col } from "antd";

function Welcome() {
  return (
    // <Row gutter={{ xs: 24, sm: 24, md: 24, lg: 32 }} className="row">
    <Row className="my-row welcome">
      <Col className="my-row--col-height" xs={8} sm={4} md={4} lg={4} xl={12}>
        <h1>12312312</h1>
      </Col>
      <Col className="my-row--col-height" xs={8} sm={4} md={4} lg={4} xl={12}>
      <h1>Love written in the blocks.
</h1>
      </Col>
    </Row>
  );
}

export default memo(Welcome);
