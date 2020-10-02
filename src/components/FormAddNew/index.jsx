import React from "react";
import { PictureFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { getLastName } from "../../utils";
import { Avatar } from "antd";
import SecurityStatus from "../SecurityStatus";
import { Field, Formik } from "formik";
import ButtonCommon from "../Button";
import InputEmoji from "../InputEmoji";

function FormPostTop({ avatarUrl, fullName, callBackOpenFormAddNew }) {
  const { t } = useTranslation();
  const initialValues = { payload: "" };

  const onSubmitPostNew = (values, { resetForm }) => {
    values.payload = `<p>${values.payload.replace(/[\n\r]/g, "<br>")}</p>`;
    console.log(values);
    resetForm();
  };

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
                name="payload"
                placeholder={t("txt.place_holder_add_new", { name: getLastName(fullName) })}
                component={InputEmoji}
                type="textarea"
                bordered={false}
                onSelectEmoji={setFieldValue}
                autoSize={{ minRows: 4 }}
              />
            </div>
            <div className="button">
              <ButtonCommon
                className="btn-primary"
                onClick={handleSubmit}
                title={t("news_feed.btn_post")}
              />
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}
export default FormPostTop;
