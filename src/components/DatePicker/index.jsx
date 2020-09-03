import React from "react";
import { DatePicker } from "antd";
import { DATE_UTC_FORMAT } from "../../common";
function DatePickerComponent({
  field,
  form: { submitCount, errors },
  labelTitle,
  required,
  format,
  wrapperClass,
  ...props
}) {
  return (
    <div className={`date-picker ${wrapperClass}`}>
      {labelTitle && (
        <label htmlFor={field.name}>
          {labelTitle} {required && <span className="required">*</span>}
        </label>
      )}
      <DatePicker format={format ? format : DATE_UTC_FORMAT} {...props} />
      {errors[field.name] && submitCount > 0 && (
        <span className="required">{errors[field.name]}</span>
      )}
    </div>
  );
}

export default DatePickerComponent;
