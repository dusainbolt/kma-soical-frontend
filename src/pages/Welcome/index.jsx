import React from "react";
import logo from "../../common/image/logo.png";
import { Row, Col } from "antd";
import ButtonCommon from "../../components/Button";
import { useEffect } from "react";
import { browserHistory } from "../../utils/history";
import { useSelector } from "react-redux";
import api from "../../services/api";

function Welcome() {
  
  return ( 
    <Row className="welcome">
      <Col className="welcome__col-height" xs={24} sm={24} md={24} lg={12}>
      </Col>
      <Col className="welcome__col-height" xs={24} sm={24} md={24} lg={12}>
        <div className="welcome__select-wrapper">
          <img src={logo} alt="logo" />
          <div className="welcome__note">
            <h3>Chưa học xong chưa đi ngủ</h3>
          </div>
          <label className="welcome__action">Tham gia ngay.</label>
          <div className="flex-group welcome__buttons">
            <ButtonCommon to="/register" className="btn-primary" title="Đăng kí"/>
            <ButtonCommon to="/login" className="btn-outline-primary" title="Đăng nhập"/>
          </div>
        </div>
      </Col>
    </Row>
  
  );
}

export default Welcome;
