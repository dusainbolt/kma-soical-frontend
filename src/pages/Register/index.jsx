import React from "react";
import { Formik, Field } from "formik";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import logo from "../../common/image/logo.png";
import * as Yup from "yup";
import Input from "../../components/Input";
import { useEffect } from "react";
import {
  blockSpecialChar,
  blockSpecialCharInUnder,
  setValueDate,
  onChangeValueFormik,
  onlyNameVN,
  getSelectLocalize,
  disableFeatureDate,
  getDefaultValueDate
} from "../../utils";
import { browserHistory } from "../../utils/history";
import { Row, Col } from "antd";
import ButtonCommon from "../../components/Button";
import RadioCheck from "../../components/Radio";
import { useState } from "react";
import { VALUE_GENDER } from "../../common";
import DatePicker from "../../components/DatePicker";
import Dot from "../../components/Dot";

function Register() {
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
    email: Yup.string()
      .required(t("txt.msg_required", { name: t("txt.val_email") }))
      .email(t("txt.msg_format_email")),
    userName: Yup.string()
      .required(t("txt.msg_required", { name: t("txt.user_name") }))
      .matches(/^(?=.*[a-z])[a-z0-9_]{5,21}$/, t("txt.msg_only_char_num", { name: t("txt.user_name") })),
    fullName: Yup.string()
      .required(t("txt.msg_required", { name: t("txt.full_name") }))
      .matches(/^.{8,25}$/, t("txt.msg_only_full_name", { name: t("txt.full_name") })),
    codeStudent: Yup.string()
      .required(t("txt.msg_required", { name: t("txt.code_std") }))
      .matches(/^.{8}$/, t("txt.msg_only_code_student", { name: t("txt.code_std") })),
    password: Yup.string()
      .required(t("txt.msg_required", { name: t("txt.val_password") }))
      .matches(/^.{6,21}$/, t("txt.msg_only_password", { name: t("txt.val_password") })),
    rePassword: Yup.string()
      .required(t("txt.msg_required", { name: t("txt.val_password") }))
      .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không trùng khớp"),
    birthday: Yup.string().required(t("txt.msg_required_select", { name: t("txt.birthday") })),
    gender: Yup.string().required(t("txt.msg_required_select", { name: t("txt.gender") })),
  });

  const submitRegister = values => {
    console.log("->>>>>>>>.", values);
    setOnSubmit(true);
  };

  useEffect(() => {
    if (token) {
      browserHistory.push("/");
    }
  }, [token]);

  const onChangeValueGender = setFieldValue => e => {
    setFieldValue("gender", e.target.value);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={submitRegister} validationSchema={validate}>
      {({ handleSubmit, handleReset, setFieldValue, values }) => (
        <Row className="welcome login">
          <Col className="welcome__col-height register" xs={24} sm={24} md={24} lg={12}></Col>
          <Col className="welcome__col-height register" xs={24} sm={24} md={24} lg={12}>
            <div className="welcome__select-wrapper">
              <div className="login__logo">
                <img className="" src={logo} alt="logo" />
              </div>
              <div className="login--form">
                <Field
                  name="email"
                  maxLength={150}
                  placeholder={t("txt.val_email")}
                  component={Input}
                />
                <Field
                  name="userName"
                  onChange={blockSpecialCharInUnder(setFieldValue, "userName")}
                  placeholder={t("txt.user_name")}
                  component={Input}
                  maxLength={20}
                />
                <Field
                  name="fullName"
                  onChange={onlyNameVN(setFieldValue, values, "fullName")}
                  placeholder={t("txt.full_name")}
                  component={Input}
                  maxLength={25}
                />
                <Field
                  name="codeStudent"
                  onChange={blockSpecialChar(setFieldValue, "codeStudent")}
                  placeholder={t("txt.code_std")}
                  component={Input}
                  maxLength={8}
                />
                <Field
                  name="password"
                  type="password"
                  placeholder={t("txt.val_password")}
                  component={Input}
                />
                <Field
                  name="rePassword"
                  type="password"
                  placeholder={t("txt.re_password")}
                  component={Input}
                />
                <Field
                  name="birthday"
                  placeholder={t("txt.birthday")}
                  defaultValue={getDefaultValueDate("18/11/1999")}
                  showToday={false}
                  onChange={onChangeValueFormik(setFieldValue, "birthday")}
                  disabledDate={disableFeatureDate()}
                  component={DatePicker}
                />
                <Field
                  name="gender"
                  options={getSelectLocalize(VALUE_GENDER, "txt.gender_")}
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

export default Register;
