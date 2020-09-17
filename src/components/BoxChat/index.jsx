import React, { useRef, useState, useMemo, useEffect } from "react";
import { Badge, Avatar, Comment, Tooltip, Spin } from "antd";
import { DownCircleFilled, SendOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { validateMessage, TYPE_FEED } from "../../common";
import { Field, Formik } from "formik";
import LoadBoxChat from "../LoadBoxChat";
import { genderAvatarUrl, filterArray, getStatusOnline } from "../../utils";
import Input from "../Input";
import { getMessage } from "../../utils/socket";

function BoxChat({
  userId,
  roomChat,
  listChat,
  callbackSendMessage,
  indexLoad,
  userInbox,
  myAvatar,
  isLoadingBoxChat,
  dispatch,
}) {
  const { t } = useTranslation();
  const chatBottomContainer = useRef(null);
  const boxMessage = useRef(null);
  const [heightBox, setHeightBox] = useState(41);
  const [arrayLoad, setArrayLoad] = useState([]);
  const [countLoad, setCountLoad] = useState(1);
  const [isChange, setIsChange] = useState(false);
  const initialVales = {
    message: "",
    type: TYPE_FEED.TEXT,
    userId: userId,
    idBoxChat: roomChat?.id,
  };

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
    });
  };

  const setHeightChatBox = (heightBottom, heightBox) => {
    chatBottomContainer.current.style.height = `${heightBottom}px`;
    boxMessage.current.style.height = `${heightBox}px`;
  };

  const onSubmit = (values, { resetForm }) => {
    if (!values.message) return;
    resetForm();
    const htmlLoad = [
      <Comment key={countLoad} className="my-mess next-mess" content={values.message} />,
    ];
    setArrayLoad(oldArray => oldArray.concat(htmlLoad));
    setCountLoad(countLoad + 1);
    callbackSendMessage({ ...values, indexLoad: countLoad });
    setHeightChatBox(50, 343);
    setHeightBox(41);
    boxMessage.current.scrollTop = boxMessage.current.scrollHeight;
  };

  useEffect(() => {
    indexLoad && setArrayLoad(filterArray(arrayLoad, "key", indexLoad.toString()));
  }, [indexLoad]);

  useEffect(()=>{
    getMessage(dispatch, roomChat?.id);
  },[roomChat]);  

  const renderBoxmessage = useMemo(() => {
    console.log("----------------->", listChat);
    return listChat.map((item, index) => {
      const content = (
        <Tooltip title={item.created_at} color="orange">
          <div>{item.message}</div>
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
          : genderAvatarUrl(userInbox.avatarUrl);
      if (index === listChat.length - 1) {
        setIsChange(true);
      }
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

  useEffect(() => {
    if (isChange && boxMessage) {
      setTimeout(() => {
        boxMessage.current.scrollTop = boxMessage.current.scrollHeight;
        setIsChange(false);
      });
    }
  }, [isChange]);

  const renderMessageLoad = useMemo(() => {
    return arrayLoad.map((item, index) => {
      return (
        <Spin indicator={null} key={index} className="spin-load">
          {item}
        </Spin>
      );
    });
  }, [arrayLoad]);

  useEffect(() => {
    boxMessage.current.scrollTop = boxMessage.current.scrollHeight;
  }, [boxMessage]);

  const renderTopBoxChat = useMemo(() => {
    return (
      <div className="box-chat__top">
        <div className="box-chat__top--avatar">
          <Badge className="active normal" dot={userInbox.isOnline}>
            <Avatar className="avatar" src={genderAvatarUrl(userInbox.avatarUrl)} alt="avatar" />
          </Badge>
        </div>
        <div className="box-chat__top--info active">
          {userInbox.fullName}
          <div>{getStatusOnline(userInbox.isOnline)}</div>
        </div>
        <DownCircleFilled title={t("box_chat.close")} className="box-chat__top--icon-back" />
      </div>
    );
  }, [userInbox]);

  const renderBoxChatEmpty = () => {
    return (
      <div className="box-chat__message--empty">
        <Avatar src={genderAvatarUrl(userInbox.avatarUrl)} alt="avatar"/>
        <div className="note-empty">{t("box_chat.note_empty_1")}</div>
        <div className="note-empty note-empty--end">{t("box_chat.note_empty_2")}</div>
      </div>
    );
  };

  return (
    <div className="box-chat">
      {renderTopBoxChat}
      <div ref={boxMessage} className="box-chat__message">
        {!isLoadingBoxChat && renderBoxChatEmpty()}
        {isLoadingBoxChat && <LoadBoxChat total={4}/>}
        {renderBoxmessage}
        {renderMessageLoad}
      </div>
      <Formik onSubmit={onSubmit} validationSchema={validateMessage} initialValues={initialVales}>
        {({ handleSubmit, setFieldValue, errors, values }) => (
          <div className="box-chat__bottom" id="213" ref={chatBottomContainer}>
            <Avatar className="avatar" src={genderAvatarUrl(myAvatar)} alt="avatar" />
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
