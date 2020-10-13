import React from "react";
import {
  ArrowLeftOutlined,
  UserOutlined,
  ReadFilled,
  ClockCircleOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { Col, Divider, Empty, Row, Skeleton } from "antd";
import Input from "../Input";
import { useTranslation } from "react-i18next";
import { Field, Formik } from "formik";
import { useMemo } from "react";
import { MENU_DEFAULT } from "../../common";
import Avatar from "antd/lib/avatar/avatar";
import { genderAvatarUrl, onRedirect } from "../../utils";

function SearchTop({
  onClose,
  isLoadingSearch,
  listUserSearch,
  initialValues,
  listGroupsSubjectSearch,
  listHistorySearch,
  callbackSearch,
  callbackResetSearch,
}) {
  const { t } = useTranslation();

  const onSearchByHistory = (searchText, setFieldValue) => {
    callbackSearch({ searchText });
    setFieldValue("searchText", searchText);
  };

  const renderLoadHistory = useMemo(() => {
    return MENU_DEFAULT.map((item, index) => (
      <div key={index} className="search-wrapper__list_history">
        <ClockCircleOutlined />
        <Skeleton.Input style={{ width: 320 }} active />
      </div>
    ));
  }, []);

  const renderLoadListUser = useMemo(() => {
    return MENU_DEFAULT.map((item, index) => (
      <Col key={index} lg={8} md={12} xs={24}>
        <div className="user-wrapper search-item">
          <Avatar src={genderAvatarUrl(null)} />
          <Skeleton.Input style={{ width: 140 }} active />
        </div>
      </Col>
    ));
  }, []);

  const renderLoadListSubject = useMemo(() => {
    return MENU_DEFAULT.map((item, index) => (
      <Col key={index} md={12} xs={24}>
        <div className="subject-wrapper search-item">
          <BookOutlined />
          <Skeleton.Input style={{ width: 180 }} active />
        </div>
      </Col>
    ));
  }, []);

  const onSearchByResult = (endpoint, value, searchText) => {
    callbackSearch({ searchText });
    onClose();
    onRedirect(`/${endpoint}/${value}`);
  };

  const renderListSubjectSearch = useMemo(() => {
    return listGroupsSubjectSearch.map((item, index) => (
      <Col key={index} md={12} xs={24}>
        <div
          onClick={() => onSearchByResult("groups-subject", item.id, item.name)}
          className="subject-wrapper search-item">
          <BookOutlined />
          {item.name}
        </div>
      </Col>
    ));
  }, [listGroupsSubjectSearch]);

  const renderListUserSearch = useMemo(() => {
    return listUserSearch.map((item, index) => (
      <Col key={index} lg={8} md={12} xs={24}>
        <div className="user-wrapper search-item">
          <Avatar src={genderAvatarUrl(item.avatarUrl)} />
          {item.fullName}
        </div>
      </Col>
    ));
  }, [listUserSearch]);

  const onChangeInputSearch = (setFieldValue, name) => ({ target: { value } }) => {
    if (!value) {
      callbackResetSearch();
    }
    setFieldValue(name, value);
  };

  return (
    <Formik onSubmit={callbackSearch} initialValues={initialValues}>
      {({ setFieldValue, values, handleSubmit }) => (
        <div className="search-top">
          <div className="side-friends__search-mess">
            <ArrowLeftOutlined onClick={onClose} />
            {console.log(values.searchText)}
            <Field
              name="searchText"
              maxLength={150}
              type="search"
              onChange={onChangeInputSearch(setFieldValue, "searchText")}
              id="my-search"
              onPressEnter={handleSubmit}
              value={values.searchText}
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
                  listHistorySearch.map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => onSearchByHistory(item, setFieldValue)}
                        className="search-wrapper__list_history">
                        <ClockCircleOutlined />
                        {item}
                      </div>
                    );
                  })
                )
              ) : (
                renderLoadHistory
              )}
            </div>
          )}
          {values.searchText && (
            <div className="search-wrapper">
              <h3 className="search-wrapper__title">
                <UserOutlined />
                {t("search.list_user")}
              </h3>
              <Row className="search-wrapper__list-user" gutter={[8, 8]}>
                {!isLoadingSearch && renderListUserSearch}
                {isLoadingSearch && renderLoadListUser}
              </Row>
              <Divider />
            </div>
          )}
          {values.searchText && (
            <div className="search-wrapper">
              <h3 className="search-wrapper__title">
                <ReadFilled />
                {t("search.list_group_subject")}
              </h3>
              <Row className="search-wrapper__list-subject">
                {!isLoadingSearch && renderListSubjectSearch}
                {isLoadingSearch && renderLoadListSubject}
              </Row>
            </div>
          )}
        </div>
      )}
    </Formik>
  );
}

export default SearchTop;
