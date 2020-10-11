import React from "react";
import {
  ArrowLeftOutlined,
  UserOutlined,
  ReadFilled,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Divider, Empty, Skeleton } from "antd";
import Input from "../Input";
import { useTranslation } from "react-i18next";
import { Field, Formik } from "formik";
import { useMemo } from "react";
import { MENU_DEFAULT } from "../../common";

function SearchTop({
  onClose,
  isLoadingSearch,
  listUserSearch,
  listGroupsSubjectSearch,
  listHistorySearch,
  showHistory,
  callbackSearch,
}) {
  const { t } = useTranslation();
  const initialValues = { searchText: "" };

  const genderListHistory = useMemo(() => {
    return listHistorySearch.map((item, index) => {
      return (
        <div key={index} className="search-wrapper__list_history">
          <ClockCircleOutlined />
          {item}
        </div>
      );
    });
  }, [listHistorySearch]);

  const renderLoadHistory = useMemo(() => {
    return MENU_DEFAULT.map((item, index) => (
      <div key={index} className="search-wrapper__list_history">
        <ClockCircleOutlined />
        <Skeleton.Input style={{ width: 320 }} active />
      </div>
    ));
  }, []);

  return (
    <Formik onSubmit={callbackSearch} initialValues={initialValues}>
      {({ setFieldValue, values, handleSubmit }) => (
        <>
          {console.log("form-search", values, isLoadingSearch)}
          <div className="side-friends__search-mess">
            <ArrowLeftOutlined onClick={onClose} />
            <Field
              name="searchText"
              maxLength={150}
              type="search"
              id="my-search"
              onBlur={onClose}
              onPressEnter={handleSubmit}
              isLoading={false}
              onSearch={handleSubmit}
              placeholder={t("search.place_search_search-header")}
              component={Input}
            />
          </div>
          {!values.searchText && (
            <div className="search-wrapper">
              <h3 className="search-wrapper__title">
                {!listHistorySearch.length ? t("search.history_empty") : t("search.history")}
              </h3>
              {!isLoadingSearch ? (
                !listHistorySearch.length ? (
                  <Empty description={false} />
                ) : (
                  genderListHistory
                )
              ) : (
                renderLoadHistory
              )}
            </div>
          )}

          {/* <div className="search-wrapper">
            <h3 className="search-wrapper__title">
              <UserOutlined />
              {t("search.list_user")}
            </h3>
            <Empty description={false} />
            <Divider />
          </div>
          <div className="search-wrapper">
            <h3 className="search-wrapper__title">
              <ReadFilled />
              {t("search.list_group_subject")}
            </h3>
            <Empty description={false} />
          </div> */}
          {/* <div className="search-wrapper">
            <h3 className="search-wrapper__title">{t("search.history_empty")}</h3>
            <Empty description={false} />
          </div> */}
        </>
      )}
    </Formik>
  );
}

export default SearchTop;
