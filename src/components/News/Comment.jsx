import React, { createElement, useState } from "react";
import { Comment, Tooltip, Avatar } from "antd";
import moment from "moment";
import { validateMessage } from "../../common";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
  SendOutlined,
} from "@ant-design/icons";
import Input from "../Input";
import { Formik, Field } from "formik";
import { REP_COMMENT } from "../../common";
import { Link } from "react-router-dom";
import { genderAvatarUrl, genderTimeCount } from "../../utils";
import LazyLoad from "react-lazyload";
import FadeIn from "react-fade-in";
import { useTranslation } from "react-i18next";
import LoadComment from "../LoadComment";

function CommentPost({ listComment, avatarUrl, isLoadingWrapper }) {
  const [likes, setLikes] = useState(0);
  const [action, setAction] = useState(null);
  const { t } = useTranslation();
  const initialVales = { message: "" };

  const like = () => {
    setLikes(1);
    setAction("liked");
  };

  const [repCommentId, setCommentId] = useState(0);
  const changeRepCommentId = id => () => {
    setCommentId(id);
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === "liked" ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <span onClick={changeRepCommentId(1)} key="comment-basic-reply-to">
      Trả lời
    </span>,
    <span key="comment-basic-reply-to">20 gio</span>,
  ];

  const renderCommentItem = type => {
    return (
      <>
        <Comment
          actions={actions}
          author={<Link to="/home">Du sainbolt</Link>}
          avatar={
            <img
              src="https://i.pinimg.com/474x/df/a3/30/dfa330b9b18a760b688af707b9b3f0af.jpg"
              alt="du sainbolt"
            />
          }
          content={
            <p>
              "Chắc hẳn anh em khi tham gia dự án, cũng đều nghe về khái niệm UI/UX rồi đúng không ?
              Nhưng đối với một số bạn mới đi làm
            </p>
          }
        >
          {type === REP_COMMENT && repCommentId !== 0 && (
            <Formik validationSchema={validateMessage} initialValues={initialVales}>
              {formik => (
                <div className="form-feed__bottom">
                  <img className="form-feed__bottom--img" src={avatarUrl} alt="avatar" />
                  <Field
                    name="message"
                    component={Input}
                    maxLength={255}
                    showError={false}
                    className="form-feed__bottom--comment"
                    placeholder={"Enter message..."}
                    autoSize
                    onPressEnter={formik.handleSubmit}
                    Icon={SendOutlined}
                    callHandleIcon={formik.handleSubmit}
                    type="textarea"
                  />
                </div>
              )}
            </Formik>
          )}
        </Comment>
      </>
    );
  };

  const renderListComment = () => {
    if (!listComment?.length) return;
    return listComment.map((item, index) => {
      return (
        // <LazyLoad key={item.id} placeholder={<SkeletonNewFeed />} height={200} throttle={400}>
        <LazyLoad key={item.id} height={50} throttle={200}>
          <FadeIn delay={100} transitionDuration={500}>
            <Comment
              actions={[
                <Tooltip key="comment-basic-like" title={t("news_feed.like")}>
                  <span className="comment-info" onClick={like}>
                    {t("news_feed.like")}
                    {item.countLike !== 0 &&
                      createElement(action === "liked" ? LikeFilled : LikeOutlined) && (
                      <span className="comment-action">{item.countLike}</span>
                    )}
                  </span>
                </Tooltip>,
                <span
                  className="comment-info"
                  onClick={changeRepCommentId(1)}
                  key="comment-basic-reply-to"
                >
                  {t("news_feed.rep_comment")}
                </span>,
                <span key="comment-basic-reply-to">{genderTimeCount(item.created_at)}</span>,
              ]}
              author={<Link to="/home">{item.fullName}</Link>}
              avatar={<img src={genderAvatarUrl(item.avatarUrl)} alt="avatar" />}
              content={<p>{item.content}</p>}
            >
              {renderCommentItem()}
            </Comment>
          </FadeIn>
        </LazyLoad>
      );
    });
  };

  return (
    <div className="form-feed__comment">
      {renderListComment()}
      {isLoadingWrapper && <LoadComment total={5} className="load-list-comment"/>}
      <Formik validationSchema={validateMessage} initialValues={initialVales}>
        {formik => (
          <div className="form-feed__bottom">
            <img className="form-feed__bottom--img" src={avatarUrl} alt="avatar" />
            <Field
              name="message"
              component={Input}
              maxLength={255}
              showError={false}
              className="form-feed__bottom--comment"
              placeholder={"Enter message..."}
              autoSize
              onPressEnter={formik.handleSubmit}
              Icon={SendOutlined}
              callHandleIcon={formik.handleSubmit}
              type="textarea"
            />
          </div>
        )}
      </Formik>
    </div>
  );
}

export default CommentPost;
