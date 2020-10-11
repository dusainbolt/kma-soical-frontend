import React from "react";
import { Input as InputField } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone, SyncOutlined, WarningOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export default function Input({
  field,
  form: { submitCount, errors },
  labelTitle,
  countRows,
  type,
  loadingSearch,
  errorSearch,
  IconSearch,
  isLoading,
  showError = true,
  Icon,
  refChild,
  callHandleIcon,
  ...props
}) {
  const errorValidate = errors[field.name] && submitCount > 0;
  const classError = showError && errorValidate ? "error-field" : "";
  const { t } = useTranslation();

  return (
    <div className="input">
      {labelTitle && <label>{labelTitle}</label>}
      {type === "password" && (
        <InputField.Password
          className={classError}
          {...field}
          {...props}
          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      )}
      {!type && <InputField className={classError} allowClear {...field} {...props} />}
      {type === "textarea" && (
        <InputField.TextArea
          className={classError}
          ref={refChild}
          rows={countRows}
          {...field}
          {...props}
        />
      )}
      {type === "search" && <InputField.Search {...props} loading={isLoading} />}
      {loadingSearch && <SyncOutlined spin className="input__icon-search" />}
      {errorSearch && !loadingSearch && (
        <>
          <WarningOutlined className="input__icon-search error" />
          <span className="required">{t(`txt.duplicate_${field.name}`)}</span>
        </>
      )}
      {!errorSearch && IconSearch && !loadingSearch && !errorValidate && field.value && (
        <IconSearch onClick={callHandleIcon} className="input__icon-search success" />
      )}
      {Icon && <Icon className="input__icon" onClick={callHandleIcon} />}
      {errorValidate && showError && <span className="required">{errors[field.name]}</span>}
    </div>
  );
}
