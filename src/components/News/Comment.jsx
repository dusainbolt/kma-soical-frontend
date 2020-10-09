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
import {
  filterArray,
  genderAvatarUrl,
  genderTimeCount,
  getRandomInt,
  getRandomString,
} from "../../utils";
import LazyLoad from "react-lazyload";
import FadeIn from "react-fade-in";
import { useTranslation } from "react-i18next";
import LoadComment from "../LoadComment";
import BoxComment from "../BoxComment";
import { useMemo } from "react";
import { useEffect } from "react";

function CommentPost({
  listComment,
  userId,
  avatarUrl,
  postId,
  fullName,
  isLoadingWrapper,
  callbackAddComment,
  indexLoadComment,
}) {
  const { t } = useTranslation();
  const [likes, setLikes] = useState(0);
  const [action, setAction] = useState(null);
  const [arrayLoadComment, setArrayLoadComment] = useState([]);
  const initialVales = { message: "", postId: postId };

  const like = () => {
    setLikes(1);
    setAction("liked");
  };

  const [repCommentId, setCommentId] = useState(0);
  const changeRepCommentId = id => () => {
    setCommentId(id);
  };

  // const actions = [
  //   <Tooltip key="comment-basic-like" title="Like">
  //     <span onClick={like}>
  //       {createElement(action === "liked" ? LikeFilled : LikeOutlined)}
  //       <span className="comment-action">{likes}</span>
  //     </span>
  //   </Tooltip>,
  //   <span onClick={changeRepCommentId(1)} key="comment-basic-reply-to">
  //     Trả lời
  //   </span>,
  //   <span key="comment-basic-reply-to">20 gio</span>,
  // ];

  // const renderCommentItem = type => {
  //   return (
  //     <>
  //       <Comment
  //         actions={actions}
  //         author={<Link to="/home">Du sainbolt</Link>}
  //         avatar={
  //           <img
  //             src="https://i.pinimg.com/474x/df/a3/30/dfa330b9b18a760b688af707b9b3f0af.jpg"
  //             alt="du sainbolt"
  //           />
  //         }
  //         content={
  //           <p>
  //             "Chắc hẳn anh em khi tham gia dự án, cũng đều nghe về khái niệm UI/UX rồi đúng không ?
  //             Nhưng đối với một số bạn mới đi làm
  //           </p>
  //         }>
  //         {type === REP_COMMENT && repCommentId !== 0 && (
  //           <Formik validationSchema={validateMessage} initialValues={initialVales}>
  //             {formik => (
  //               <div className="form-feed__bottom">
  //                 <img className="form-feed__bottom--img" src={avatarUrl} alt="avatar" />
  //                 <Field
  //                   name="message"
  //                   component={Input}
  //                   maxLength={255}
  //                   showError={false}
  //                   className="form-feed__bottom--comment"
  //                   placeholder={"Enter message..."}
  //                   autoSize
  //                   onPressEnter={formik.handleSubmit}
  //                   Icon={SendOutlined}
  //                   callHandleIcon={formik.handleSubmit}
  //                   type="textarea"
  //                 />
  //               </div>
  //             )}
  //           </Formik>
  //         )}
  //       </Comment>
  //     </>
  //   );
  // };

  useEffect(() => {
    console.log("-------------------->", indexLoadComment);
    setArrayLoadComment(filterArray(arrayLoadComment, "key", indexLoadComment));
  }, [indexLoadComment]);

  const onSubmitComment = (values, { resetForm }) => {
    if (!values.message);
    resetForm();
    const key = getRandomString(30);
    const valueSubmit = { ...values, key };
    const commentObject = {
      ...valueSubmit,
      avatarUrl,
      childId: null,
      content: values.message,
      countLike: 0,
      fullName,
      id: key,
      isHot: 0,
      className: "loading",
      postId,
      created_at: new Date().getTime(),
      updated_at: new Date().getTime(),
      userId,
    };
    setArrayLoadComment(oldArray => oldArray.concat(commentObject));
    callbackAddComment(valueSubmit);
  };

  const renderBoxComment = listCommentData => {
    if (!listCommentData?.length) return;
    return listCommentData.map((item, index) => {
      return (
        <LazyLoad key={item.id} height={1} throttle={10}>
          <FadeIn delay={10} transitionDuration={10}>
            <BoxComment className={item?.className} comment={item} />
          </FadeIn>
        </LazyLoad>
      );
    });
  };

  const renderListCommentLoad = useMemo(() => {
    return renderBoxComment(arrayLoadComment);
  }, [arrayLoadComment]);

  const renderListComment = useMemo(() => {
    return renderBoxComment(listComment);
  }, [listComment]);

  return (
    <div className="form-feed__comment">
      {renderListComment}
      {renderListCommentLoad}
      {isLoadingWrapper && <LoadComment total={5} className="load-list-comment" />}
      <Formik
        validationSchema={validateMessage}
        onSubmit={onSubmitComment}
        initialValues={initialVales}>
        {formik => (
          <div className="form-feed__bottom">
            <img className="form-feed__bottom--img" src={avatarUrl} alt="avatar" />
            <Field
              name="message"
              component={Input}
              maxLength={255}
              showError={false}
              className="form-feed__bottom--comment"
              placeholder={t("news_feed.place_comment")}
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
