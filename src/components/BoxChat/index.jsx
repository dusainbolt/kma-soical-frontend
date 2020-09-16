import React, { useRef, useState, useMemo, useEffect } from "react";
import { Badge, Avatar, Comment, Tooltip, Spin } from "antd";
import AvatarDefault from "../../common/image/avatar-default.png";
import { DownCircleFilled, SendOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { validateMessage, TYPE_FEED } from "../../common";
import { Field, Formik } from "formik";
import { genderAvatarUrl, filterArray } from "../../utils";
import Input from "../Input";

function BoxChat({ idBoxChat, callbackSendMessage, indexLoad }) {
  const { t } = useTranslation();
  const chatBottomContainer = useRef(null);
  const boxMessage = useRef(null);
  const [heightBox, setHeightBox] = useState(41);
  const [arrayLoad, setArrayLoad] = useState([]);
  const [countLoad, setCountLoad] = useState(1);
  const initialVales = {
    message: "",
    type: TYPE_FEED.TEXT,
    userId: 1,
    idBoxChat: 2,
  };

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
    });
  };

  const onSubmit = (values, { resetForm }) => {
    if (!values.message) return;
    resetForm();
    const htmlLoad = [<Comment key={countLoad} className="my-mess next-mess" content={values.message} />];
    setArrayLoad(oldArray => oldArray.concat(htmlLoad));

    setCountLoad(countLoad + 1);
    callbackSendMessage({ ...values, indexLoad: countLoad });
    boxMessage.current.scrollTop = boxMessage.current.scrollHeight;
  };

  useEffect(()=>{
    indexLoad && setArrayLoad(filterArray(arrayLoad, "key", indexLoad.toString()));
  },[indexLoad]);

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
      content: "ABCCsssssssssssssssssssssCCC",
      type: null,
      userId: 1,
      createAt: 1600134710,
      isRead: null,
    },
    {
      avatarUrl: AvatarDefault,
      content: "Hello KMA-social, my name is Du. I'm verry happy for your app",
      type: null,
      userId: 1,
      createAt: 1600134710,
      isRead: null,
    },
    {
      avatarUrl: AvatarDefault,
      content: "Hello KMA-social, my name is Du. I'm verry happy for your app",
      type: null,
      userId: 2,
      createAt: 1600134710,
      isRead: null,
    },
    {
      avatarUrl: AvatarDefault,
      content: "ABC2",
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
      content: "ABC 2s ssssssssssssssssssssssssssssssssss",
      userId: 1,
      createAt: 1600134710,
      isRead: 1,
    },
  ];

  const renderBoxmessage = useMemo(() => {
    return listChat.map((item, index) => {
      const content = (
        <Tooltip title={1600134710} color="orange">
          <div>{item.content}</div>
        </Tooltip>
      );
      const nextMess =
        item.userId === listChat[index - 1]?.userId || item.userId === listChat[index + 1]?.userId;
      const firstMess =
        item.userId !== listChat[index - 1]?.userId && item.userId === listChat[index + 1]?.userId;
      const lastMess =
        item.userId === listChat[index - 1]?.userId && item.userId !== listChat[index + 1]?.userId;
      const className = item.userId === userId ? "my-mess" : "";
      const classNameMessNext = nextMess ? "next-mess" : "";
      const classNameMessFirst = firstMess ? "first-mess" : "";
      const classNameMessLast = lastMess ? "last-mess" : "";
      const classNameIsRead = item.isRead ? "mess-wait" : "";
      const avatar =
        className || item.userId === listChat[index - 1]?.userId
          ? []
          : genderAvatarUrl(item.avatarUrl);
      return (
        <Comment
          key={index}
          avatar={!className ? avatar.length ? <Avatar src={avatar} alt="avatar" /> : avatar : null}
          className={`${className} ${classNameMessNext} ${classNameIsRead} ${classNameMessFirst} ${classNameMessLast}`}
          content={content}
        />
      );
    });
  }, [listChat]);

  const renderMessageLoad = useMemo(() => {
    console.log(arrayLoad);
    return arrayLoad.map((item, index) => {
      return (
        <Spin indicator={null} key={index} className="spin-load">
          {item}
        </Spin>
      );
    });
  },[arrayLoad]);

  useEffect(() => {
    boxMessage.current.scrollTop = boxMessage.current.scrollHeight;
  }, [boxMessage]);
  console.log("-------------->index", indexLoad);

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
        {renderMessageLoad}
      </div>
      <Formik onSubmit={onSubmit} validationSchema={validateMessage} initialValues={initialVales}>
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
