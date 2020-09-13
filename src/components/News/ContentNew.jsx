import React from "react";
import { getSpanList } from "../../utils";
import { Row, Col } from "antd";
import { TYPE_FEED } from "../../common";
import { Player } from "video-react";
import LazyloadImg from "../LazyLoadingImg";


function ContentNew({ content, type, avatarUrl, caption, callbackViewImg }) {

  const getDataImages = dataImg => {
    return dataImg.map((item, index) => {
      return {
        src: item,
        thumbnail: item,
        height: "auto",
      };
    });
  };

  const renderCaptionImg = (caption, index) => {
    return (
      <div>{caption} {index}</div>
    );
  };

  const getCustomCaption = dataImg => {
    return dataImg.map((item, index) => {
      return {
        id: index,
        caption: renderCaptionImg(caption, index),
      };
    });
  };


  const renderContentImage = dataImg => {
    return dataImg.map((item, index) => {
      const lengthList = dataImg.length;
      const spanList = getSpanList(lengthList);
      const span = !index ? spanList.one : spanList.item;
      const limitList = lengthList > 5 ? true : false;
      return index < 5 ? (
        <Col
          key={index}
          className={`form-feed__img col-${lengthList > 3 ? 4 : 3}-img`}
          span={span}
          onClick={() => onClickViewImage(dataImg, index)}
        >
          <LazyloadImg className="one-img img-hover" src={item} height={150} alt="img" />
          {index === 4 && limitList && (
            <div className="form-feed__more-img-wrapper">+{lengthList - 5}</div>
          )}
        </Col>
      ) : null;
    });
  };

  const onClickViewImage = (dataImg, index) => {
    callbackViewImg(getDataImages(dataImg), getCustomCaption(dataImg), index);
  };

  return (
    <>
      <div className="form-feed__caption">{caption}</div>
      {content && (
        <div className="form-feed__content">
          <Row className="form-feed__content--img">
            {type === TYPE_FEED.IMAGE && renderContentImage(content)}
          </Row>
          {type === TYPE_FEED.VIDEO && <Player playsInline poster={avatarUrl} src={content} />}
        </div>
      )}
    </>
  );
}

export default ContentNew;
