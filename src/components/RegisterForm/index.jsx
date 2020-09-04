import React from "react";
import { Formik, Field } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import Input from "../Input";
import {
  blockSpecialCharInUnder,
  onChangeValueFormik,
  onlyNameVN,
  getSelectLocalize,
  disableFeatureDate,
  checkCodeStudent,
  convertStringDate,
} from "../../utils";
import ButtonCommon from "../Button";
import RadioCheck from "../Radio";
import { VALUE_GENDER, TYPE_DATE_TIME } from "../../common";
import DatePicker from "../DatePicker";
import { CheckCircleOutlined } from "@ant-design/icons";
import Dot from "../Dot";

export default function FormRegister({
  callbackEmptyUser,
  callbackRegister,
  loadingDuplicate,
  loadingRegister,
  errorDuplicate,
}) {
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
  const validate = Yup.object({
    email: Yup.string()
      .required(t("txt.msg_required", { name: t("txt.val_email") }))
      .email(t("txt.msg_format_email")),
    userName: Yup.string()
      .required(t("txt.msg_required", { name: t("txt.user_name") }))
      .matches(
        /^(?=.*[a-z])[a-z0-9_]{5,21}$/,
        t("txt.msg_only_char_num", { name: t("txt.user_name") })
      ),
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
    birthday: Yup.mixed().required(t("txt.msg_required_select", { name: t("txt.birthday") })),
    gender: Yup.string().required(t("txt.msg_required_select", { name: t("txt.gender") })),
  });

  const submitRegister = values => {
    callbackRegister({
      ...values,
      birthday: convertStringDate(values.birthday, TYPE_DATE_TIME.TIME_AND_DATE),
    });
  };

  const onSearchUser = (errors, value, type) => () => {
    if (!errors[type] && value) {
      callbackEmptyUser({ value, type });
    }
  };

  const onChangeValueGender = setFieldValue => e => {
    setFieldValue("gender", e.target.value);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={submitRegister} validationSchema={validate}>
      {({ handleSubmit, setFieldValue, errors, values }) => (
        <>
          <div className="login--form">
            <Field
              name="email"
              maxLength={150}
              placeholder={t("txt.val_email")}
              loadingSearch={loadingDuplicate.email}
              IconSearch={CheckCircleOutlined}
              errorSearch={errorDuplicate.email}
              onBlur={onSearchUser(errors, values.email, "email")}
              component={Input}
            />
            <Field
              name="userName"
              onChange={blockSpecialCharInUnder(setFieldValue, "userName")}
              placeholder={t("txt.user_name")}
              loadingSearch={loadingDuplicate.userName}
              IconSearch={CheckCircleOutlined}
              errorSearch={errorDuplicate.userName}
              onBlur={onSearchUser(errors, values.userName, "userName")}
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
              onChange={checkCodeStudent(setFieldValue, "codeStudent")}
              placeholder={t("txt.code_std")}
              loadingSearch={loadingDuplicate.codeStudent}
              IconSearch={CheckCircleOutlined}
              errorSearch={errorDuplicate.codeStudent}
              onBlur={onSearchUser(errors, values.codeStudent, "codeStudent")}
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
            {loadingRegister ? (
              <Dot className="welcome__buttons--loading" />
            ) : (
              <ButtonCommon
                onClick={handleSubmit}
                className="btn-primary login__btn-submit"
                title={t("txt.register")}
              />
            )}
          </div>
        </>
      )}
    </Formik>
  );
}
