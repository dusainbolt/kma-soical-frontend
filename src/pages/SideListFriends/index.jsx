import React, { useState, useEffect, useMemo } from "react";
import { Badge, Menu, Avatar, Popover } from "antd";
import Input from "../../components/Input";
import { Field, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "./actions";
import { LIMIT } from "../../common";
import { genderAvatarUrl, renderErrorSearch } from "../../utils";
import LoadComment from "../../components/LoadComment";
import FadeIn from "react-fade-in";

function SidebarMessage({ callbackOpenBoxChat }) {
  const { t } = useTranslation();
  const initialValues = { searchText: "" };
  const loadingListUser = useSelector(state => state.sideBarMessage.loadingListUser);
  const listFriends = useSelector(state => state.sideBarMessage.listFriends);
  const idUserShowMess = useSelector(state => state.sideBarMessage.idUserShowMess);
  const userInbox = useSelector(state => state.boxChat.userInbox);
  const isMobile = useSelector(state => state.layoutReducer.isMobile);
  const avatarReducer = useSelector(state => state.loginReducer.userDetail?.avatar);
  const myUserId = useSelector(state => state.loginReducer.userDetail?.id);

  const [searchText, setSearchText] = useState(null);
  const [visiblePopoverMess, setVisiblePopoverMess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getListFriendsStart({ limit: LIMIT.LIST_USER, searchText }));
  }, [searchText]);

  const onOpenChat = (item, idUserInbox) => () => {
    if (item.userId === idUserInbox) return;
    callbackOpenBoxChat(item);
    setVisiblePopoverMess(false);
  };

  const renderContentMessage = message => {
    return (
      <div className="my-popover__mess-content" onClick={() => setVisiblePopoverMess(false)}>
        {message}
      </div>
    );
  };

  const renderListFriends = useMemo(() => {
    if (!listFriends.length) return renderErrorSearch("search-list-friends");
    return listFriends.map((item, index) => {
      const visibleShowMess = item.userId === idUserShowMess;
      return (
        <FadeIn key={index} delay={100 * index} transitionDuration={300}>
          <div onClick={onOpenChat(item, userInbox?.userId)} className="side-friends__user-wrapper">
            <Popover
              placement="left"
              visible={visibleShowMess && visiblePopoverMess}
              content={renderContentMessage(item.content)}
              trigger="hover"
              onClick={() => setVisiblePopoverMess(false)}>
              <Badge
                dot={!item.countMessage && item.isOnline ? true : null}
                count={item.countMessage ? item.countMessage : null}>
                <Avatar
                  src={genderAvatarUrl(item.userId === myUserId ? avatarReducer : item.avatarUrl)}
                  alt="avatar"
                />
              </Badge>
            </Popover>
            {<span className="side-friends__user-name">{item.fullName}</span>}
          </div>
        </FadeIn>
      );
    });
  }, [listFriends, userInbox, visiblePopoverMess, avatarReducer, isMobile]);

  useEffect(() => {
    setTimeout(() => setVisiblePopoverMess(true));
  }, [listFriends]);

  const onSearchFriends = (setFieldValue, name) => e => {
    const value = e.target.value;
    setFieldValue(name, value);
    setSearchText(value);
  };

  return (
    <Menu mode="inline" theme="light" className="layout-page-sider-menu">
      <div className="side-friends__title-mess">{t("search.people_contact")}</div>
      <Formik initialValues={initialValues}>
        {({ setFieldValue }) => (
          <div className="side-friends__search-mess">
            <Field
              name="searchText"
              maxLength={150}
              type="search"
              onChange={onSearchFriends(setFieldValue, "searchText")}
              isLoading={loadingListUser}
              placeholder={t("search.place_search_user")}
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
