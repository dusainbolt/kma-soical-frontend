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
import { getLastName } from "../../utils";
import logo from "../../common/image/logo.png";
import logo1 from "../../common/image/LogoSidebar.png";
import logo2 from "../../common/image/error-404.png";
import Gallery from "react-grid-gallery";
import { SRLWrapper, useLightbox } from "simple-react-lightbox";
import { Row, Col } from "antd";

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
    // {
    //   thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
    //   thumbnailWidth: 320,
    //   thumbnailHeight: 212,
    // },
  ];

  const spanGalley = [
    {
      one: 12,
      item: 12,
    },
    {
      one: 24,
      item: 12,
    },
    {
      one: 24,
      item: 8,
    }
  ];

  const renderContentImage = dataImg => {
    return IMAGES.map((item, index) => {
      console.log(item);
      let spanList = IMAGES.length === 2 ? spanGalley[0] : spanGalley[1];
      spanList = IMAGES.length > 3 ? spanGalley[2] : spanList;
      const span = !index ? spanList.one : spanList.item;
      return (
        <Col key={index} className="form-feed__img col-3-img" span={span}>
          <img
            className="one-img img-hover"
            src="https://cdn.jpegmini.com/user/images/slider_puffin_jpegmini_mobile.jpg"
            alt="img"
          />
        </Col>
      );
    });
  };


  return (
    <>
      <div className="form-feed__caption">sddddddddddddddddddddddddddddddddddddddddddddddd</div>
      {/* <Lightbox images={images} /> */}
      {/* {renderContentImg()} */}
      {/* <SRLWrapper options={options} images={images} /> */}
      <SRLWrapper options={options} images={images} />
      <div className="form-feed__content">
        <Row className="form-feed__content--img" onClick={openLightbox}>
          {/* <Col span={24}>
            <img
              className="one-img img-hover"
              src="https://cdn.jpegmini.com/user/images/slider_puffin_jpegmini_mobile.jpg"
              alt="img"
            />
          </Col> */}
          {renderContentImage()}
          {/* <Gallery
        onClickThumbnail={() => openLightbox(1)}
        enableLightbox={false}
        enableImageSelection={false}
        images={IMAGES}
      /> */}
          {/* <Col className="form-feed__img col-3-img" span={24}>
          <img
            className="one-img img-hover"
            src="https://i.pinimg.com/564x/35/09/33/3509331600a792d6918a366390e07a81.jpg"
            alt="img"
          />
        </Col>
        <Col className="form-feed__img col-3-img" span={24}>
          <img
            className="one-img img-hover"
            src="https://cdn.jpegmini.com/user/images/slider_puffin_jpegmini_mobile.jpg"
            alt="img"
          />
        </Col>

        <Col className="form-feed__img col-3-img" span={24}>
          <img
            className="one-img img-hover"
            src="https://i.pinimg.com/564x/35/09/33/3509331600a792d6918a366390e07a81.jpg"
            alt="img"
          />
        </Col>
        <Col span={12}>
          <img
            className="one-img img-hover"
            src="https://cdn.jpegmini.com/user/images/slider_puffin_jpegmini_mobile.jpg"
            alt="img"
          />
        </Col>

        <Col span={12}>
          <img
            className="one-img img-hover"
            src="https://cdn.jpegmini.com/user/images/slider_puffin_jpegmini_mobile.jpg"
            alt="img"
          />
        </Col> */}

          {/* <Col className="form-feed__img col-4-img" span={24}>
          <img
            className="one-img img-hover"
            src="https://i.pinimg.com/564x/35/09/33/3509331600a792d6918a366390e07a81.jpg"
            alt="img"
          />
        </Col>
        <Col className="form-feed__img col-4-img" span={8}>
          <img
            className="one-img img-hover"
            src="https://cdn.jpegmini.com/user/images/slider_puffin_jpegmini_mobile.jpg"
            alt="img"
          />
        </Col>

        <Col className="form-feed__img col-4-img" span={8}>
          <img
            className="one-img img-hover"
            src="https://cdn.jpegmini.com/user/images/slider_puffin_jpegmini_mobile.jpg"
            alt="img"
          />
        </Col>

        <Col className="form-feed__img col-4-img" span={8}>
          <img
            className="one-img img-hover"
            src="https://cdn.jpegmini.com/user/images/slider_puffin_jpegmini_mobile.jpg"
            alt="img"
          />
        </Col> */}
          {/* 
<Col className="form-feed__img col-3-img" span={24}>
          <img
            className="one-img img-hover"
            src="https://i.pinimg.com/564x/35/09/33/3509331600a792d6918a366390e07a81.jpg"
            alt="img"
          />
        </Col>
        <Col className="form-feed__img col-4-img" span={12}>
          <img
            className="one-img img-hover"
            src="https://cdn.jpegmini.com/user/images/slider_puffin_jpegmini_mobile.jpg"
            alt="img"
          />
        </Col>

        <Col className="form-feed__img col-4-img" span={12}>
          <img
            className="one-img img-hover"
            src="https://cdn.jpegmini.com/user/images/slider_puffin_jpegmini_mobile.jpg"
            alt="img"
          />
        </Col>

        <Col className="form-feed__img col-4-img" span={12}>
          <img
            className="one-img img-hover"
            src="https://cdn.jpegmini.com/user/images/slider_puffin_jpegmini_mobile.jpg"
            alt="img"
          />
        </Col>
        <Col className="form-feed__img col-4-img" span={12}>
          <img
            className="one-img img-hover"
            src="https://cdn.jpegmini.com/user/images/slider_puffin_jpegmini_mobile.jpg"
            alt="img"
          />
        </Col> */}
        </Row>

        {/* <Player
        playsInline
        // poster="/assets/poster.png"
        src={logo3}
      /> */}
      </div>
    </>
  );
}

export default ContentNew;
