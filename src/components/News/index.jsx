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
// import logo3 from "../../common/image/Kazam_screencast_00000.mp4";
import { Player } from "video-react";
import { useState } from "react";
import PostTop from "./PostTop";
import Comment from "./Comment";
import LikeInfo from "./LikeInfo";
import { SRLWrapper, useLightbox } from "simple-react-lightbox";
import { useSelector } from "react-redux";
import ActionNew from "./ActionNew";
import ContentNew from "./ContentNew";


function FormAddNew() {
  const { t } = useTranslation();
  const isMobile = useSelector(state => state.layoutReducer.isMobile);
  const [visibleLightBox, setVisibleLightBox] = useState(true);
  const { openLightbox } = useLightbox();



  return (
    <div className="form-feed">
      <PostTop />
      <ContentNew />
      <LikeInfo />
      <ActionNew />
      <Comment />
    </div>
  );
}
export default FormAddNew;
