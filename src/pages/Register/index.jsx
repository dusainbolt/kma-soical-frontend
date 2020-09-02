import React from "react";
import { Formik, Field } from "formik";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import logo from "../../common/image/logo.png";
import * as Yup from "yup";
import Input from "../../components/Input";
import { useEffect } from "react";
import { browserHistory } from "../../utils/history";
import { Row, Col } from "antd";
import ButtonCommon from "../../components/Button";
import RadioCheck from "../../components/Radio";
import { useState } from "react";
import DatePicker from "../../components/DatePicker";
import Dot from "../../components/Dot";

function Login() {
  const token = useSelector(state => state.loginReducer.auth?.token);
  const initialValues = {
    email: "",
    userName: "",
    fullName: "",
    codeStudent: "",
    password: "",
    rePassword: "",
    gender: "",
  };
  const { t } = useTranslation();
  const [onSubmit, setOnSubmit] = useState(false);
  const validate = Yup.object({
    email: Yup.string().required(t("txt.msg_required", { name: t("txt.val_email") })),
    userName: Yup.string().required(t("txt.msg_required", { name: t("txt.val_email") })),
    fullName: Yup.string().required(t("txt.msg_required", { name: t("txt.val_email") })),
    codeStudent: Yup.string().required(t("txt.msg_required", { name: t("txt.val_email") })),
    password: Yup.string().required(t("txt.msg_required", { name: t("txt.val_email") })),
    rePassword: Yup.string().required(t("txt.msg_required", { name: t("txt.val_email") })),
    birthday: Yup.string().required(t("txt.msg_required", { name: t("txt.val_password") })),
    gender: Yup.string().required(t("txt.msg_required", { name: t("txt.val_password") })),
  });

  const submitLogin = values => {
    console.log("->>>>>>>>.", values);
    setOnSubmit(true);
  };

  useEffect(() => {
    if (token) {
      browserHistory.push("/");
    }
  }, [token]);

  const optionsWithDisabled = [
    { label: "Apple", value: "Apple" },
    { label: "Pear", value: "Pear" },
    { label: "Orange", value: "Orange" },
  ];

  const  onChangeValueGender = setFieldValue => e => {
    // console.log('radio1 checked', e.target.value);
    // this.setState({
    //   value1: e.target.value,
    // });
    setFieldValue("gender", e.target.value);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={submitLogin} validationSchema={validate}>
      {({ handleSubmit, handleReset, setFieldValue, values }) => (
        <Row className="welcome login">
          <Col className="welcome__col-height register" xs={24} sm={24} md={24} lg={12}></Col>
          <Col className="welcome__col-height register" xs={24} sm={24} md={24} lg={12}>
            <div className="welcome__select-wrapper">
              <div className="login__logo">
                <img className="" src={logo} alt="logo" />
              </div>
              <div className="login--form">
                <Field name="email" placeholder={t("txt.val_email")} component={Input} />
                <Field name="userName" placeholder={t("txt.user_name")} component={Input} />
                <Field name="fullName" placeholder={t("txt.full_name")} component={Input} />
                <Field name="codeStudent" placeholder={t("txt.code_std")} component={Input} />
                <Field name="password" placeholder={t("txt.val_password")} component={Input} />
                <Field name="rePassword" placeholder={t("txt.re_password")} component={Input} />
                <Field name="birthday" placeholder={t("txt.birthday")} component={DatePicker} />
                {/* <Field name="gender" placeholder={t("txt.gender")} component={Input} /> */}
                <Field
                  name="gender"
                  options={optionsWithDisabled}
                  onChange={onChangeValueGender(setFieldValue)}
                  value={values.gender}
                  optionType="button"
                  buttonStyle="solid"
                  component={RadioCheck}
                />
              </div>
              <div className="welcome__buttons">
                {onSubmit ? (
                  <Dot className="welcome__buttons--loading" />
                ) : (
                  <ButtonCommon
                    onClick={handleSubmit}
                    className="btn-primary login__btn-submit"
                    title={t("txt.register")}
                  />
                )}
              </div>
              <div className="login__form-select">
                <label>{t("txt.use_account")}</label>
                <ButtonCommon onlyLink title={t("txt.btn_login")} to="/login"></ButtonCommon>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </Formik>
  );
}

export default Login;
