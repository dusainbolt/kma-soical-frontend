import React from "react";
import { Divider, Menu, Skeleton } from "antd";
import { ReadFilled } from "@ant-design/icons";
import { MENU_DEFAULT } from "../../common";
import LazyloadImg from "../../components/LazyLoadingImg";
import { genderAvatarUrl, onRedirect } from "../../utils";
import FadeIn from "react-fade-in";

function Sidebar({ userDetail, listSubject, isLoadingSubject }) {
  const renderMenuDefault = () => {
    return MENU_DEFAULT.map((item, index) => {
      const Icon = item.icon;
      return (
        <Menu.Item
          onClick={() => onRedirect(item.redirect)}
          key={index}
          icon={<Icon />}
          title={item.title}>
          {item.title}
        </Menu.Item>
      );
    });
  };

  const renderMenuGroupSubject = () => {
    return listSubject.map((item, index) => {
      return (
        <Menu.Item
          onClick={() => onRedirect(item.tag)}
          key={item.name}
          icon={<ReadFilled />}
          title={item.name}>
          <FadeIn key={index} delay={100 * index} transitionDuration={300}>
            {item.name}
          </FadeIn>
        </Menu.Item>
      );
    });
  };

  const renderMenuSubjectLoad = () => {
    return MENU_DEFAULT.map((item, index) => {
      return (
        <Menu.Item key={index + 99} icon={<ReadFilled />}>
          <Skeleton.Input style={{ width: 200 }} active />
        </Menu.Item>
      );
    });
  };

  return (
    <Menu mode="inline" theme="light" className="side-event layout-page-sider-menu">
      <div className="side-event__info">
        <LazyloadImg
          className="side-event__info--avatar avatar"
          src={genderAvatarUrl(userDetail?.avatar)}
          alt="avatar"
        />
        <div className="side-event__info--text">
          <h3>{userDetail?.get_user_info?.fullName}</h3>
          <span>@{userDetail?.userName}</span>
        </div>
      </div>
      {renderMenuDefault()}
      <Divider className="divider-menu-left" />
      {isLoadingSubject ? renderMenuSubjectLoad() : renderMenuGroupSubject()}
    </Menu>
  );
}

export default Sidebar;
