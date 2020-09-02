import React from "react";
import { DatePicker } from "antd";
import { FORMAT_DATE } from "../../common";
function DatePickerComponent({
  field,
  form: { touched, errors },
  labelTitle,
  required,
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
      <DatePicker {...props} />
      {errors[field.name] && touched[field.name] && (
        <span className="required">{errors[field.name]}</span>
      )}
    </div>
  );
}

export default DatePickerComponent;
