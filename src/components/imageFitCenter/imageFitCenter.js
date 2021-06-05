import React, { useRef, useState, useEffect } from "react";
import "./imageFitCenter.scss";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../utils/cropImage";
import Modal from "../modal/modal";

const ImageFitCenter = (props) => {
  const inputEl = useRef(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [croppedImage, setCroppedImage] = useState(null);
  const [errorLimit, setErrorLimit] = useState(false);

  const INITIAL_STATE = {
    image: props.image,
    zoom: 1,
  };

  useEffect(() => {
    getImage(props.value, props.image, props.preview);
  }, []);

  const [zoom, setZoom] = useState(1);

  // Images upload logic
  const [companyLogo, setCompanyLogo] = useState({
    contentType: "",
    fileSize: 0,
    type: "CompanyAvatar",
    name: INITIAL_STATE.image,
  });

  const [companyLogoPreview, setCompanyLogoPreview] = useState(null);
  const [originalImage, setOriginalImage] = useState(props.image);

  const zoomHandler = (e) => {
    setZoom(e.target.value);
  };

  const handleCompanyLogo = (e) => {
    if (e.target.files && e.target.files[0]) {
      // check if the size is less than 5mb
      if ((e.target.files[0].size / 1024 / 1024).toFixed(0) < 5) {
        getImage(e.target.files[0].name, e.target.files[0], companyLogoPreview);

        setOriginalImage(e.target.files[0]);

        return setCompanyLogo(e.target.files[0]);
      }

      setErrorLimit(true);
    }

    return setCompanyLogo({
      name: INITIAL_STATE.companyLogo,
    });
  };

  const onLoadFileHandler = () => {
    inputEl.current.click();
  };

  const getImage = (value, image, preview) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (_event) => {
      setCompanyLogoPreview(reader.result);
    };
    return setCompanyLogoPreview(preview);
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    try {
      const croppedIm = await getCroppedImg(
        companyLogoPreview,
        croppedAreaPixels,
        rotation
      );

      // setCroppedImage(croppedImage);
      props.onContinue(croppedIm, originalImage, zoom);
    } catch (e) {
      console.error(e);
    }
  };

  const onChangeAfterErrorLimitHandler = () => {
    setErrorLimit(false);
    onLoadFileHandler();
  };

  return (
    <div className="ImageFitCenterWrapper">
      <h2 className="HeadTitle">Nice image!</h2>
      <div className="ImageContainer">
        <Cropper
          image={companyLogoPreview}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          showGrid={false}
          cropSize={{ width: 162, height: 162 }}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>

      <span className="SubText">Make sure it’s centred!</span>
      <div className="slidecontainer">
        <input
          type="range"
          min="1"
          max="3"
          step="0.1"
          value={zoom}
          className="slider"
          id="myRange"
          onChange={(event) => zoomHandler(event)}
          name="zoom"
        />
      </div>
      <div className="ButtonsWrapper">
        <button className="Button Secondary" onClick={onLoadFileHandler}>
          Change
        </button>
        <button className="Button" onClick={showCroppedImage}>
          Continue
        </button>
      </div>
      <input
        ref={inputEl}
        type="file"
        hidden
        onChange={handleCompanyLogo}
        accept="image/x-png,image/gif,image/jpeg,image/jpg"
        name="image"
        className="InputImage"
      />
      {errorLimit && (
        <Modal handleClose={() => setErrorLimit(false)}>
          <div className="ErrorLimitWrapperCreateProfile">
            <h2 className="ErrorLimitHeadTitle">
              Sorry - your file is too large!
            </h2>
            {/* <img src={}/> */}
            <span className="Sad">:(</span>
            <span className="ErrorLimitSubText">
              You can add JPEG and PNG up to 5mb.
            </span>

            <div className="ButtonsWrapper">
              <button
                className="Button Secondary"
                onClick={onChangeAfterErrorLimitHandler}
              >
                Change
              </button>
              <button className="Button" onClick={() => setErrorLimit(false)}>
                Continue
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ImageFitCenter;
