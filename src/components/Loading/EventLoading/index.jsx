import React from "react";
import { Spin } from "antd";
import { useTranslation } from "react-i18next";

function EventLoading({
  isLoading,
  className,
  dataText = "msg.loading",
  ...props
}) {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      {isLoading && (
        <div className={`event-loading ${className}`}>
          <Spin data-text={t(dataText)} {...props}></Spin>
        </div>
      )}
    </React.Fragment>
  );
}

export default EventLoading;
