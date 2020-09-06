import React from "react";
import { Formik, Field } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import Input from "../../components/Input";
import ButtonCommon from "../../components/Button";
import Dot from "../../components/Dot";

function LoginForm({ callbackLogin, isLoading }) {
  const initialValues = { uniqueUser: "", password: "" };
  const { t } = useTranslation();
  const validate = Yup.object({
    uniqueUser: Yup.string().required(t("txt.msg_required_unique_login")),
    password: Yup.string().required(t("txt.msg_required", { name: t("txt.val_password") })),
  });

  const submitLogin = values => {
    callbackLogin(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={submitLogin} validationSchema={validate}>
      {({ handleSubmit }) => (
        <>
          <div className="login--form">
            <Field
              onPressEnter={handleSubmit}
              name="uniqueUser"
              placeholder={t("txt.user_name_or_code")}
              component={Input}
            />
            <Field
              type="password"
              name="password"
              onPressEnter={handleSubmit}
              placeholder={t("txt.val_password")}
              component={Input}
            />
            <span className="login__label">{t("txt.forgot_pass")}</span>
          </div>
          <div className="welcome__buttons">
            {isLoading ? (
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
        </>
      )}
    </Formik>
  );
}

export default LoginForm;
