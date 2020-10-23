import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  UserOutlined,
  MessageFilled,
  LogoutOutlined,
  BellFilled,
  PlusOutlined,
} from "@ant-design/icons";
import { Typography, Avatar, Popover, Drawer } from "antd";
import SearchTop from "../SearchTop";
import { useSelector, useDispatch } from "react-redux";
import { actions as actionLayout } from "../../pages/Layout/actions";
import SideListFriends from "../../pages/SideListFriends";
import Input from "../Input";
import LogoHeader from "../../resource/image/LogoSidebar.png";
import { useTranslation } from "react-i18next";
import { Field, Formik } from "formik";
import { genderAvatarUrl, onRedirect } from "../../utils";

const { Paragraph } = Typography;

function CommonHeader({ callbackLogout, callbackOpenBoxChat }) {
  const { t } = useTranslation();
  const listGroupsSubjectSearch = useSelector(state => state.layoutReducer.listGroupsSubjectSearch);
  const listUserSearch = useSelector(state => state.layoutReducer.listUserSearch);
  const listHistorySearch = useSelector(state => state.layoutReducer.listHistorySearch);
  const isLoadingSearch = useSelector(state => state.layoutReducer.isLoadingSearch);
  const isLoadingChangePassword = useSelector(state => state.loginReducer.isLoadingChangePassword);
  const initialValues = useSelector(state => state.layoutReducer.initialValuesSearchTop);
  const avatarUrl = useSelector(state => state.loginReducer.userDetail?.avatar);
  const isMobile = useSelector(state => state.layoutReducer.isMobile);
  const [visibleDrawer, setVisibleDrawer] = useState(false);
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

  const resetResultSearch = () => {
    dispatch(actionLayout.postSearchTopError([]));
  };

  const closePopverSearch = () => {
    setVisiblePopoverSearch(false);
  };

  const onHandleSearch = values => {
    if (values.searchText.trim()) {
      dispatch(actionLayout.postSearchTopStart(values));
    }
  };

  const toggleDrawer = () => {
    setVisibleDrawer(!visibleDrawer);
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
        callbackResetSearch={resetResultSearch}
        initialValues={initialValues}
        callbackSearch={onHandleSearch}
        listGroupsSubjectSearch={listGroupsSubjectSearch}
        listHistorySearch={listHistorySearch}
      />
    );
  }, [
    initialValues,
    visiblePopoverSearch,
    listHistorySearch,
    listUserSearch,
    listGroupsSubjectSearch,
    isLoadingSearch,
  ]);

  const renderListFriends = useMemo(() => {
    return (
      <div className="header__search-wrapper">
        <Popover
          placement="bottom"
          visible={visiblePopoverSearch}
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
                  value={initialValues.searchText}
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
    );
  }, [visiblePopoverSearch, isLoadingSearch, initialValues]);

  const renderLisFriendsDrawer = useMemo(() => {
    return (
      <Drawer
        title={[
          <Paragraph
            key={1}
            onClick={() => onRedirect("/")}
            className="header__user--logo"
            level={4}>
            <img width="140" height="55" src={LogoHeader} alt="avatar" />
          </Paragraph>,
        ]}
        placement="right"
        closable={false}
        visible={visibleDrawer}
        onClose={toggleDrawer}
        key="right">
        <SideListFriends callbackOpenBoxChat={callbackOpenBoxChat} />
      </Drawer>
    );
  }, [visibleDrawer]);

  return (
    <div className="header">
      <div className="header__user">
        <Paragraph onClick={() => onRedirect("/")} className="header__user--logo" level={4}>
          <img width="140" height="55" src={LogoHeader} alt="avatar" />
        </Paragraph>
        {!isMobile && renderListFriends}
        <div className="header__user--profile">
          <PlusOutlined className="profile__icon--message" />
          <MessageFilled onClick={toggleDrawer} className="profile__icon--message" />
          <BellFilled className="profile__icon--message" />
          <Popover
            placement="bottomRight"
            content={list}
            trigger="click"
            className="profile__popover"
            visible={visiblePopover}
            onVisibleChange={handleVisibleChange}>
            <Avatar className="profile__icon--avatar" src={genderAvatarUrl(avatarUrl)} />
          </Popover>
          {renderLisFriendsDrawer}
        </div>
      </div>
    </div>
  );
}

export default CommonHeader;
