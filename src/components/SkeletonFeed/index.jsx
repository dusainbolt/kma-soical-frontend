import React from "react";
import { Skeleton } from "antd";
import Dot from "../Dot";
function FormAddNew() {

  return (
    <div className="form-feed skeleton">
      <Skeleton avatar paragraph={{ rows: 0 }} active />
      <Skeleton paragraph={{ rows: 1 }} active />
      <Skeleton.Input style active/>
      <Dot />
    </div>
  );
}
export default FormAddNew;
