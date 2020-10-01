import React from "react";
import { PictureFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { getLastName } from "../../utils";
import { Avatar } from "antd";
import SecurityStatus from "../SecurityStatus";
import { Field, Formik } from "formik";
import Input from "../Input";

function FormPostTop({ avatarUrl, fullName, callBackOpenFormAddNew }) {
  const { t } = useTranslation();
  const initialValues = { text: "" };

  const onSubmitPostNew = values => {};



  return (
    <div className="form-new">
      <div className="form-new__account--wrapper">
        <Avatar className="avatar" size={40} src={avatarUrl} />
        <div className="info">
          <h5 className="title">{fullName}</h5>
          <SecurityStatus />
        </div>
      </div>
      <Formik initialValues={initialValues} onSubmit={onSubmitPostNew}>
        {({ handleSubmit, setFieldValue }) => (
          <div className="form-new__input-wrapper">
            <div className="form-new__input-area">
              <Field
                name="text"
                id="textNew"
                placeholder={t("txt.user_name_or_code")}
                component={Input}
                type="textarea"
                bordered={false}
                autoSize
              />
            </div>
            {/* <div className="welcome__buttons">
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
          </div> */}
          </div>
        )}
      </Formik>
    </div>
  );
}
export default FormPostTop;
