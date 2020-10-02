import React, { useState } from "react";
import { Input } from "antd";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { useMemo } from "react";
import { SmileOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

function InputEmoji({ field, onSelectEmoji, countRows, ...props }) {
  
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

  return (
    <>
      <Input.TextArea onClick={() => onCloseEmoji()} rows={countRows} {...field} {...props} />
      {renderEmojiPicker}
      <SmileOutlined onClick={triggerPicker} className="icon-picker" />
    </>
  );
}

export default InputEmoji;
