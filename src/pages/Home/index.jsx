import React from "react";
import { Row } from "antd";
import NotFound from "../NotFound";
import FormAddNew from "../../components/FormAddNew";
function Home() {
  return (
    <Row className="" justify="center">
      <FormAddNew />
     
      <NotFound />
      <NotFound />
      <NotFound />
      <NotFound />
      <NotFound />
    </Row>
  );
}

export default Home;
