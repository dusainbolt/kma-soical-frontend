import React, { useState, useMemo, useEffect } from "react";
import { Input } from "antd";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { SmileOutlined, PictureFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

function InputEmoji({ field, onSelectEmoji, visibleFormAddNew, countRows, callbackVisibleImage, ...props }) {
  const { t } = useTranslation();

  const [emojiPickerState, SetEmojiPicker] = useState(false);

  const renderEmojiPicker = useMemo(() => {
    return (
      emojiPickerState && (
        <Picker
          title={t("news_feed.place_select_emoji")}
          emoji="point_up"
          onSelect={emoji => onSelectEmoji(field.name, field.value + emoji.native)}
        />
      )
    );
  }, [emojiPickerState, field.value]);

  const triggerPicker = event => {
    event.preventDefault();
    SetEmojiPicker(!emojiPickerState);
  };

  const onCloseEmoji = () => {
    emojiPickerState && SetEmojiPicker(false);
  };

  useEffect(() => {
    onCloseEmoji();
  },[visibleFormAddNew]);

  return (
    <>
      <Input.TextArea rows={countRows} {...field} {...props} />
      <SmileOutlined onClick={triggerPicker} className="icon-picker" />
      <PictureFilled onClick={() => callbackVisibleImage()} className="icon-picker" />
      {renderEmojiPicker}
    </>
  );
}

export default InputEmoji;
