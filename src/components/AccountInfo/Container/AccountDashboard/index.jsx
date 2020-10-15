import React from "react";
import { useTranslation } from "react-i18next";
import { Col, Row } from "antd";
import {
  CalendarOutlined,
  StarOutlined,
  TeamOutlined,
  ShopOutlined,
  HeartFilled,
  SignalFilled,
  SketchCircleFilled,
  SmileFilled,
} from "@ant-design/icons";

function AccountDashboard({ userDashBoard }) {
  const { t } = useTranslation();

  return (
    <Row className="info-row" gutter={[8, 16]}>
      <Col sm={17} xs={24}>
        <Row gutter={[8, 0]} className="account__info">
          <Col className="account__info--item" sm={12} xs={24}>
            <CalendarOutlined />
            <label>{`${t("account.job")}: `}</label>
            <b>CongViecViecViecViecViecViecViecViecViecViecViec</b>
          </Col>
          <Col className="account__info--item" sm={12} xs={24}>
            <StarOutlined />
            <label>{`${t("account.hobbit")}: `}</label>
            <b>Cong Viec</b>
          </Col>
          <Col className="account__info--item" sm={12} xs={24}>
            <TeamOutlined />
            <label>{`${t("account.follow")}: `}</label>
            <b>Cong Viec</b>
          </Col>
          <Col className="account__info--item" sm={12} xs={24}>
            <ShopOutlined />
            <label>{`${t("account.school")}: `}</label>
            <b>Cong Viec</b>
          </Col>
        </Row>
      </Col>
      <Col className="account__info-dashboard" sm={7} xs={24}>
        <Row className="account__info">
          <Col className="account__info--item" sm={24} xs={12}>
            <SketchCircleFilled />
            <label>{`${t("account.points")}: `}</label>
            <b>{userDashBoard?.totalPoint}</b>
          </Col>
          <Col className="account__info--item" sm={24} xs={12}>
            <HeartFilled />
            <label>{`${t("account.count_like")}: `}</label>
            <b>{userDashBoard?.totalLike}</b>
          </Col>
          <Col className="account__info--item" xs={24}>
            <Row className="info-rate">
              <Col className="account__info--item" sm={5} xs={12}>
                <SignalFilled />
                <b>{userDashBoard?.rateCountAVG}</b>
              </Col>
              <Col className="account__info--item" sm={19} xs={12}>
                <SmileFilled />
                <b>sdsds sdsd</b>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
export default AccountDashboard;
