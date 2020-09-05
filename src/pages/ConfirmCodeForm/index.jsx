import React from "react";
import { Formik, Field } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import Input from "../../components/Input";
import { onlyNumber } from "../../utils";
import ButtonCommon from "../../components/Button";
import Dot from "../../components/Dot";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "./actions";
import { useEffect } from "react";
import FadeIn from "react-fade-in";
import { showNotifyNormal } from "../../utils";
import { browserHistory } from "../../utils/history";
import { CONFIRM } from "../../common";

export default function FormRegister({ userName, type }) {
  const isLoading = useSelector(state => state.confirmReducer.isLoading);
  const userConfirm = useSelector(state => state.confirmReducer.userConfirm);
  const typeConfirm = useSelector(state => state.confirmReducer.typeConfirm);
  const dispatch = useDispatch();
  const initialValues = {
    sendCode: "",
    userName,
    type,
  };

  const { t } = useTranslation();
  const validate = Yup.object({
    sendCode: Yup.string().required(t("txt.msg_required", { name: t("txt.sendCode") })),
  });

  const submitRegister = values => {
    dispatch(actions.postConfirmCodeStart(values));
  };

  useEffect(() => {
    if (userConfirm?.userName) {
      const title = `confirm_title_${typeConfirm}`;
      const content = `confirm_content_${typeConfirm}`;
      const url = getUrlRedirect();
      showNotifyNormal(title, content);
      browserHistory.push(url);
    }
  }, [userConfirm, typeConfirm]);

  const getUrlRedirect = () => {
    switch (typeConfirm) {
    case CONFIRM.REGISTER:
      return "/login";
    default:
      return "/login";
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={submitRegister} validationSchema={validate}>
      {({ handleSubmit, setFieldValue }) => (
        <>
          <FadeIn delay={200}>
            <div className="login--form">
              <Field
                name="sendCode"
                onChange={onlyNumber(setFieldValue, "sendCode")}
                placeholder={t("txt.sendCode")}
                component={Input}
                maxLength={15}
                onPressEnter={handleSubmit}
              />
            </div>
            <div className="welcome__buttons">
              {isLoading ? (
                <Dot className="welcome__buttons--loading" />
              ) : (
                <ButtonCommon
                  iconSend
                  onClick={handleSubmit}
                  className="btn-primary login__btn-submit"
                  title={t("txt.confirm")}
                />
              )}
            </div>
          </FadeIn>
        </>
      )}
    </Formik>
  );
}
