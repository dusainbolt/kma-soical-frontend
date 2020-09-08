import React from "react";
import { Menu } from "antd";
import { Routes } from "../../Routes";
import { browserHistory } from "../../utils/history";
import { UploadOutlined, UserOutlined, VideoCameraOutlined, AppstoreFilled } from "@ant-design/icons";
import LazyloadImg from "../LazyLoadingImg";

const icons = {
  manager: UserOutlined,
  task: VideoCameraOutlined,
  contact: UploadOutlined,
};

function Sidebar() {
  const renderMenu = () => {
    let menu = null;
    menu = Routes.map((item, index) => {
      if (index !== 0) {
        const activeClassMenun =
          window.location.pathname === item.path ? "ant-menu-item-selected" : "";
        return (
          <Menu.Item
            key={`${item.name}_${index}`}
            // icon={getIconMenu(item.iconName)}
            onClick={() => gerRedirect(item.path)}
            className={activeClassMenun}
          >
            {item.name}
          </Menu.Item>
        );
      }
    });
    return menu;
  };

  const gerRedirect = path => {
    return browserHistory.push(path);
  };
  const getIconMenu = iconName => {
    const Icon = icons[iconName];
    return icons ? <Icon /> : "";
  };

  return (
    <Menu mode="inline" theme="light" className="side-event layout-page-sider-menu">
      <div className="side-event__info">
        <LazyloadImg
          className="side-event__info--avatar avatar"
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="avatar"
        />
        <div className="side-event__info--text">
          <h3>Du sainbolt</h3>
          <span>@dusainbolt</span>
        </div>
      </div>
      {/* {renderMenu()} */}
      <Menu.Item icon={<AppstoreFilled />} title="Trang chủ" className="ant-menu-item-selected">Trang chủ</Menu.Item>
      <Menu.Item icon={<AppstoreFilled />}>Bạn bè</Menu.Item>
      <Menu.Item icon={<AppstoreFilled />}>Top bài viết</Menu.Item>
      <Menu.Item icon={<AppstoreFilled />} >Ảnh</Menu.Item>
      <Menu.Item icon={<AppstoreFilled />}>Video</Menu.Item>
    </Menu>
  );
}

export default Sidebar;
