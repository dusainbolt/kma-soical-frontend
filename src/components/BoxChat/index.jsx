import React, { useRef, useState, useMemo, useEffect } from "react";
import { Badge, Avatar, Comment, Tooltip, Spin } from "antd";
import { DownCircleFilled, SendOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { validateMessage, TYPE_FEED } from "../../common";
import { Field, Formik } from "formik";
import LoadBoxChat from "../LoadBoxChat";
import { genderAvatarUrl, filterArray, getStatusOnline } from "../../utils";
import Input from "../Input";
import { getMessage, onTypingChat, receiverTypingChat } from "../../utils/socket";
import FadeIn from "react-fade-in";
import Dot from "../Dot";

function BoxChat({
  userId,
  roomChat,
  listChat,
  callbackSendMessage,
  indexLoad,
  userInbox,
  myAvatar,
  isLoadingBoxChat,
  exact,
  callbackGetListMessage,
}) {
  const { t } = useTranslation();
  const chatBottomContainer = useRef(null);
  const boxMessage = useRef(null);
  const [heightBox, setHeightBox] = useState(41);
  const [arrayLoad, setArrayLoad] = useState([]);
  const [countLoad, setCountLoad] = useState(1);
  const [isChange, setIsChange] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isViewMore, setIsViewMore] = useState(false);
  const initialVales = {
    message: "",
    type: TYPE_FEED.TEXT,
    userId: userId,
  };

  const onChange = (setFieldValue, name) => ({ target: { value } }) => {
    const heightContainer = chatBottomContainer.current.clientHeight;
    setFieldValue(name, value);
    onTypingChat(roomChat.id, userId);
    setTimeout(() => {
      const height = document.getElementById("inputBox").clientHeight;
      const durationHeight = height - heightBox;
      const heightCtn = durationHeight === 0 ? heightContainer : heightContainer + durationHeight;
      setHeightBox(height);
      chatBottomContainer.current.style.height = `${heightCtn}px`;
    });
  };

  const onSubmit = (values, { resetForm }) => {
    if (!values.message && !roomChat?.id) return;
    resetForm();
    const htmlLoad = [
      <Comment key={countLoad} className="my-mess next-mess" content={values.message} />,
    ];
    setArrayLoad(oldArray => oldArray.concat(htmlLoad));
    setCountLoad(countLoad + 1);
    callbackSendMessage({ ...values, indexLoad: countLoad, roomId: roomChat?.id });
    chatBottomContainer.current.style.height = `${50}px`;
    setHeightBox(41);
    boxMessage.current.scrollTop = boxMessage.current.scrollHeight;
  };

  useEffect(() => {
    indexLoad && setArrayLoad(filterArray(arrayLoad, "key", indexLoad.toString()));
  }, [indexLoad]);

  useEffect(() => {
    getMessage(roomChat?.id);
    receiverTypingChat(roomChat?.id, getTypingChat);
  }, [roomChat]);

  const getTypingChat = roomChatTyping => {
    if(roomChatTyping.userId === userInbox.userId ){
      setIsTyping(true);
      boxMessage.current.scrollTop = boxMessage.current.scrollHeight;
      setTimeout(()=>{
        setIsTyping(false);
      },1000);
    }
  };

  const renderBoxmessage = useMemo(() => {
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
    if (isChange && boxMessage && !isViewMore) {
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

  const renderBoxChatEmpty = useMemo(() => {
    return (
      <FadeIn delay={100} transitionDuration={500}>
        <div className="box-chat__message--empty">
          <Avatar src={genderAvatarUrl(userInbox.avatarUrl)} alt="avatar" />
          <div className="note-empty">{t("box_chat.note_empty_1")}</div>
          <div className="note-empty note-empty--end">{t("box_chat.note_empty_2")}</div>
        </div>
      </FadeIn>
    );
  }, [isLoadingBoxChat]);

  const renderTypingChat = useMemo(()=>{
    return isTyping && <div className="box-chat__typing">
      <Avatar className="avatar" src={genderAvatarUrl(userInbox.avatarUrl)} alt="avatar"/>
      <Dot />
    </div>;
  },[isTyping]);

  const handleScroll = () => {
    if (!boxMessage.current.scrollTop && !isLoadingBoxChat && exact > 0) {
      setIsViewMore(true);
      callbackGetListMessage({ roomId: roomChat?.id, userId: userInbox.userId , chatId: listChat[0].id });
    }
  };

  return (
    <div className="box-chat">
      {renderTopBoxChat}
      <div ref={boxMessage} className="box-chat__message" onScroll={handleScroll}>
        {exact <= 0 && !isLoadingBoxChat && renderBoxChatEmpty}
        {isLoadingBoxChat && <LoadBoxChat total={4} />}
        {renderBoxmessage}
        {renderMessageLoad}
        {renderTypingChat}
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
