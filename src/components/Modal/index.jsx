import React from "react";
import { Modal, Typography } from "antd";
import Spin from "../Spin";
const { Title } = Typography;

function ModalCommon({
  visible,
  onCancel,
  width,
  classTitle = "",
  title,
  isLoadingSpin = false,
  content,
  levelTitle = 4,
}) {
  const renderContent = () => {
    return (
      <div className="modal--body">
        <Title className={`modal__title ${classTitle}`} level={levelTitle}>
          <span>{title}</span>
        </Title>
        {content}
      </div>
    );
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      wrapClassName="modal"
      width={width}
      footer={null}
      title={null}
      closable={false}
    >
      <Spin isLoading={isLoadingSpin} content={renderContent()} />
    </Modal>
  );
}

export default ModalCommon;
