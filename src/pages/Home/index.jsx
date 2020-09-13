import React, { useCallback, useState, useEffect, useRef } from "react";
import FormAddNew from "../../components/FormAddNew";
import Lazyload from "react-lazyload";
import FadeIn from "react-fade-in";
import { actions } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import SkeletonNewFeed from "../../components/SkeletonFeed";
import PostTop from "../../components/News/PostTop";
import ContentNew from "../../components/News/ContentNew";
import LikeInfo from "../../components/News/LikeInfo";
import ActionNew from "../../components/News/ActionNew";
import Comment from "../../components/News/Comment";
import { OPTION_LiGHTBOX } from "../../common";
import { genderContent } from "../../utils";
import { SRLWrapper, useLightbox } from "simple-react-lightbox";
import { useMemo } from "react";

function Home() {
  const listNewFeed = useSelector(state => state.newFeedReducer.listNewFeed);
  const isLoadingNewFeed = useSelector(state => state.newFeedReducer.isLoadingNewFeed);
  const dispatch = useDispatch();
  const { openLightbox } = useLightbox();
  const [limit, setLimit] = useState(10);
  const [listIMGView, setListIMGView] = useState([]);
  const [captionIMGView, setCaptionIMGView] = useState([]);
  const [isView, setIsView] = useState(false);
  const [indexIMG, setIndexIMG] = useState(0);
  const [countView, setCountView] = useState(1);
  useEffect(() => {
    dispatch(actions.getNewFeedStart({ limit }));
  }, [limit]);

  useEffect(() => {
    if (listNewFeed.length) {
      console.log(listNewFeed);
    }
  }, [listNewFeed]);

  const onViewImg = useCallback(
    (listIMG, listCaption, index) => {
      setListIMGView(listIMG);
      setCaptionIMGView(listCaption);
      setIndexIMG(index);
      setCountView(countView + 1);
      setIsView(true);
    },
    [listIMGView, captionIMGView, isView, indexIMG]
  );

  useEffect(() => {
    console.log("on---------------> light boxxxxxxxxxx");
    if(isView && listIMGView.length && captionIMGView.length){
      setTimeout(() => {
        openLightbox(indexIMG);
      });
    }
  }, [isView, listIMGView, captionIMGView, indexIMG]);

  const oncloseLightBox = () => {
    setIsView(false);
  };

  const renderLightBox = useMemo(()=>{
    let result = [];
    for(let i = 1; i <= countView; i++){
      result.push(<SRLWrapper onLightboxClosed={oncloseLightBox} options={OPTION_LiGHTBOX} images={listIMGView} />);
    }
    return result;
  },[listIMGView]);

  const renderListNewFeed = () => {
    return listNewFeed.map((item, index) => {
      return (
        <Lazyload key={index} placeholder={<SkeletonNewFeed />} height={200} throttle={400}>
          <FadeIn delay={100} transitionDuration={500}>
            <div className="form-feed">
              <PostTop
                avatarUrl={item.avatarUrl}
                fullName={item.fullName}
                created_at={item.created_at}
              />
              <ContentNew
                caption={item.caption}
                callbackViewImg={onViewImg}
                avatarUrl={item.avatarUrl}
                content={genderContent(item.content, item.type)}
                type={item.type}
              />
              <LikeInfo itemNews={item} />
              <ActionNew itemNews={item} />
              <Comment itemNews={item} />
            </div>
          </FadeIn>
        </Lazyload>
      );
    });
  };

  return (
    <div>
      <FormAddNew />
      {isView && renderLightBox};
      {listNewFeed.length !== 0 && renderListNewFeed()}
      {isLoadingNewFeed && <SkeletonNewFeed />}
    </div>
  );
}

export default Home;
