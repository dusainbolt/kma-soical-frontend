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
      thumbnailWidth: 420,
      thumbnailHeight: 212,
    },
    {
      thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
      thumbnailWidth: 420,
      thumbnailHeight: 212,
    },
    {
      thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
      thumbnailWidth: 420,
      thumbnailHeight: 212,
    },
    {
      thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
      thumbnailWidth: 420,
      thumbnailHeight: 212,
    },
    {
      thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
      thumbnailWidth: 420,
      thumbnailHeight: 212,
    },
    {
      thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
      thumbnailWidth: 420,
      thumbnailHeight: 212,
    },
  ];

  return (
    <>
      <div className="form-feed__caption">sddddddddddddddddddddddddddddddddddddddddddddddd</div>
      {/* <Lightbox images={images} /> */}
      {/* {renderContentImg()} */}
      {/* <SRLWrapper options={options} images={images} /> */}
      <SRLWrapper options={options} images={images} />
      <div className="form-feed__content">
        <div className="form-feed__content--img">
          <img
            className="one-img img-hover"
            src="https://cdn.jpegmini.com/user/images/slider_puffin_jpegmini_mobile.jpg"
            alt="img"
          />
        </div>
        {/* <Gallery
        onClickThumbnail={() => openLightbox(1)}
        enableLightbox={false}
        enableImageSelection={false}
        images={IMAGES}
      /> */}

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
