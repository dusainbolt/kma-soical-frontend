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
function CommentPost({ className = "" }) {
  const [likes, setLikes] = useState(0);
  const [action, setAction] = useState(null);

  const like = () => {
    setLikes(1);
    setAction("liked");
  };

  const initialVales = { message: "" };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === "liked" ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Reply to</span>,
    <span key="comment-basic-reply-to">20 gio</span>,
  ];

  const renderCommentItem = child => {
    return (
      <Comment
        actions={actions}
        author={<a>Han Solo</a>}
        avatar={
          <img
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
        }
        content={
          <p>
            "Chắc hẳn anh em khi tham gia dự án, cũng đều nghe về khái niệm UI/UX rồi đúng không ?
            Nhưng đối với một số bạn mới đi làm, và Inputcó thể đang chập chững bước vào nghề thì có
            thể cũng chưa nghe qua về khái niệm này.
          </p>
        }
      >
        {child}
      </Comment>
    );
  };

  return (
    <div className="form-feed__comment">
      {renderCommentItem(renderCommentItem())}
      <Formik validationSchema={validateMessage} initialValues={initialVales}>
        {formik => (
          <div className="form-feed__bottom">
            <img
              className="form-feed__bottom--img"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
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
