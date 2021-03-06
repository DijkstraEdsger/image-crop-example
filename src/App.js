import logo from "./logo.svg";
import mdLogo from './assets/img/maker-icon-big.png';
import "./App.scss";
import React, { useEffect, useRef, useState } from "react";
import Modal from "./components/modal/modal";
import ImageFitCenter from "./components/imageFitCenter/imageFitCenter";
import ImageFitCenterEdit from "./components/imageFitCenterEdit/imageFitCenterEdit";

// simple component to upload images
const Upload = ({
  name,
  label,
  onChange,
  value,
  image,
  preview,
  canChange,
  disabled = false,
  onEdit,
}) => {
  const inputEl = useRef(null);  

  const onLoadFileHandler = () => {
    console.log("load 28");
    if (preview) {
      onEdit();
    } else {
      inputEl.current.click();
    }

    if (inputEl.current.files && inputEl.current.files[0]) {
      inputEl.current.value = "";  
    }   
  };

  return (
    <div className="UploadImage">
      <div className="ImageContainer">
        {preview ? (
          <img className="Image" src={preview} />
        ) : (
          <div className="NoImage">
            {/* <img className="IconBuilding" src={building} /> */}
          </div>
        )}
        {true && (
          <div className="LoadEditIconWrapper" onClick={onLoadFileHandler}>
            {preview ? (
              <span className="material-icons">edit</span>
            ) : (
              <span className="material-icons">photo_camera</span>
            )}
          </div>
        )}
      </div>
      {preview ? (
        <span className="SubText1">Your image</span>
      ) : (
        <span className="SubText1">Upload your image</span>
      )}
      {preview
        ? true && (
            <span className="SubText2">You still can change or remove it</span>
          )
        : true && (
            <span className="SubText2">Add a JPEG or PNG up to 5mb</span>
          )}
      {!disabled && (
        <input
          ref={inputEl}
          type="file"
          id="inputLoadLogoCreateProfile"
          hidden
          onChange={onChange}
          disabled={disabled}
          accept="image/*,image/x-png,image/gif,image/jpeg,image/jpg"
        />
      )}
    </div>
  );
};

function App() {
  // Images upload logic
  const [companyLogo, setCompanyLogo] = useState({
    contentType: "",
    fileSize: 0,
    type: "CompanyAvatar",
    name: "",
  });
  const [fitCenterLogo, setFitCenterLogo] = useState(false);
  const [fitCenterLogoEdit, setFitCenterLogoEdit] = useState(false);
  const [errorLimit, setErrorLimit] = useState(false);
  const [companyLogoPreview, setCompanyLogoPreview] = useState(
    companyLogo.name
  );
  const [zoom, setZoom] = useState(1);
  const [dataTemp, setDataTemp] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);

  const handleCompanyLogo = (e) => {
    if (e.target.files && e.target.files[0]) {
      // check if the size is less than 5mb
      if ((e.target.files[0].size / 1024 / 1024).toFixed(0) < 5) {
        setFitCenterLogoEdit(false);
        setFitCenterLogo(true);

        return setCompanyLogo(e.target.files[0]);
      }

      setErrorLimit(true);
    }

    return setCompanyLogo({
      name: "",
    });
  };

  const imageFitCenterHandler = (croppedImage, originalImage, zoom) => {
    setFitCenterLogo(false);
    setFitCenterLogoEdit(false);
    setCompanyLogoPreview(croppedImage);
    setZoom(zoom);

    fetch(croppedImage)
      .then((res) => res.blob())
      .then((blob) => {
        setCompanyLogo(blob);

        const file2 = new FileReader();
        file2.readAsDataURL(blob);
        file2.onload = (_event) => {
          setDataTemp(croppedImage);
        };

        setOriginalImage(originalImage);

        // Upload
        // fetch('upload', {method: 'POST', body: fd})
      });
  };

  const imageFitCenterEditHandler = (croppedImage) => {
    setFitCenterLogoEdit(false);
    setCompanyLogoPreview(croppedImage);
    // setZoom(zoom);

    fetch(croppedImage)
      .then((res) => res.blob())
      .then((blob) => {
        setCompanyLogo(blob);

        const file2 = new FileReader();
        file2.readAsDataURL(blob);
        file2.onload = (_event) => {
          setDataTemp(croppedImage);
        };
        // Upload
        // fetch('upload', {method: 'POST', body: fd})
      });
  };

  const onRemoveHandler = () => {
    setFitCenterLogoEdit(false);
    setCompanyLogoPreview(null);
    setCompanyLogo({
      name: "",
    });
    // setZoom(zoom);
  };

  const onChangeAfterChangeImageEditHandler = () => {
    setFitCenterLogoEdit(false);
  }; 

  const onChangeAfterErrorLimitHandler = () => {
    setErrorLimit(false);
  };

  return (
    <div className="App">
      <h1>Hello</h1>
      <Upload
        name="companyLogo"
        label={"Image"}
        value={companyLogo.name}
        onChange={handleCompanyLogo}
        image={companyLogo}
        preview={companyLogoPreview}
        onEdit={() => setFitCenterLogoEdit(true)}
      />
      {fitCenterLogo && (
        <Modal width={"auto"} handleClose={() => setFitCenterLogo(false)}>
          <ImageFitCenter
            onContinue={(croppedImage, originalImage, zoom) =>
              imageFitCenterHandler(croppedImage, originalImage, zoom)
            }
            imageSrc={""}
            value={companyLogo.name}
            image={companyLogo}
            preview={companyLogoPreview}
            // setPreview={setCompanyLogoPreview}
            originalImage={originalImage}
          />
        </Modal>
      )}
      {fitCenterLogoEdit && (
        <Modal width={"auto"} handleClose={() => setFitCenterLogoEdit(false)}>
          <ImageFitCenterEdit
            onContinue={(croppedImage) =>
              imageFitCenterEditHandler(croppedImage)
            }
            imageSrc={""}
            value={"temp"}
            image={originalImage}
            preview={originalImage}
            setPreview={setCompanyLogoPreview}
            zoom={zoom}
            onRemove={onRemoveHandler}
            croppedImage={companyLogoPreview}
            onClickChangeImage={onChangeAfterChangeImageEditHandler}
            onChange={handleCompanyLogo}
          />
        </Modal>
      )}
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

            <div className="ButtonsErrorLimitCreateProfileWrapper">
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
      <img src={mdLogo} alt="MD logo"/>
    </div>
  );
}

export default App;
