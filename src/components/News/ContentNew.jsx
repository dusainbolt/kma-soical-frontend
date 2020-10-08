import React, { useState, useMemo } from "react";
import { getSpanList } from "../../utils";
import { Row, Col, Tag, Tooltip } from "antd";
import { TYPE_FEED } from "../../common";
import { Player } from "video-react";
import LazyloadImg from "../LazyLoadingImg";
import { useTranslation } from "react-i18next";
import FadeIn from "react-fade-in";

function ContentNew({ content, type, avatarUrl, caption, tags, callbackViewImg }) {
  const { t } = useTranslation();
  const [visibleTag, seVisibleTag] = useState(false);

  const getDataImages = dataImg => {
    return dataImg?.map((item, index) => {
      return {
        src: item,
        thumbnail: item,
        caption: (
          <div
            dangerouslySetInnerHTML={{
              __html: caption + ` - ${t("news_feed.image")} ${index + 1}`,
            }}
          />
        ),
        height: "auto",
      };
    });
  };

  const renderContentImage = dataImg => {
    return dataImg?.map((item, index) => {
      const lengthList = dataImg?.length;
      const spanList = getSpanList(lengthList);
      const span = !index ? spanList.one : spanList.item;
      const limitList = lengthList > 5 ? true : false;
      return index < 5 ? (
        <Col
          key={index}
          className={`form-feed__img col-${lengthList > 3 ? 4 : 3}-img`}
          span={span}
          onClick={() => onClickViewImage(dataImg, index)}>
          <LazyloadImg className="one-img img-hover" src={item} height={0} alt="img" />
          {index === 4 && limitList && (
            <div className="form-feed__more-img-wrapper">+{lengthList - 5}</div>
          )}
        </Col>
      ) : null;
    });
  };

  const onClickViewImage = (dataImg, index) => {
    callbackViewImg(getDataImages(dataImg), index);
  };

  const renderTag = () => {
    if (!tags?.length) return;
    return tags.map(item => {
      return (
        <Tag key={item} color="orange">
          {item}
        </Tag>
      );
    });
  };

  return (
    <>
      <div
        className="form-feed__caption"
        onMouseEnter={() => seVisibleTag(true)}
        onMouseLeave={() => seVisibleTag(false)}>
        <div dangerouslySetInnerHTML={{ __html: caption }} />
        <FadeIn delay={100} height={0} transitionDuration={500}>
          <div className="form-feed__tag">{renderTag()}</div>
        </FadeIn>
      </div>
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
