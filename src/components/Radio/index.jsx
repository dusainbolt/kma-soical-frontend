import React from "react";
import { Radio } from "antd";
function RadioCheck({
  field,
  form: { touched, errors },
  labelTitle,
  required,
  wrapperClass,
  ...props
}) {
  return (
    <div className={`radio ${wrapperClass}`}>
      {labelTitle && (
        <label htmlFor={field.name}>
          {labelTitle} {required && <span className="required">*</span>}
        </label>
      )}
      <Radio.Group {...props} />
      {errors[field.name] && touched[field.name] && (
        <span className="required">{errors[field.name]}</span>
      )}
    </div>
  );
}

export default RadioCheck;
