import React from "react";
import { Radio } from "antd";
function RadioCheck({
  field,
  form: { submitCount, errors },
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
      {errors[field.name] && submitCount > 0 && (
        <span className="required">{errors[field.name]}</span>
      )}
    </div>
  );
}

export default RadioCheck;
