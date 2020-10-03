import React from "react";
import { Select } from "antd";
import { useRef } from "react";

const { Option } = Select;
function SelectCommon({
  setValue,
  form,
  options,
  modeChange = "",
  title,
  description,
  field,
  Icon,
  ...props
}) {
  let refSelect = useRef(null);

  const handleChange = values => {
    if (!modeChange && values.length > 1) {
      values.shift();
    }
    if (modeChange === "tags" && values.length) {
      values[values.length - 1] = values[values.length - 1].replace(/\s+/g, "");
    }
    setValue(field.name, values);
  };

  const renderOption = () => {
    return options.map(item => (
      <Option value={item.id} label={item.name} key={item.id}>
        {Icon && <Icon />}
        {item.name}
      </Option>
    ));
  };

  return (
    <div className="my-select">
      {title && (
        <label htmlFor={field.name} className="my-select__title">
          {title}
        </label>
      )}
      {description && <p className="my-select__description">{description}</p>}
      <Select
        ref={node => (refSelect = node)}
        allowClear
        mode={modeChange ? modeChange : "multiple"}
        onChange={handleChange}
        {...props}>
        {renderOption()}
      </Select>
    </div>
  );
}

export default SelectCommon;
