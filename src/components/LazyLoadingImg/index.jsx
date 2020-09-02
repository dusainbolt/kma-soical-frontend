import React from "react";
import Lazyload from "react-lazyload";
import FadeIn from "react-fade-in";

export default function LazyloadImg({
  delayThrottle,
  height,
  ...props
}) {
  return (
    <Lazyload throttle={delayThrottle ? delayThrottle : 400} height={height}>
      <FadeIn delay={100} transitionDuration={400}>
        <img {...props} />
      </FadeIn>
    </Lazyload>
  );
}

