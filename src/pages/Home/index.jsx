import React from "react";
import { Row } from "antd";
import NotFound from "../NotFound";
import FormAddNew from "../../components/FormAddNew";
import News from "../../components/News";
import Lazyload from "react-lazyload";
import FadeIn from "react-fade-in";

function Home() {
  return (
    <>
      {/* <FormAddNew /> */}
      <Lazyload height={200}  offset={100} throttle={400}>
        <News />
      </Lazyload >
      <Lazyload height={200}  offset={100} throttle={400}>
        <News />
      </Lazyload >
      <Lazyload height={200}  offset={100} throttle={400}>
        <News />
      </Lazyload >
      <Lazyload height={200}  offset={100} throttle={400}>
        <News />
      </Lazyload >
      <Lazyload height={200}  offset={100} throttle={400}>
        <News />
      </Lazyload >

    </>
  );
}

export default Home;
