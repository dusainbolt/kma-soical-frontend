import React from "react";
import LazyloadImg from "../LazyLoadingImg";
import {
  GlobalOutlined,
  EllipsisOutlined,
  HeartFilled,
  HeartOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { getLastName, getSpanList } from "../../utils";
import logo from "../../common/image/logo.png";
import logo1 from "../../common/image/LogoSidebar.png";
import logo2 from "../../common/image/error-404.png";
import Gallery from "react-grid-gallery";
import { SRLWrapper, useLightbox } from "simple-react-lightbox";
import { Row, Col } from "antd";
import { SPAN_GALLEY } from "../../common";
import { Player } from "video-react";
function ContentNew() {
  const { openLightbox } = useLightbox();

  const images = [
    {
      src: logo,
      thumbnail: logo,
      caption: "Lorem ipsum dolor sit amet",
      height: "auto",
    },
    {
      src: logo2,
      thumbnail: logo2,
      caption: "Consecutur adiscip elit",
      height: "auto",
    },
    {
      src: logo1,
      thumbnail: logo1,
      caption: "Consecutur adiscip elit",
      height: "auto",
    },
  ];

  const options = {
    settings: {
      // overlayColor: "rgb(25, 136, 124)",
      autoplaySpeed: 1500,
      transitionSpeed: 900,
    },
    buttons: {
      // backgroundColor: "#1b5245",
      iconColor: "rgba(126, 172, 139, 0.8)",
    },
    caption: {
      captionColor: "#a6cfa5",
      captionFontFamily: "Raleway, sans-serif",
      captionFontWeight: "300",
      captionTextTransform: "uppercase",
    },
  };

  const IMAGES = [
    {
      thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 212,
    },
    {
      thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 212,
    },
    {
      thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 212,
    },
    {
      thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 212,
    },
    {
      thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 212,
    },
    {
      thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 212,
    },
  ];

  const renderContentImage = dataImg => {
    return IMAGES.map((item, index) => {
      const spanList = getSpanList(IMAGES.length);
      const span = !index ? spanList.one : spanList.item;
      const lengthList = IMAGES.length > 5 ? true : false;
      return index < 5 ? (
        <Col
          key={index}
          className={`form-feed__img col-${IMAGES.length > 3 ? 4 : 3}-img`}
          span={span}
        >
          <img
            className="one-img img-hover"
            src="https://cdn.jpegmini.com/user/images/slider_puffin_jpegmini_mobile.jpg"
            alt="img"
          />
          {index === 4 && lengthList && <div className="form-feed__more-img-wrapper">+5 Anh</div>}
        </Col>
      ) : null;
    });
  };

  return (
    <>
      <div className="form-feed__caption">sddddddddddddddddddddddddddddddddddddddddddddddd</div>
      <div className="form-feed__content">
        <Row className="form-feed__content--img" onClick={openLightbox}>
          <SRLWrapper options={options} images={images} />
          {renderContentImage()}
        </Row>
        {/* <Player
          playsInline
          src={
            "http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_stereo_abl.mp4"
          }
        /> */}
      </div>
    </>
  );
}

export default ContentNew;
