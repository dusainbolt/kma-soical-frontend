import React from "react";
import LazyloadImg from "../LazyLoadingImg";
import Avatar from "antd/lib/avatar/avatar";
import { useTranslation } from "react-i18next";
import { genderAvatarUrl, genderCoverImageUrl } from "../../utils";
import { Divider } from "antd";
import ActionInfo from "./Container/ActionInfo";
import AccountDashboard from "./Container/AccountDashboard";
import AccountInfoFriends from "./Container/AccountInfoFriends";
import { CameraFilled } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import UploadImage from "../UploadImage";
import { useState } from "react";
import { TYPE_UPLOAD } from "../../common";
import { getBase64 } from "../../utils/upload";
import { useEffect } from "react";

function AccountInfo({
  viewMyAccount,
  userDashBoard,
  callbackClickMessage,
  callbackChangeImageInfo,
  userDetail,
}) {
  const { t } = useTranslation();
  const friendsDetail = useSelector(state => state.newFeedReducer.friendsDetail);
  const isLoadingFriendsDetail = useSelector(state => state.newFeedReducer.isLoadingFriendsDetail);
  const isLoadingAvatar = useSelector(state => state.loginReducer.isLoadingAvatar);
  const isLoadingCoverImage = useSelector(state => state.loginReducer.isLoadingCoverImage);

  const [avatarLoad, setAvatarLoad] = useState(null);
  const [coverImageLoad, setCoverImageLoad] = useState(null);

  const {
    get_user_info: { fullName, sologan },
    avatar,
    coverImage,
  } = userDetail;

  const renderFirendsDetail = useMemo(() => {
    return <AccountInfoFriends friendsDetail={friendsDetail} />;
  }, [friendsDetail, isLoadingFriendsDetail]);

  const handleChangeAvatar = originFileObj => {
    callbackChangeImageInfo(originFileObj, TYPE_UPLOAD.AVATAR);
    renderAvatarLoad(originFileObj);
  };

  const handleChangeCoverImage = originFileObj => {
    callbackChangeImageInfo(originFileObj, TYPE_UPLOAD.COVER);
    renderImageCoverLoad(originFileObj);
  };

  const renderButtonAvatar = () => {
    return (
      <div className="account__image-avatar--icon-upload">
        <CameraFilled />
      </div>
    );
  };

  const renderButtonCover = () => {
    return (
      <div className="account__cover-wrapper--btn-upload">
        <CameraFilled />
        {t("news_feed.upload_cover_img")}
      </div>
    );
  };

  const renderAvatarLoad = async originFileObj => {
    setAvatarLoad(await getBase64(originFileObj));
  };

  const renderImageCoverLoad = async originFileObj => {
    setCoverImageLoad(await getBase64(originFileObj));
  };

  return (
    <>
      <div className="account form-feed">
        <div className="account__cover-wrapper">
          {viewMyAccount && (
            <UploadImage
              callbackUpload={handleChangeCoverImage}
              cover={true}
              content={renderButtonCover()}
              className="upload-cover"
            />
          )}
          <LazyloadImg
            delayThrottle={100}
            height={390}
            className={`img-cover ${isLoadingCoverImage ? "loading" : ""}`}
            src={
              isLoadingCoverImage && coverImageLoad
                ? coverImageLoad
                : genderCoverImageUrl(coverImage)
            }
          />
        </div>
        <div className={`account__image-avatar ${isLoadingAvatar ? "loading" : ""}`}>
          {viewMyAccount && (
            <UploadImage
              callbackUpload={handleChangeAvatar}
              cover={false}
              loading={isLoadingAvatar}
              content={renderButtonAvatar()}
            />
          )}
          <Avatar src={isLoadingAvatar ? avatarLoad : genderAvatarUrl(avatar)} />
        </div>
        <div className="account__content-warpper">
          <div className="account__name">{fullName}</div>
          <p className="account__sologan">{sologan}</p>
          <ActionInfo
            fullName={fullName}
            userDetail={userDetail}
            callbackClickMessage={callbackClickMessage}
          />
          <Divider />
          <AccountDashboard
            userInfo={userDetail.get_user_info}
            userDetail={userDetail}
            userDashBoard={userDashBoard}
          />
        </div>
      </div>
      {renderFirendsDetail}
    </>
  );
}
export default AccountInfo;
