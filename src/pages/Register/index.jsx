import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import logo from "../../common/image/logo.png";
import { CONFIRM } from "../../common";
import { browserHistory } from "../../utils/history";
import { Row, Col } from "antd";
import ButtonCommon from "../../components/Button";
import LazyLoad from "../../components/LazyLoadingImg";
import FadeIn from "react-fade-in";
import { actions } from "./actions";
import RegisterForm from "../../components/RegisterForm";
import ConfirmCode from "../ConfirmCodeForm";

function Register() {
  const loadingDuplicate = useSelector(state => state.registerReducer.loadingDuplicate);
  const loadingRegister = useSelector(state => state.registerReducer.loadingRegister);
  const errorDuplicate = useSelector(state => state.registerReducer.errorDuplicate);
  const userNew = useSelector(state => state.registerReducer.userNew);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const submitRegister = useCallback(values => {
    dispatch(actions.postRegisterStart(values));
  }, []);

  const onSearchUser = useCallback(params => {
    dispatch(actions.getEmptyUserStart(params));
  }, []);

  return (
    <Row className="welcome login">
      <Col className="welcome__col-height register" xs={24} sm={24} md={24} lg={12}></Col>
      <Col className="welcome__col-height register" xs={24} sm={24} md={24} lg={12}>
        <div className="welcome__select-wrapper">
          <FadeIn delay={200}>
            <div className="login__logo">
              <LazyLoad src={logo} className="logo" alt="logo" />
            </div>
            <div className="login--form">
              {!userNew?.userName && (
                <RegisterForm
                  callbackRegister={submitRegister}
                  callbackEmptyUser={onSearchUser}
                  loadingDuplicate={loadingDuplicate}
                  loadingRegister={loadingRegister}
                  errorDuplicate={errorDuplicate}
                />
              )}
              {userNew?.userName && (
                <ConfirmCode type={CONFIRM.REGISTER} userName={userNew.userName} />
              )}
            </div>
            <div className="login__form-select">
              <label>{t("txt.use_account")}</label>
              <ButtonCommon onlyLink title={t("txt.btn_login")} to="/login"></ButtonCommon>
            </div>
          </FadeIn>
        </div>
      </Col>
    </Row>
  );
}

export default Register;
