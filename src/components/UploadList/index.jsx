import React, { useState } from "react";
import { Upload, Modal } from "antd";
import { PlusOutlined, CameraFilled } from "@ant-design/icons";
import { useMemo } from "react";
import { LIMIT_UPLOAD_NEW, validateIMG } from "../../common";
import { beforeUpload, getBase64 } from "../../utils/upload";
import ButtonCommon from "../Button";
import { useTranslation } from "react-i18next";

function UploadList({callbackChangeFileList, fileList}) {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState(false);
  const [previewTitle, setPreviewTitle] = useState(null);
  const [indexPreview, setIndexPreview] = useState(0);

  const { t } = useTranslation();
  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setIndexPreview(file.name);
    setPreviewTitle(`Photo ${file.name}`);
  };

  const handleChangeUploadList = uploadItem => {
    const fileUpload = uploadItem.fileList;
    const length = fileUpload?.length;
    let fileObject = {};
    if (length > LIMIT_UPLOAD_NEW) return;
    if (length && fileUpload[length - 1]?.originFileObj) {
      fileObject = fileUpload[length - 1];
    }
    if (fileList[fileList.length - 1]?.uid === fileObject.uid && !(fileList.length > length)) {
      return;
    } else if (fileList.length > length || length === 0) {
      callbackChangeFileList(fileUpload);
      return;
    }
    callbackChangeFileList([...fileList, fileObject]);
  };

  const mapFileList = useMemo(() => {
    return fileList.map((item, index) => {
      delete item.response;
      delete item.xhr;
      return { ...item, status: "done", name: index + 1 };
    });
  }, [fileList]);

  const onChangeEditImage = async ({ file }) => {
    if (file.status === "done") {
      const fileListState = fileList.map((item, index) => {
        return index === indexPreview - 1 ? file : item;
      });
      callbackChangeFileList(fileListState);
      setPreviewVisible(false);
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <div className="my-upload">
      <Upload
        action="/"
        method="GET"
        listType="picture-card"
        multiple
        fileList={mapFileList}
        beforeUpload={beforeUpload}
        onPreview={handlePreview}
        accept={validateIMG.toString()}
        onChange={handleChangeUploadList}>
        {fileList?.length >= LIMIT_UPLOAD_NEW ? null : uploadButton}
      </Upload>
      <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="image" style={{ width: "100%" }} src={previewImage} />
        <Upload
          name="image"
          className="upload-avatar"
          action="/"
          method="GET"
          accept={validateIMG.toString()}
          beforeUpload={beforeUpload}
          showUploadList={false}
          onChange={onChangeEditImage}>
          <div className="button btn-edit-photo">
            <ButtonCommon
              icon={<CameraFilled />}
              className="btn-primary"
              title={t("news_feed.edit_img")}
            />
          </div>
        </Upload>
      </Modal>
    </div>
  );
}

export default UploadList;
