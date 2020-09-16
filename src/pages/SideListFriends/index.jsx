import React, { useState } from "react";
import { Badge, Menu, Avatar } from "antd";
import Input from "../../components/Input";
import { Field, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { actions } from "./actions";
import { LIMIT } from "../../common";
import { useMemo } from "react";
import { genderAvatarUrl } from "../../utils";
import FadeIn from "react-fade-in";

function SidebarMessage() {
  const { t } = useTranslation();
  const initialValues = { searchUser: "" };
  const loadingListUser = useSelector(state => state.sideBarMessage.loadingListUser);
  const listFriends = useSelector(state => state.sideBarMessage.listFriends);
  const [limit, setLimit] = useState(LIMIT.LIST_USER);
  const [offset, setOffset] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getListFriendsStart({ limit, offset }));
  }, []);

  const renderListFriends = useMemo(() => {
    if (!listFriends.length) return "Khong co ket qua nao";
    return listFriends.map((item, index) => {
      return (
        <Menu.Item key={index}>
          <FadeIn delay={100 * index} transitionDuration={300}>
            <div className="side-mess__user-wrapper">
              <Badge dot={null} count={null}>
                <Avatar src={genderAvatarUrl(item.avatarUrl)} alt="avatar" />
              </Badge>
              <span className="side-mess__user-name">{item.fullName}</span>
            </div>
          </FadeIn>
        </Menu.Item>
      );
    });
  }, [listFriends]);

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
      {!loadingListUser && renderListFriends}
        <div className="side-mess__search-mess--error">{t("list_friends.err_search")}</div>
    </Menu>
  );
}

export default SidebarMessage;
