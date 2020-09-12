import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import logo from "../../common/image/logo.png";
import { actions } from "../Login/actions";
import { useEffect } from "react";
import { browserHistory } from "../../utils/history";
import { Row, Col } from "antd";
import ButtonCommon from "../../components/Button";
import { VALUE_STATUS, CONFIRM } from "../../common";
import LoginForm from "../../components/LoginForm";
import ConfirmCode from "../ConfirmCodeForm";
import LazyLoading from "../../components/LazyLoadingImg";
import api from "../../services/api";

function Login() {
  const isLoadingLogin = useSelector(state => state.loginReducer.isLoadingLogin);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const submitLogin = values => {
    dispatch(actions.postLoginStart(values));
  };

  return (
    <Row className="welcome login">
      <Col className="welcome__col-height" xs={24} sm={24} md={24} lg={12}></Col>
      <Col className="welcome__col-height" xs={24} sm={24} md={24} lg={12}>
        <div className="welcome__select-wrapper">
          <div className="login__logo">
            <LazyLoading src={logo} className="logo" alt="logo" />
          </div>
          <LoginForm callbackLogin={submitLogin} isLoading={isLoadingLogin} />
          <div className="login__form-select">
            <label>{t("txt.not_account")}</label>
            <ButtonCommon onlyLink title={t("txt.register")} to="/register"></ButtonCommon>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default Login;
