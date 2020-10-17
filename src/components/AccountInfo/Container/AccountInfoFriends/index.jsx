import React from "react";
import { UserAddOutlined, EyeOutlined, MessageFilled, StopOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Col, Row } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { genderAvatarUrl } from "../../../../utils";

function ActionInfoFriends({ friendsDetail }) {
  const { t } = useTranslation();
  const { listFriends, mutualFriends } = friendsDetail;
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
      <Row gutter={[8, 8]}>
        <Col className="col-avatar" xs={8} sm={6}>
          <Avatar
            shape="square"
            size={64}
            src={genderAvatarUrl(
              "https://png.pngtree.com/element_our/20190530/ourlarge/pngtree-520-couple-avatar-boy-avatar-little-dinosaur-cartoon-cute-image_1263411.jpg"
            )}
          />
          <h3 className="name">Bh nhờ Sofm lại muốn quay lại chơi quá</h3>
        </Col>
        <Col xs={8} sm={6}>
          <Avatar
            shape="square"
            size={64}
            src={genderAvatarUrl(
              "https://png.pngtree.com/element_our/20190530/ourlarge/pngtree-520-couple-avatar-boy-avatar-little-dinosaur-cartoon-cute-image_1263411.jpg"
            )}
          />
          sda
        </Col>
        <Col xs={8} sm={6}>
          <Avatar
            shape="square"
            size={64}
            src={genderAvatarUrl(
              "https://png.pngtree.com/element_our/20190530/ourlarge/pngtree-520-couple-avatar-boy-avatar-little-dinosaur-cartoon-cute-image_1263411.jpg"
            )}
          />
          sda
        </Col>
        <Col xs={8} sm={6}>
          <Avatar
            shape="square"
            size={64}
            src={genderAvatarUrl(
              "https://png.pngtree.com/element_our/20190530/ourlarge/pngtree-520-couple-avatar-boy-avatar-little-dinosaur-cartoon-cute-image_1263411.jpg"
            )}
          />
          sda
        </Col>
      </Row>
    </div>
  );
}
export default ActionInfoFriends;
