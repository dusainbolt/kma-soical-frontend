import React, { useRef, useState } from "react";
import { Badge, Avatar, Comment, Tooltip, Spin } from "antd";
import AvatarDefault from "../../common/image/avatar-default.png";
import { DownCircleFilled, SendOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { validateMessage } from "../../common";
import { Field, Formik } from "formik";
import { genderAvatarUrl } from "../../utils";
import Input from "../Input";
import { useEffect } from "react";
import { useMemo } from "react";

function BoxChat() {
  const { t } = useTranslation();
  const initialVales = { message: "" };
  const chatBottomContainer = useRef(null);
  const boxMessage = useRef(null);
  const [heightBox, setHeightBox] = useState(41);
  const [userIdChat, setUserIdChat] = useState(0);
  const userId = 2;

  const onChange = (setFieldValue, name) => ({ target: { value } }) => {
    const heightMessage = boxMessage.current.clientHeight;
    const heightContainer = chatBottomContainer.current.clientHeight;
    setFieldValue(name, value);
    setTimeout(() => {
      const height = document.getElementById("inputBox").clientHeight;
      const durationHeight = height - heightBox;
      const heightCtn = durationHeight === 0 ? heightContainer : heightContainer + durationHeight;
      const heightMess = durationHeight === 0 ? heightMessage : heightMessage - durationHeight;
      setHeightBox(height);
      chatBottomContainer.current.style.height = `${heightCtn}px`;
      boxMessage.current.style.height = `${heightMess}px`;
      // boxMessage.current.scrollTop = boxMessage.current.scrollHeight;
    }, 1);
  };

  const listChat = [
    {
      avatarUrl: AvatarDefault,
      content: "ABCCCCC",
      type: null,
      userId: 1,
      createAt: 1600134710,
      isRead: null,
    },
    {
      avatarUrl: AvatarDefault,
      content: "ABC 2",
      type: null,
      userId: 1,
      createAt: 1600134710,
      isRead: null,
    },
    {
      avatarUrl: AvatarDefault,
      content: "ABCCCCC",
      type: null,
      userId: 2,
      createAt: 1600134710,
      isRead: null,
    },
    {
      avatarUrl: AvatarDefault,
      content: "ABC 2",
      type: null,
      userId: 1,
      createAt: 1600134710,
      isRead: null,
    },
    {
      avatarUrl: AvatarDefault,
      content: "ABCCCCC",
      type: null,
      userId: 2,
      createAt: 1600134710,
      isRead: null,
    },
    {
      avatarUrl: AvatarDefault,
      content: "ABC 2",
      type: null,
      userId: 2,
      createAt: 1600134710,
      isRead: null,
    },
    {
      avatarUrl: AvatarDefault,
      content: "ABCCCCC",
      type: null,
      userId: 1,
      createAt: 1600134710,
      isRead: 1,
    },
    {
      avatarUrl: AvatarDefault,
      content: "ABC 2",
      userId: 1,
      createAt: 1600134710,
      isRead: 1,
    },
  ];

  const renderBoxmessage = useMemo(() => {
    return listChat.map((item, index) => {
      const content = (
        <Tooltip title={1600134710} color="orange">
          <p>{item.content}</p>
        </Tooltip>
      );
      const nextMess = item.userId === listChat[index-1]?.userId || item.userId === listChat[index+1]?.userId;
      const className = item.userId === userId ? "my-mess" : "";
      const classNameMessNext = nextMess ? "next-mess" : "";
      const avatar = className || item.userId === listChat[index-1]?.userId ? [] : genderAvatarUrl(item.avatarUrl);
      return (
        <Comment
          key={index}
          avatar={!className ? avatar.length ? <Avatar src={avatar} alt="avatar" /> : avatar : null}
          className={`${className} ${classNameMessNext} ${item.isRead ? "mess-wait" : ""}`}
          content={content}
        />
      );
    });
  }, [listChat]);

  useEffect(() => {
    boxMessage.current.scrollTop = boxMessage.current.scrollHeight;
  }, [boxMessage]);

  return (
    <div className="box-chat">
      <div className="box-chat__top">
        <div className="box-chat__top--avatar">
          <Badge className="active normal" dot>
            <Avatar className="avatar" src={AvatarDefault} alt="avatar" />
          </Badge>
        </div>
        <div className="box-chat__top--info active">
          Du sainbolt
          <div>Dang hoat dong</div>
        </div>
        <DownCircleFilled title={t("box-chat.close")} className="box-chat__top--icon-back" />
      </div>
      <div ref={boxMessage} className="box-chat__message">
        {renderBoxmessage}
        <Spin className="spin-load">
          <Comment className="my-mess" content={"Hello KMA-social, my name is Du. I'm verry happy for your app"} />
        </Spin>
      </div>
      <Formik validationSchema={validateMessage} initialValues={initialVales}>
        {({ handleSubmit, setFieldValue, errors, values }) => (
          <div className="box-chat__bottom" id="213" ref={chatBottomContainer}>
            <Avatar className="avatar" src={AvatarDefault} alt="avatar" />
            <Field
              name="message"
              component={Input}
              maxLength={255}
              onChange={onChange(setFieldValue, "message")}
              id="inputBox"
              showError={false}
              className="form-feed__bottom--comment"
              placeholder={"Enter message..."}
              onPressEnter={handleSubmit}
              autoSize={{ minRows: 1, maxRows: 4 }}
              type="textarea"
            />
            <SendOutlined className="box-chat__bottom--icon-send" />
          </div>
        )}
      </Formik>
    </div>
  );
}

export default BoxChat;
