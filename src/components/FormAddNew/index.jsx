import React from "react";
import { useTranslation } from "react-i18next";
import { getLastName } from "../../utils";
import { Avatar, Select } from "antd";
import SecurityStatus from "../SecurityStatus";
import { Field, Formik } from "formik";
import ButtonCommon from "../Button";
import SelectCommon from "../Select";
import { ReadFilled } from "@ant-design/icons";
import InputEmoji from "../InputEmoji";
import { TYPE_FEED } from "../../common";
const { Option } = Select;

function FormAddNew({
  avatarUrl,
  visibleFormAddNew,
  isLoadingAddNewFeed,
  fullName,
  callbackAddNew,
  listSubject,
}) {
  const { t } = useTranslation();
  const initialValues = { caption: "", subjectId: undefined, tags: undefined, type: TYPE_FEED.TEXT };

  const onSubmitPostNew = values => {
    if (!values.caption) return;
    let caption = values.caption;
    caption = `<p>${caption.replace(/[\n\r]/g, "<br>")}</p>`;
    callbackAddNew({ ...values, caption, subjectId: values.subjectId[0] });
  };

  const getValueSelect = () => {
    const children = [];

    for (let i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }
    return children;
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
      <Formik
        enableReinitialize
        initialValues={visibleFormAddNew && initialValues}
        onSubmit={onSubmitPostNew}>
        {({ handleSubmit, setFieldValue, values }) => (
          <div className="form-new__input-wrapper">
            <div className="form-new__input-area">
              <Field
                name="caption"
                placeholder={
                  !isLoadingAddNewFeed
                    ? t("txt.place_holder_add_new", { name: getLastName(fullName) })
                    : ""
                }
                component={InputEmoji}
                type="textarea"
                bordered={false}
                onSelectEmoji={setFieldValue}
                autoSize={{ minRows: 4 }}
              />
            </div>
            <div className="form-new__row first-to-icon">
              <Field
                name="subjectId"
                placeholder={t("news_feed.place_select_subject")}
                component={SelectCommon}
                title={t("news_feed.title_select_subject")}
                value={values.subjectId}
                options={listSubject}
                Icon={ReadFilled}
                description={t("news_feed.place_select_subject")}
                setValue={setFieldValue}
              />
            </div>
            <div className="form-new__row">
              <Field
                name="tags"
                placeholder={t("news_feed.place_select_tags")}
                component={SelectCommon}
                value={values.tags}
                title={t("news_feed.title_select_tags")}
                modeChange="tags"
                options={[]}
                className="select-tag"
                description={t("news_feed.place_select_tags")}
                setValue={setFieldValue}
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
export default FormAddNew;
