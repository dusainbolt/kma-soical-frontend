import React from "react";
import { Row } from "antd";
import NotFound from "../NotFound";
import FormAddNew from "../../components/FormAddNew";
import News from "../../components/News";
import Lazyload from "react-lazyload";
import FadeIn from "react-fade-in";
import { useEffect } from "react";
import { actions } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import SkeletonNewFeed from "../../components/SkeletonFeed";

function Home() {
  const listNewFeed = useSelector(state => state.newFeedReducer.listNewFeed);
  const isLoadingNewFeed = useSelector(state => state.newFeedReducer.isLoadingNewFeed);
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    dispatch(actions.getNewFeedStart({ limit }));
  }, [limit]);

  return (
    <div>
      <FormAddNew />
      {listNewFeed.length !== 0 && (
        <>
          <Lazyload placeholder={<SkeletonNewFeed />} height={200} throttle={400}>
            <FadeIn delay={100} transitionDuration={500}>
              <News type={true}/>
            </FadeIn>
          </Lazyload>
          <Lazyload placeholder={<SkeletonNewFeed />} height={200} throttle={400}>
            <FadeIn delay={100} transitionDuration={500}>
              <News />
            </FadeIn>
          </Lazyload>
          <Lazyload placeholder={<SkeletonNewFeed />} height={200} throttle={400}>
            <FadeIn delay={100} transitionDuration={500}>
              <News />
            </FadeIn>
          </Lazyload>
          <Lazyload placeholder={<SkeletonNewFeed />} height={200} throttle={400}>
            <FadeIn delay={100} transitionDuration={500}>
              <News />
            </FadeIn>
          </Lazyload>
          <Lazyload placeholder={<SkeletonNewFeed />} height={200} throttle={400}>
            <FadeIn delay={100} transitionDuration={500}>
              <News />
            </FadeIn>
          </Lazyload>
          <Lazyload placeholder={<SkeletonNewFeed />} height={200} throttle={400}>
            <FadeIn delay={100} transitionDuration={500}>
              <News />
            </FadeIn>
          </Lazyload>
          <Lazyload placeholder={<SkeletonNewFeed />} height={200} throttle={400}>
            <FadeIn delay={100} transitionDuration={500}>
              <News />
            </FadeIn>
          </Lazyload>
        </>
      )}
      { isLoadingNewFeed && <SkeletonNewFeed /> }
    </div>
  );
}

export default Home;
