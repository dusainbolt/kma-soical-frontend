import React from "react";
import { Spin } from "antd";
import { useTranslation } from "react-i18next";
import { HourglassOutlined } from "@ant-design/icons";

export default function SpinCommon({
  isLoading,
  className,
  content,
  delay = 0,
  dataText = "msg.loading",
  ...props
}) {
  const icon = <HourglassOutlined className="my-spin--icon" spin />;
  const { t } = useTranslation();
  return (
    <div className={isLoading ? "my-spin" : ""}>
      <Spin {...props} indicator={icon} spinning={isLoading} tip={t(dataText)} delay={delay}>
        {content}
      </Spin>
    </div>
  );
}
