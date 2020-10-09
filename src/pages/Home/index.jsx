import React, { useCallback, useState, useEffect, useMemo } from "react";
import FormPostTop from "../../components/FormPostTop";
import Lazyload from "react-lazyload";
import FadeIn from "react-fade-in";
import { actions } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import SkeletonNewFeed from "../../components/SkeletonFeed";
import PostTop from "../../components/News/PostTop";
import ContentNew from "../../components/News/ContentNew";
import LikeInfo from "../../components/News/LikeInfo";
import ModalCommon from "../../components/Modal";
import ActionNew from "../../components/News/ActionNew";
import Comment from "../../components/News/Comment";
import { OPTION_LiGHTBOX, TYPE_FEED } from "../../common";
import FormAddNew from "../../components/FormAddNew";
import {
  getArrayImg,
  renderNotePost,
  renderNoteLike,
  renderNoteComment,
  genderAvatarUrl,
  renderCurrentFilterFeed,
  checkIncludeArray,
} from "../../utils";
import { SRLWrapper, useLightbox } from "simple-react-lightbox";
import { useTranslation } from "react-i18next";

function Home({ ...props }) {
  const { params } = props.match;
  const listNewFeed = useSelector(state => state.newFeedReducer.listNewFeed);
  const isLoadingNewFeed = useSelector(state => state.newFeedReducer.isLoadingNewFeed);
  const avatarReducer = useSelector(state => state.loginReducer.userDetail?.avatar);
  const userId = useSelector(state => state.loginReducer.userDetail?.id);
  const fullName = useSelector(state => state.loginReducer.userDetail?.get_user_info?.fullName);
  const listSubject = useSelector(state => state.layoutReducer.listSubject);
  const isLoadingLike = useSelector(state => state.newFeedReducer.isLoadingLike);
  const isLoadingAddNewFeed = useSelector(state => state.newFeedReducer.isLoadingAddNewFeed);
  const isLoadingCommentBox = useSelector(state => state.newFeedReducer.isLoadingCommentBox);
  const listComment = useSelector(state => state.newFeedReducer.listComment);

  const { t } = useTranslation();
  const avatarUrl = genderAvatarUrl(avatarReducer);
  const dispatch = useDispatch();
  const { openLightbox } = useLightbox();
  const [listIMGView, setListIMGView] = useState([]);
  const [isView, setIsView] = useState(false);
  const [indexIMG, setIndexIMG] = useState(0);
  const [countView, setCountView] = useState(1);
  const [viewComment, setViewComment] = useState({});
  const [visibleFormAddNew, setVisibleFormAddNew] = useState(false);
  const [typeNew, setTypeNew] = useState(null);
  const [currentValue, setCurrentValue] = useState(null);

  useEffect(() => {
    setFetchData();
  }, []);

  useEffect(() => {
    const { params } = props.match;
    if (params?.postId && currentValue?.postId && params.postId !== currentValue.postId) {
      setFetchData();
    }
  }, [props]);

  const setFetchData = () => {
    let cureentFilter = renderCurrentFilterFeed(props, currentValue);
    setCurrentValue(cureentFilter);
  };

  useEffect(() => {
    if (currentValue) {
      dispatch(actions.getNewFeedStart(currentValue));
    }
  }, [currentValue]);

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
    dispatch(actions.getListCommentStart(index));
  };

  const toggleLike = (postId, typeLike) => {
    dispatch(actions.putLikeFeedStart({ postId, typeLike }));
  };

  const closeFormAddNew = () => {
    setVisibleFormAddNew(false);
  };

  const onAddNewRequest = useCallback(values => {
    dispatch(actions.postAddNewFeedStart(values));
  }, []);

  const renderFormAddNew = useMemo(() => {
    return (
      <ModalCommon
        visible={visibleFormAddNew}
        width={600}
        title={t("news_feed.add_new")}
        onCancel={closeFormAddNew}
        isLoadingSpin={isLoadingAddNewFeed}
        content={
          <FormAddNew
            listSubject={listSubject}
            isLoadingAddNewFeed={isLoadingAddNewFeed}
            visibleFormAddNew={visibleFormAddNew}
            callbackAddNew={onAddNewRequest}
            avatarUrl={avatarUrl}
            fullName={fullName}
            typeNew={typeNew}
          />
        }
      />
    );
  }, [visibleFormAddNew, isLoadingAddNewFeed, listSubject, typeNew]);

  const openFormAddNew = useCallback(
    type => () => {
      setTypeNew(type);
      setVisibleFormAddNew(true);
    },
    [visibleFormAddNew]
  );

  useEffect(() => {
    if (!isLoadingAddNewFeed && visibleFormAddNew) {
      setVisibleFormAddNew(false);
    }
  }, [isLoadingAddNewFeed]);

  const renderListNewFeed = () => {
    return listNewFeed.map((item, index) => {
      const isLikeByMe = checkIncludeArray(userId, item.listUserLike.toString().split(","));
      return (
        <Lazyload key={index} placeholder={<SkeletonNewFeed />} height={200} throttle={400}>
          <FadeIn delay={100} transitionDuration={500}>
            <div className="form-feed">
              <PostTop
                avatarUrl={genderAvatarUrl(item.avatarUrl)}
                fullName={item.fullName}
                created_at={item.created_at}
                note={renderNotePost(item.type, item.content, item.subjectName, listSubject)}
              />
              <ContentNew
                caption={item.caption}
                callbackViewImg={onViewImg}
                avatarUrl={item.avatarUrl}
                tags={item.tag ? item.tag.toString().split(",") : []}
                content={getArrayImg(item.content, item.type)}
                type={item.type}
              />
              <LikeInfo
                toggleComment={toggleViewComment}
                totalLike={item.totalLike}
                noteLike={renderNoteLike(item.totalLike, item.userLike, isLikeByMe)}
                noteComment={renderNoteComment(item.totalComment)}
                index={item.id}
              />
              <ActionNew
                toggleLike={toggleLike}
                isLoadingLike={isLoadingLike}
                itemNews={item}
                isLikeByMe={isLikeByMe}
                index={item.id}
              />
              {viewComment?.[item.id] && (
                <Comment
                  postId={item.id}
                  isLoadingWrapper={isLoadingCommentBox[item.id]}
                  avatarUrl={avatarUrl}
                  listComment={listComment[item.id]}
                />
              )}
            </div>
          </FadeIn>
        </Lazyload>
      );
    });
  };

  return (
    <div>
      <FormPostTop
        fullName={fullName}
        avatarUrl={avatarUrl}
        callBackOpenFormAddNew={openFormAddNew}
      />
      {isView && renderLightBox}
      {listNewFeed.length !== 0 && renderListNewFeed()}
      {isLoadingNewFeed && <SkeletonNewFeed />}
      {renderFormAddNew}
    </div>
  );
}

export default Home;
