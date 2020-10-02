import React from "react";
import { useTranslation } from "react-i18next";
import { getLastName } from "../../utils";
import { Avatar } from "antd";
import SecurityStatus from "../SecurityStatus";
import { Field, Formik } from "formik";
import ButtonCommon from "../Button";
import InputEmoji from "../InputEmoji";
import { TYPE_FEED } from "../../common";

function FormPostTop({ avatarUrl, isLoadingAddNewFeed, fullName, callbackAddNew }) {
  const { t } = useTranslation();
  const initialValues = { caption: "", type: TYPE_FEED.TEXT };

  const onSubmitPostNew = (values, { resetForm }) => {
    if(!values.caption) return;
    values.caption = `<p>${values.caption.replace(/[\n\r]/g, "<br>")}</p>`;
    callbackAddNew(values);
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
                name="caption"
                placeholder={!isLoadingAddNewFeed ? t("txt.place_holder_add_new", { name: getLastName(fullName) }) : ""}
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
