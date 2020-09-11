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
import LazyloadImg from "../LazyLoadingImg";
import Input from "../Input";
import logo1 from "../../common/image/LogoSidebar.png";
import { Formik, Field } from "formik";
import { REP_COMMENT } from "../../common";
import { Link } from "react-router-dom";
function CommentPost({ className = "" }) {
  const [likes, setLikes] = useState(0);
  const [action, setAction] = useState(null);

  const like = () => {
    setLikes(1);
    setAction("liked");
  };

  const initialVales = { message: "" };
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

  const renderCommentItem = (child, type) => {
    console.log(type);
    return (
      <>
        <Comment
          actions={actions}
          author={<Link>Du sainbolt</Link>}
          avatar={
            <img
              src="https://i.pinimg.com/474x/df/a3/30/dfa330b9b18a760b688af707b9b3f0af.jpg"
              alt="du sainbolt"
            />
          }
          content={
            <p>
              "Chắc hẳn anh em khi tham gia dự án, cũng đều nghe về khái niệm UI/UX rồi đúng không ?
              Nhưng đối với một số bạn mới đi làm, và Inputcó thể đang chập chững bước vào nghề thì
              có thể cũng chưa nghe qua về khái niệm này.
            </p>
          }
        >
          {child}
          {child}
          {child}
          {child}
          {type === REP_COMMENT && repCommentId !== 0 && (
            <Formik validationSchema={validateMessage} initialValues={initialVales}>
              {formik => (
                <div className="form-feed__bottom">
                  <img
                    className="form-feed__bottom--img"
                    
                    src="https://www.w3schools.com/howto/img_avatar.png"
                    alt="avatar"
                  />
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

  return (
    <div className="form-feed__comment">
      {renderCommentItem(renderCommentItem(), REP_COMMENT)}
      <Formik validationSchema={validateMessage} initialValues={initialVales}>
        {formik => (
          <div className="form-feed__bottom">
            <img
              className="form-feed__bottom--img"
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="avatar"
            />
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
