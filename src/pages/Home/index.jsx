import React from "react";
import { Row } from "antd";
import NotFound from "../NotFound";
import FormAddNew from "../../components/FormAddNew";
import News from "../../components/News";
import Lazyload from "react-lazyload";
import FadeIn from "react-fade-in";

function Home() {
  return (
    <div>
      <FormAddNew />
      <Lazyload placeholder={<FormAddNew />} height={500} debounce={500}>
        <FadeIn delay={100} transitionDuration={400}>
          <News />
        </FadeIn>
      </Lazyload>
      <Lazyload placeholder={<FormAddNew />} height={500} debounce={500}>
        <FadeIn delay={100} transitionDuration={400}>
          <News />
        </FadeIn>
      </Lazyload>
    </div>
  );
}

export default Home;
