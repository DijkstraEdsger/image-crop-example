import React, { useRef, useState, useEffect } from "react";
import "./imageFitCenterEdit.scss";
import Modal from "../modal/modal";
import QuestionAction from "../questionAction/questionAction";

const ImageFitCenterEdit = (props) => {
  const [removeImage, setRemoveImage] = useState(false);
  const [companyLogo, setCompanyLogo] = useState();
  const inputEl = useRef(null);

  const onRemoveImageHandler = () => {
    setRemoveImage(true);
  };

  const onCancelRemove = () => {
    setRemoveImage(false);
  };

  const onOkRemove = () => {
    setRemoveImage(false);
    props.onRemove();
  };

  // const handleCompanyLogo = (e) => {
  //   if (e.target.files && e.target.files[0]) {
  //     // check if the size is less than 5mb
  //     if ((e.target.files[0].size / 1024 / 1024).toFixed(0) < 5) {
  //       setCompanyLogo(e.target.files[0]);
  //       props.onSelectFile(e.target.files[0]);
  //     }
  //   }
  // };

  const onLoadFileHandler = () => {
    inputEl.current.click();
  };

  return (
    <div className="ImageFitCenterEditWrapper">
      <h2 className="HeadTitle">Edit image!</h2>
      <div className="ImageFitCenterEditWrapper">
        <img className="ImageFitCenterEdit" src={props.croppedImage} />
      </div>
      <span className="SubText">
        {window.innerWidth <= 1024
          ? "Make sure it’s centred!"
          : "You can add a JPEG or PNG up to 5mb."}
      </span>
      <div className="ButtonsImageFitCenterEditWrapper">
        <button
          className="Button Secondary RedButton"
          onClick={onRemoveImageHandler}
        >
          Remove
        </button>
        <button
          className={[
            "Button",
            window.innerWidth > 1024 ? "Secondary" : "",
          ].join(" ")}
          onClick={onLoadFileHandler}
        >
          Change Image
        </button>
      </div>
      <input
        ref={inputEl}
        type="file"
        hidden
        onChange={props.onChange}
        accept="image/x-png,image/gif,image/jpeg,image/jpg"
        name="image"
        className="InputImage"
      />
      {removeImage && (
        <Modal handleClose={() => setRemoveImage(false)}>
          <QuestionAction
            headTitle={"Delete image"}
            question={"Are you sure you want to remove this logo?"}
            onCancel={onCancelRemove}
            onOk={onOkRemove}
            // image={companyLogoPreview}
            image={props.croppedImage}
          />
        </Modal>
      )}
    </div>
  );
};

export default ImageFitCenterEdit;
