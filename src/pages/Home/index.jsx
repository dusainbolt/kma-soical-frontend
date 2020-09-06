import React from "react";
import { Row } from "antd";
import NotFound from "../NotFound";
function Home() {
  return (
    <Row className="not-found" justify="center">
      <div>Day la home page</div>
      <NotFound />
      <NotFound />
      <NotFound />
      <NotFound />
      <NotFound />
    </Row>
  );
}

export default Home;
