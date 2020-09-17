import React, { useCallback, useState, useEffect } from "react";
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
import { getArrayImg, renderNotePost, renderNoteLike, renderNoteComment, genderAvatarUrl } from "../../utils";
import { SRLWrapper, useLightbox } from "simple-react-lightbox";
import { useMemo } from "react";

function Home() {
  const listNewFeed = useSelector(state => state.newFeedReducer.listNewFeed);
  const isLoadingNewFeed = useSelector(state => state.newFeedReducer.isLoadingNewFeed);
  const avatarReducer = useSelector(state => state.loginReducer.userDetail?.avatar);
  const fullName = useSelector(state => state.loginReducer.userDetail?.get_user_info?.fullName);
  const avatarUrl = genderAvatarUrl(avatarReducer);
  const dispatch = useDispatch();
  const { openLightbox } = useLightbox();
  const [limit, setLimit] = useState(10);
  const [listIMGView, setListIMGView] = useState([]);
  const [isView, setIsView] = useState(false);
  const [indexIMG, setIndexIMG] = useState(0);
  const [countView, setCountView] = useState(1);
  const [viewComment, setViewComment] = useState({});

  useEffect(() => {
    dispatch(actions.getNewFeedStart({ limit }));
  }, [limit]);

  const onViewImg = useCallback(
    (listIMG, index) => {
      setListIMGView(listIMG);
      setIndexIMG(index);
      setCountView(countView + 1);
      setIsView(true);
    },
    [listIMGView, isView, indexIMG]
  );

  useEffect(() => {
    if (isView && listIMGView.length) {
      setTimeout(() => {
        openLightbox(indexIMG);
      });
    }
  }, [isView, listIMGView, indexIMG]);

  const oncloseLightBox = () => {
    setIsView(false);
  };

  const renderLightBox = useMemo(() => {
    let result = [];
    for (let i = 1; i <= countView; i++) {
      result.push(
        <SRLWrapper
          key={i}
          onLightboxClosed={oncloseLightBox}
          options={OPTION_LiGHTBOX}
          images={listIMGView}
        />
      );
    }
    return result;
  }, [listIMGView]);

  const toggleViewComment = index => {
    setViewComment({ ...viewComment, [index]: !viewComment?.[index] });
  };

  const renderListNewFeed = () => {
    return listNewFeed.map((item, index) => {
      return (
        <Lazyload key={index} placeholder={<SkeletonNewFeed />} height={800} throttle={400}>
          <FadeIn delay={100} transitionDuration={500}>
            <div className="form-feed">
              <PostTop
                avatarUrl={genderAvatarUrl(item.avatarUrl)}
                fullName={item.fullName}
                created_at={item.created_at}
                note={renderNotePost(item.type, item.content, item.subjectName)}
              />
              <ContentNew
                caption={item.caption}
                callbackViewImg={onViewImg}
                avatarUrl={item.avatarUrl}
                tags={item.tag ? item.tag.split(",") : []}
                content={getArrayImg(item.content, item.type)}
                type={item.type}
              />
              <LikeInfo
                toggleComment={toggleViewComment}
                totalLike={item.totalLike}
                noteLike={renderNoteLike(item.totalLike, item.userLike)}
                noteComment={renderNoteComment(item.totalComment)}
                index={item.id}
              />
              <ActionNew itemNews={item} />
              { viewComment?.[item.id] && <Comment avatarUrl={avatarUrl} listComment={item?.listComment} /> }
            </div>
          </FadeIn>
        </Lazyload>
      );
    });
  };

  return (
    <div>
      <FormAddNew
        fullName={fullName}
        avatarUrl={avatarUrl}/>
      {isView && renderLightBox}
      {listNewFeed.length !== 0 && renderListNewFeed()}
      {isLoadingNewFeed && <SkeletonNewFeed />}
    </div>
  );
}

export default Home;
