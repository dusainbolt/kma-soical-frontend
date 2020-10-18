import React from "react";
import { useTranslation } from "react-i18next";
import { Badge, Col, Row } from "antd";
import {
  CalendarOutlined,
  StarOutlined,
  TeamOutlined,
  ShopOutlined,
  HeartFilled,
  SignalFilled,
  SketchCircleFilled,
  SmileFilled,
  QrcodeOutlined,
  CarryOutOutlined,
  WomanOutlined,
  ManOutlined,
} from "@ant-design/icons";
import { getContentInfo, renderTextAVG } from "../../../../utils";

function AccountDashboard({ userDashBoard, userInfo, userDetail }) {
  const { t } = useTranslation();
  const { gender, birthday, job, hobbies, school, follow } = userInfo;
  console.log(gender);
  const { codeStudent, create_at, userName } = userDetail;
  const { totalPoint, totalLike, rateCountAVG, totalRate, totalFollows } = userDashBoard;
  const AVG = renderTextAVG(rateCountAVG);
  return (
    <Row className="info-row" gutter={[8, 16]}>
      <Col sm={16} xs={24}>
        <Row gutter={[8, 0]} className="account__info">
          <Col className="account__info--item" xs={24}>
            <CarryOutOutlined />
            <label>{`${t("account.job")}: `}</label>
            <b>{getContentInfo(job)}</b>
          </Col>
          <Col className="account__info--item" xs={24}>
            <StarOutlined />
            <label>{`${t("account.hobbit")}: `}</label>
            <b>{getContentInfo(hobbies)}</b>
          </Col>

          <Col className="account__info--item" xs={24}>
            <ShopOutlined />
            <label>{`${t("account.school")}: `}</label>
            <b>{getContentInfo(school)}</b>
          </Col>

          <Col className="account__info--item" xs={24}>
            <QrcodeOutlined />
            <label>{`${t("txt.code_std")}: `}</label>
            <b>{getContentInfo(codeStudent)}</b>
          </Col>

          <Col className="account__info--item" xs={24}>
            <CalendarOutlined />
            <label>{`${t("account.birthday")}: `}</label>
            <b>{getContentInfo(birthday)}</b>
          </Col>
          <Col className="account__info--item" xs={24}>
            {gender === 2 ? <WomanOutlined /> : <ManOutlined />}
            <label>{`${t("txt.gender")}: `}</label>
            <b>{gender ? t(`txt.gender_${gender}`) : t("txt.updating")}</b>
          </Col>
          <Col className="account__info--item" xs={24}>
            <ShopOutlined />
            <label>{`${t("txt.nickName")}: `}</label>
            <b>{userName}</b>
          </Col>
        </Row>
      </Col>
      <Col className="account__info-dashboard" sm={8} xs={24}>
        <Row className="account__info dashboard">
          <Col className="account__info--item" sm={24} xs={8}>
            <SketchCircleFilled />
            <label>{`${t("account.points")}: `}</label>
            <b>{totalPoint}</b>
          </Col>
          <Col className="account__info--item" sm={24} xs={8}>
            <HeartFilled />
            <label>{`${t("account.count_like")}: `}</label>
            <b>{totalLike}</b>
          </Col>
          <Col className="account__info--item" sm={24} xs={8}>
            <TeamOutlined />
            <label>{`${t("account.follow")}: `}</label>
            <b>{totalFollows}</b>
          </Col>
          <Col className="account__info--item" sm={24} xs={8}>
            <SignalFilled />
            <label>{`${t("txt.count_rate")}: `}</label>
            <b>{totalRate}</b>
          </Col>
          <Col className="account__info--item" sm={24} xs={8}>
            <SmileFilled />
            <label>{`${t("txt.avg")}: `}</label>
            <b>{rateCountAVG}</b>
            <Badge className={`rate-badge ${AVG}`} count={`${AVG}`} />
          </Col>
          <Col className="account__info--item" sm={24} xs={8}></Col>
        </Row>
      </Col>
    </Row>
  );
}
export default AccountDashboard;
