import React, { useState } from "react";
import { MenuOutlined, UserOutlined, MessageFilled, LogoutOutlined } from "@ant-design/icons";
import "./index.scss";
import { Typography, Avatar, Popover, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../pages/Login/actions";
import LogoHeader from "../../common/image/LogoSidebar.png";
import { useMemo } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";

const { Paragraph } = Typography;

function CommonHeader({ callbackLogout, toggleMenu }) {
  const { t } = useTranslation();
  const token = useSelector(state => state.loginReducer.auth?.token);
  const userDetail = useSelector(state => state.loginReducer.userDetail);
  const isLoadingChangePassword = useSelector(state => state.loginReducer.isLoadingChangePassword);

  const dispatch = useDispatch();
  const [visiblePopover, setVisiblePopover] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);


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
    return (
      <div>changePassword</div>
    );
  }, [visibleModal]);

  useEffect(() => {
    if (isLoadingChangePassword) {
      hideModal();
    }
  }, [isLoadingChangePassword]);

  return (
    <div className="header">
      <MenuOutlined className="header__icon" onClick={toggleMenu} />
      <div className="header__actor">
        <Paragraph className="header__actor--logo" level={4}>
          <img width="140" height="55" src={LogoHeader} alt="avatar" />
        </Paragraph>
        <div className="header__actor--profile">
          <MessageFilled className="profile__icon--message" />
          <Popover
            placement="bottomRight"
            content={list}
            trigger="click"
            className="profile__popover"
            visible={visiblePopover}
            onVisibleChange={handleVisibleChange}
          >
            <Avatar className="profile__icon--avatar" icon={<UserOutlined />} />
          </Popover>
        </div>
      </div>
      {renderModalChangePassword}
    </div>
  );
}

export default CommonHeader;
