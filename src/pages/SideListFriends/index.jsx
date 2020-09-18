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
import { genderAvatarUrl, renderErrorSearch } from "../../utils";
import LoadComment from "../../components/LoadComment";
import FadeIn from "react-fade-in";
import { useCallback } from "react";

function SidebarMessage({ callbackOpenBoxChat }) {
  const { t } = useTranslation();
  const initialValues = { searchText: "" };
  const loadingListUser = useSelector(state => state.sideBarMessage.loadingListUser);
  const listFriends = useSelector(state => state.sideBarMessage.listFriends);
  const userInbox = useSelector(state => state.sideEvent.userInbox);

  const [searchText, setSearchText] = useState("");
  const [limit, setLimit] = useState(LIMIT.LIST_USER);
  const [offset, setOffset] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getListFriendsStart({ limit, offset, searchText }));
  }, [searchText]);

  const onOpenChat = (item, idUserInbox) => () => {
    if(item.userId === idUserInbox ) return;
    callbackOpenBoxChat(item, { offset: 0, limit: LIMIT.LIST_CHAT });
  };
  
  const renderListFriends = useMemo(() => {
    if (!listFriends.length) return renderErrorSearch("search-list-friends");
    return listFriends.map((item, index) => {
      return (
        <FadeIn key={index} delay={100 * index} transitionDuration={300}>
          <div onClick={onOpenChat(item, userInbox?.userId)} className="side-friends__user-wrapper">
            <Badge dot={item.isOnline ? true : null} count={null}>
              <Avatar src={genderAvatarUrl(item.avatarUrl)} alt="avatar" />
            </Badge>
            <span className="side-friends__user-name">{item.fullName}</span>
          </div>
        </FadeIn>
      );
    });
  }, [listFriends, userInbox]);

  const onSearchFriends = (setFieldValue, name) => e => {
    const value = e.target.value;
    setFieldValue(name, value);
    setSearchText(value);
  };

  return (
    <Menu mode="inline" theme="light" className="layout-page-sider-menu">
      <div className="side-friends__title-mess">{t("side_mess.people_contact")}</div>
      <Formik initialValues={initialValues}>
        {({ setFieldValue }) => (
          <div className="side-friends__search-mess">
            <Field
              name="searchText"
              maxLength={150}
              type="search"
              onChange={onSearchFriends(setFieldValue, "searchText")}
              isLoading={loadingListUser}
              placeholder={t("side_mess.place_search_user")}
              component={Input}
            />
          </div>
        )}
      </Formik>
      {loadingListUser ? (
        <LoadComment total={5} className={"load-list-user"} />
      ) : (
        <div className="side-friends__list">{renderListFriends}</div>
      )}
    </Menu>
  );
}

export default SidebarMessage;
