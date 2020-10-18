import React from "react";
import { UserAddOutlined, EyeOutlined, MessageFilled, StopOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Col, Row } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { genderAvatarUrl, onRedirect } from "../../../../utils";
import { useMemo } from "react";

function ActionInfoFriends({ friendsDetail }) {
  const { t } = useTranslation();
  const { listFriends, mutualFriends } = friendsDetail;

  const renderListFriends = useMemo(() => {
    return listFriends?.map(item => {
      return (
        <Col
          onClick={() => onRedirect(`/user-detail/${item.userId}`)}
          key={item.userId}
          className="col-avatar"
          xs={8}
          sm={6}>
          <Avatar shape="square" size={64} src={genderAvatarUrl(item.avatar)} />
          <h3 className="name">{item.fullName}</h3>
        </Col>
      );
    });
  }, [listFriends]);
  return (
    <div className="account__friends form-feed">
      <div className="title-wrapper">
        <h3 className="title">
          {t("txt.friends")}
          <h3 className="total-friends">{listFriends?.length ? `${listFriends.length}` : 0}</h3>
          <span>
            ({mutualFriends ? mutualFriends.split(",").length : 0}
            {` ${t("txt.mutual_friends")}`})
          </span>
        </h3>
        <div className="item-view-all">{t("txt.view_all")}</div>
      </div>
      <Row gutter={[8, 8]}>{renderListFriends}</Row>
    </div>
  );
}
export default ActionInfoFriends;
