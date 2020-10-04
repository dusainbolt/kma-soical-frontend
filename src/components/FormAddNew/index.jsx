import React from "react";
import { useTranslation } from "react-i18next";
import { getLastName, renderImageOrder } from "../../utils";
import { Avatar } from "antd";
import SecurityStatus from "../SecurityStatus";
import { Field, Formik } from "formik";
import ButtonCommon from "../Button";
import SelectCommon from "../Select";
import { ReadFilled } from "@ant-design/icons";
import InputEmoji from "../InputEmoji";
import { TYPE_FEED } from "../../common";
import UploadList from "../UploadList";
import { useState } from "react";
import { useEffect } from "react";

function FormAddNew({
  avatarUrl,
  visibleFormAddNew,
  isLoadingAddNewFeed,
  fullName,
  callbackAddNew,
  listSubject,
  typeNew,
}) {
  const { t } = useTranslation();
  const [visibleImageRapper, setVisibleImageRapper] = useState(false);
  const [fileList, setFileList] = useState([]);
  const typeImage = typeNew === TYPE_FEED.IMAGE;
  const initialValues = {
    caption: "",
    subjectId: undefined,
    tag: undefined,
    type: typeNew,
  };

  const onSubmitPostNew = values => {
    if (
      (!fileList.length && !values.caption && !visibleImageRapper) ||
      (visibleImageRapper &&
        (!fileList.length || values.caption) &&
        (!values.caption || !fileList.length))
    ) {
      return;
    }
    let caption = values.caption;
    caption = `<p>${caption.replace(/[\n\r]/g, "<br>")}</p>`;
    const typeNewFeed = visibleImageRapper ? TYPE_FEED.IMAGE : typeNew;
    let bodyFormData = new FormData();
    if (fileList.length) {
      renderImageOrder(fileList, bodyFormData);
    }
    for (let [key, value] of Object.entries(values)) {
      if (value) {
        bodyFormData.set(key, value);
      }
    }
    bodyFormData.set("caption", caption);
    bodyFormData.set(
      "type",
      typeNewFeed === TYPE_FEED.IMAGE && fileList.length === 0 ? TYPE_FEED.TEXT : typeNewFeed
    );
    callbackAddNew(bodyFormData);
  };

  const toggleAddImageWrapper = () => {
    setVisibleImageRapper(!visibleImageRapper);
  };

  const onRecevieFileList = fileListRecive => {
    setFileList(fileListRecive);
  };

  useEffect(() => {
    setVisibleImageRapper(false);
  }, [typeNew]);

  useEffect(() => {
    if (!visibleImageRapper && !typeImage) {
      setFileList([]);
    }
  }, [visibleImageRapper, typeNew]);

  useEffect(() => {
    setFileList([]);
  }, [visibleFormAddNew]);

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
                visibleFormAddNew={visibleFormAddNew}
                placeholder={
                  !isLoadingAddNewFeed
                    ? t("txt.place_holder_add_new", { name: getLastName(fullName) })
                    : ""
                }
                component={InputEmoji}
                type="textarea"
                callbackVisibleImage={toggleAddImageWrapper}
                bordered={false}
                onSelectEmoji={setFieldValue}
                autoSize={{ minRows: 4 }}
              />
            </div>
            {(typeImage || visibleImageRapper) && (
              <UploadList callbackChangeFileList={onRecevieFileList} fileList={fileList} />
            )}
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
                name="tag"
                placeholder={t("news_feed.place_select_tags")}
                component={SelectCommon}
                value={values.tag}
                title={t("news_feed.title_select_tags")}
                modeChange="tags"
                options={[]}
                className="select-tag"
                description={t("news_feed.des_select_tags")}
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
