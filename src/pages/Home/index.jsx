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
import { LIMIT, LIMIT_UPLOAD_NEW, OPTION_LiGHTBOX, TYPE_FEED } from "../../common";
import FormAddNew from "../../components/FormAddNew";
import {
  getArrayImg,
  renderNotePost,
  renderNoteLike,
  renderNoteComment,
  genderAvatarUrl,
  renderCurrentFilterFeed,
} from "../../utils";
import { SRLWrapper, useLightbox } from "simple-react-lightbox";
import { useTranslation } from "react-i18next";

function Home({ ...props }) {
  // const { params } = props.match;
  const listNewFeed = useSelector(state => state.newFeedReducer.listNewFeed);
  const isLoadingNewFeed = useSelector(state => state.newFeedReducer.isLoadingNewFeed);
  const avatarReducer = useSelector(state => state.loginReducer.userDetail?.avatar);
  const fullName = useSelector(state => state.loginReducer.userDetail?.get_user_info?.fullName);
  const listSubject = useSelector(state => state.layoutReducer.listSubject);
  const isLoadingAddNewFeed = useSelector(state => state.newFeedReducer.isLoadingAddNewFeed);
  const { t } = useTranslation();
  const avatarUrl = genderAvatarUrl(avatarReducer);
  const dispatch = useDispatch();
  const { openLightbox } = useLightbox();
  const [listIMGView, setListIMGView] = useState([]);
  const [isView, setIsView] = useState(false);
  const [indexIMG, setIndexIMG] = useState(0);
  const [countView, setCountView] = useState(1);
  const [viewComment, setViewComment] = useState({});
  const [viewLike, setViewLike] = useState({});
  const [visibleFormAddNew, setVisibleFormAddNew] = useState(false);
  const [typeNew, setTypeNew] = useState(null);
  const [currentValue, setCurrentValue] = useState(null);

  useEffect(() => {
    return () => {
      let cureentFilter = renderCurrentFilterFeed(props, currentValue);
      setCurrentValue(cureentFilter);
    };
  }, [props.match.params]);

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
  };

  const toggleLike = index => {
    console.log(index);
    setViewLike({ ...viewLike, [index]: !viewLike?.[index] });
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
                noteLike={renderNoteLike(item.totalLike, item.userLike)}
                noteComment={renderNoteComment(item.totalComment)}
                index={item.id}
              />
              <ActionNew
                toggleLike={toggleLike}
                itemNews={item}
                viewLike={viewLike?.[item.id]}
                index={item.id}
              />
              {viewComment?.[item.id] && (
                <Comment avatarUrl={avatarUrl} listComment={item?.listComment} />
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
