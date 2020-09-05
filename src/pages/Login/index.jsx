import React, { Component } from "react";
import { Formik, Field } from "formik";
import { connect, useSelector, useDispatch } from "react-redux";
import { withTranslation, useTranslation } from "react-i18next";
import logo from "../../common/image/logo.png";
import * as Yup from "yup";
import Input from "../../components/Input";
import { actions } from "../Login/actions";
import { useEffect } from "react";
import { browserHistory } from "../../utils/history";
import { Row, Col } from "antd";
import ButtonCommon from "../../components/Button";
import { useState } from "react";
import Dot from "../../components/Dot";
import LazyLoading from "../../components/LazyLoadingImg";

function Login() {
  const token = useSelector(state => state.loginReducer.token);
  const isLoadingLogin = useSelector(state => state.loginReducer.isLoadingLogin);
  const dispatch = useDispatch();
  const initialValues = { uniqueUser: "", password: "" };
  const { t } = useTranslation();
  const validate = Yup.object({
    uniqueUser: Yup.string().required(t("txt.msg_required_unique_login")),
    password: Yup.string().required(t("txt.msg_required", { name: t("txt.val_password") })),
  });

  const submitLogin = values => {
    dispatch(actions.postLoginStart(values));
  };

  useEffect(() => {
    if (token) {
      browserHistory.push("/");
    }
  }, [token]);

  return (
    <Formik initialValues={initialValues} onSubmit={submitLogin} validationSchema={validate}>
      {({ handleSubmit, values }) => (
        <Row className="welcome login">
          <Col className="welcome__col-height" xs={24} sm={24} md={24} lg={12}></Col>
          <Col className="welcome__col-height" xs={24} sm={24} md={24} lg={12}>
            <div className="welcome__select-wrapper">
              <div className="login__logo">
                <LazyLoading src={logo} className="logo" alt="logo" />
              </div>
              <div className="login--form">
                <Field name="uniqueUser" placeholder={t("txt.user_name_or_code")} component={Input} />
                <Field
                  type="password"
                  name="password"
                  placeholder={t("txt.val_password")}
                  component={Input}
                />
                <span className="login__label">{t("txt.forgot_pass")}</span>
              </div>
              <div className="welcome__buttons">
                {isLoadingLogin ? (
                  <Dot className="welcome__buttons--loading" />
                ) : (
                  <ButtonCommon
                    iconSend
                    onClick={handleSubmit}
                    className="btn-primary login__btn-submit"
                    title={t("txt.btn_login")}
                  />
                )}
              </div>
              <div className="login__form-select">
                <label>{t("txt.not_account")}</label>
                <ButtonCommon onlyLink title={t("txt.register")} to="/register"></ButtonCommon>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </Formik>
  );
}

export default Login;
