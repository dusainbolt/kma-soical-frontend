import React, { useState, useEffect, useMemo, useCallback } from "react";
import { UserOutlined, MessageFilled, LogoutOutlined } from "@ant-design/icons";
import { Typography, Avatar, Popover } from "antd";
import SearchTop from "../SearchTop";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../pages/Login/actions";
import { actions as actionLayout } from "../../pages/Layout/actions";

import Input from "../Input";
import LogoHeader from "../../resource/image/LogoSidebar.png";
import { useTranslation } from "react-i18next";
import { Field, Formik } from "formik";

const { Paragraph } = Typography;

function CommonHeader({ callbackLogout }) {
  const { t } = useTranslation();
  const initialValues = { searchText: "" };
  const listGroupsSubjectSearch = useSelector(state => state.layoutReducer.listGroupsSubjectSearch);
  const listUserSearch = useSelector(state => state.layoutReducer.listUserSearch);
  const listHistorySearch = useSelector(state => state.layoutReducer.listHistorySearch);
  const isLoadingSearch = useSelector(state => state.layoutReducer.isLoadingSearch);
  const isLoadingChangePassword = useSelector(state => state.loginReducer.isLoadingChangePassword);
  const [visiblePopoverSearch, setVisiblePopoverSearch] = useState(false);
  const dispatch = useDispatch();
  const [visiblePopover, setVisiblePopover] = useState(false);
  const [visibleModal, setVisibleModal] = useState(true);

  const openModalChangePassword = () => {
    handleVisibleChange();
    setVisibleModal(true);
  };

  const logout = () => {
    callbackLogout();
  };

  const hideModal = () => {
    setVisibleModal(false);
  };

  const list = (
    <ul className="list__profile">
      <li className="list__item" onClick={() => openModalChangePassword()}>
        <UserOutlined className="list__item--icon" /> Change Password
      </li>
      <li onClick={logout} className="list__item">
        <LogoutOutlined className="list__item--icon" /> Log Out
      </li>
    </ul>
  );

  const handleVisibleChange = () => {
    setVisiblePopover(!visiblePopover);
  };

  const handleChangePassword = useCallback(values => {
    dispatch(actions.postChangePasswordStart(values));
  }, []);

  const renderModalChangePassword = useMemo(() => {
    return <div>changePassword</div>;
  }, [visibleModal]);

  useEffect(() => {
    if (isLoadingChangePassword) {
      hideModal();
    }
  }, [isLoadingChangePassword]);

  const openPopverSearch = () => {
    setVisiblePopoverSearch(true);
    if (!listHistorySearch.length) {
      dispatch(actionLayout.getListHistorySearchStart());
    }
  };

  const closePopverSearch = () => {
    setVisiblePopoverSearch(false);
  };

  const onHandleSearch = values => {
    console.log(values);
  };

  const renderContentSearch = useMemo(() => {
    setTimeout(() => {
      const selector = document.getElementById("my-search");
      if (selector) selector.focus();
    }, 200);
    return (
      <SearchTop
        onClose={closePopverSearch}
        isLoadingSearch={isLoadingSearch}
        listUserSearch={listUserSearch}
        callbackSearch={onHandleSearch}
        listGroupsSubjectSearch={listGroupsSubjectSearch}
        listHistorySearch={listHistorySearch}
      />
    );
  }, [
    visiblePopoverSearch,
    isLoadingSearch,
    listHistorySearch,
    listUserSearch,
    listGroupsSubjectSearch,
  ]);

  return (
    <div className="header">
      <div className="header__user">
        <Paragraph className="header__user--logo" level={4}>
          <img width="140" height="55" src={LogoHeader} alt="avatar" />
        </Paragraph>
        <div className="header__search-wrapper">
          <Popover
            placement="bottom"
            visible={true}
            getPopupContainer={triggerNode => triggerNode.parentNode}
            overlayClassName="popover-search"
            content={renderContentSearch}
            trigger="hover">
            <Formik initialValues={initialValues}>
              {({ setFieldValue }) => (
                <div className="side-friends__search-mess">
                  <Field
                    name="searchText"
                    maxLength={150}
                    type="search"
                    onChange={""}
                    onClick={openPopverSearch}
                    isLoading={false}
                    placeholder={t("search.place_search_search-header")}
                    component={Input}
                  />
                </div>
              )}
            </Formik>
          </Popover>
        </div>
        <div className="header__user--profile">
          <MessageFilled className="profile__icon--message" />
          <Popover
            placement="bottomRight"
            content={list}
            trigger="click"
            className="profile__popover"
            visible={visiblePopover}
            onVisibleChange={handleVisibleChange}>
            <Avatar className="profile__icon--avatar" icon={<UserOutlined />} />
          </Popover>
        </div>
      </div>
      {renderModalChangePassword}
    </div>
  );
}

export default CommonHeader;
