import React from "react";
import { Badge, Menu, Avatar } from "antd";
import Input from "../Input";
import { Field, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function SidebarMessage() {
  const { t } = useTranslation();
  const initialValues = { searchUser: "" };
  const avatarUrl = useSelector(state => state.loginReducer.userDetail?.avatar);

  return (
    <Menu mode="inline" theme="light" className="layout-page-sider-menu">
      {/* {renderMenu()} */}
      <div className="side-mess__title-mess">{t("side_mess.people_contact")}</div>
      <Formik initialValues={initialValues}>
        {({ handleSubmit, setFieldValue, errors, values }) => (
          <div className="side-mess__search-mess">
            <Field
              name="searchUser"
              maxLength={150}
              type="search"
              isLoading={true}
              placeholder={t("side_mess.place_search_user")}
              // loadingSearch={loadingDuplicate.email}
              // IconSearch={CheckCircleOutlined}
              // errorSearch={errorDuplicate.email}
              // onBlur={onSearchUser(errors, values.email, "email")}
              component={Input}
            />
          </div>
        )}
      </Formik>
      <Menu.Item>
        <div className="side-mess__user-wrapper">
          <Badge dot>
            <Avatar src={avatarUrl} alt="avatar" />
          </Badge>
          <span className="side-mess__user-name">Le Huy Du</span>
        </div>
      </Menu.Item>
      <Menu.Item>
        <div className="side-mess__user-wrapper">
          <Badge count={3}>
            <Avatar src={avatarUrl} alt="avatar" />
          </Badge>
          <span className="side-mess__user-name">Le Huy Du</span>
        </div>
      </Menu.Item>
    </Menu>
  );
}

export default SidebarMessage;
