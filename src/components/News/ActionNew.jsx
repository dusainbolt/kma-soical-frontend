import React from "react";
import { HeartOutlined, MessageOutlined, HeartFilled } from "@ant-design/icons";
import Dot from "../Dot";
import { LIKE, NO_LIKE } from "../../common";
import { useTranslation } from "react-i18next";

function ActionNew({ toggleLike, index, isLoadingLike, isLikeByMe }) {
  const { t } = useTranslation();

  return (
    <div className="form-feed__action-post">
      {isLoadingLike[index] ? (
        <Dot />
      ) : (
        <div
          onClick={() => toggleLike(index, isLikeByMe ? NO_LIKE : LIKE)}
          className="form-feed__action-post--item">
          {isLikeByMe ? <HeartFilled className="is-like" /> : <HeartOutlined />}
          <span className="action-post">{t("news_feed.like")}</span>
        </div>
      )}

      <div className="form-feed__action-post--item">
        <MessageOutlined />
        <span className="action-post">{t("news_feed.comment")}</span>
      </div>
    </div>
  );
}

export default ActionNew;
