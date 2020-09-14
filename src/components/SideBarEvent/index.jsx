import React from "react";
import { Menu } from "antd";
import { Routes } from "../../Routes";
import { browserHistory } from "../../utils/history";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import BoxChat from "../../components/BoxChat";
const icons = {
  manager: UserOutlined,
  task: VideoCameraOutlined,
  contact: UploadOutlined,
};

function SidebarEvent() {
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
    // <Menu mode="inline" theme="light" className="layout-page-sider-menu">
    //   {renderMenu()}
    // </Menu>
    <div className="side-event">
      <div className="side-event__notify"></div>
      <div className="side-event__top-dashboard side-event__mess-box">
          {/* <div>Dashboard</div> */}
          <BoxChat />
      </div>
    </div>
  );
}

export default SidebarEvent;
