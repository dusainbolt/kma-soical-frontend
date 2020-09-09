import React from "react";
import LazyloadImg from "../LazyLoadingImg";
import { GlobalOutlined, EllipsisOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { getLastName } from "../../utils";
import logo from "../../common/image/logo.png";
import logo1 from "../../common/image/LogoSidebar.png";
import logo2 from "../../common/image/error-404.png";
import Gallery from "react-grid-gallery";

import { useState } from "react";
import { SRLWrapper, useLightbox } from "simple-react-lightbox";

function FormAddNew() {
  const { t } = useTranslation();
  const [visibleLightBox, setVisibleLightBox] = useState(true);
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

  const renderContentImg = () => {
    // return visibleLightBox && <Lightbox onClose images={images} title="Image Title" />;
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
      thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 212,
    },
    // {
    //   thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
    //   thumbnailWidth: 320,
    //   thumbnailHeight: 212,
    // },
    // {
    //   thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
    //   thumbnailWidth: 320,
    //   thumbnailHeight: 212,
    // },
  ];

  return (
    <div className="form-feed">
      <div className="form-feed__top">
        <LazyloadImg src="https://www.w3schools.com/howto/img_avatar.png" alt="avatar" />
        <div className="form-feed__top--info">
          <div className="form-feed__top--name">Du sainbolt</div>
          <span className="form-feed__top--time">
            1 Giờ <GlobalOutlined className="form-feed__top--i-security" />
          </span>
        </div>
        <EllipsisOutlined className="form-feed__top--i-action" onClick={() => openLightbox()} />
      </div>
      <div className="form-feed__caption">sddddddddddddddddddddddddddddddddddddddddddddddd</div>
      {/* <Lightbox images={images} /> */}
      {/* {renderContentImg()} */}
      {/* <SRLWrapper options={options} images={images} /> */}
      <SRLWrapper options={options} images={images} />
      <div className="form-feed__content">
        {/* <div className="form-feed__content--img">
          <img className="one-img" src="https://cdn.jpegmini.com/user/images/slider_puffin_jpegmini_mobile.jpg" alt="img"/>
        </div> */}
        <Gallery
          onClickThumbnail={() => openLightbox(1)}
          enableLightbox={false}
          enableImageSelection={false}
          images={IMAGES}
        />
      </div>
    </div>
  );
}
export default FormAddNew;
