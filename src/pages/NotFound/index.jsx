import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Row } from "antd";
import { RightCircleFilled } from "@ant-design/icons";
import ImgNotFound1 from "../../resource/image/error-404.png";
import LazyLoading from "../../components/LazyLoadingImg";

class Home extends Component {
  render() {
    const { t } = this.props;
    return (
      <Row className="not-found" justify="center">
        <div className="not-found--wrapper">
          <LazyLoading
            className="not-found--wrapper__img"
            src={ImgNotFound1}
            alt="notfound"
            height={400}
          />
        </div>
        <div className="not-found--footer">
          <div className="not-found--footer--title">{t("not_found.title")}</div>
          <div className="not-found--footer--description">
            {t("not_found.description")}
          </div>
          <Link className="not-found--footer--button" to="/">
            <RightCircleFilled className="not-found--footer--button__icon"/> {t("not_found.button_go_home")}
          </Link>
        </div>
      </Row>
    );
  }
}

export default withTranslation()(Home);
