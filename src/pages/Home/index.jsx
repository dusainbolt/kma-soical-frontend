import React from "react";
import { Row } from "antd";
import NotFound from "../NotFound";
import FormAddNew from "../../components/FormAddNew";
import News from "../../components/News";

function Home() {
  return (
    <Row className="" justify="center">
      <FormAddNew />
      <News />

      <NotFound />
      <NotFound />
    </Row>
  );
}

export default Home;
