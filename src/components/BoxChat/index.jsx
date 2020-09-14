import React, { useRef, useState } from "react";
import { Badge, Avatar, Comment } from "antd";
import AvatarDefault from "../../common/image/avatar-default.png";
import { DownCircleFilled, SendOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { validateMessage } from "../../common";
import { Field, Formik } from "formik";
import Input from "../Input";

function BoxChat() {
  const { t } = useTranslation();
  const initialVales = { message: "" };
  const chatBottomContainer = useRef(null);
  const boxMessage = useRef(null);
  const [heightBox, setHeightBox] = useState(41);
  // const [heightContainer, setHeightContainer] = useState(50);

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
    }, 1);
  };

  const data = [
    {
      actions: [<span key="comment-list-reply-to-0">Reply to</span>],
      author: "Han Solo",
      avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      content: (
        <p>
          We supply a series of design , practical p
        </p>
      ),
      // datetime: (
      //   <Tooltip
      //     title={moment()
      //       .subtract(2, 'days')
      //       .format('YYYY-MM-DD HH:mm:ss')}
      //   >
      //     <span>
      //       {moment()
      //         .subtract(2, 'days')
      //         .fromNow()}
      //     </span>
      //   </Tooltip>
      // ),
    },
  ];

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
      <Comment avatar={data[0].avatar} content={data[0].content} />
        <Comment className="my-mess" content={data[0].content} />
        <Comment avatar={data[0].avatar} content={data[0].content} datetime={data[0].datetime} />
        <Comment avatar={[]} content={data[0].content} />
        <Comment className="my-mess" content={data[0].content} />
        <Comment avatar={data[0].avatar} content={data[0].content} datetime={data[0].datetime} />
        <Comment avatar={data[0].avatar} content={data[0].content} />
        <Comment className="my-mess" content={data[0].content} />
        <Comment avatar={data[0].avatar} content={data[0].content} datetime={data[0].datetime} />
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
