/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import { useDispatch, useSelector } from "react-redux";
import { setGroupIcon } from "../redux/app/GroupSlice";

export const ImageCrop = ({ pic }) => {
  const dispatch = useDispatch()
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);

  useEffect(() => {
    setImage(pic);
  }, [pic]);
  // console.log("image---------->",image)

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    console.log("croppedAreaPercentage---------->", croppedAreaPercentage);
    console.log("croppedAreaPixels---------->", croppedAreaPixels);
    setCroppedArea(croppedAreaPixels);
  };

  return (
    <div className="h-screen w-screen">
      <div className="cropper-container">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        
        />
      </div>
      <div className="flex space-x-3">
        <CropButton label={"Crop"} />
        <CropButton
          label={"Cancel"}
          onButtonClick={() => {
            // dispatch(setGroupIcon({groupIcon:null}))
            console.log("cancel button clicked")
          }}
        />
        <CropButton label={"Upload"}
        onButtonClick={() => {
            // dispatch(setGroupIcon({groupIcon:null}))
            console.log("upload button clicked")
          }}
         />
      </div>
    </div>
  );
};

export const CropButton = ({ label, onButtonClick }) => {
  return (
    <>
      <div className="bg-blue-700 text-white px-4 py-2 rounded-full" onClick={onButtonClick}>
        {label}
      </div>
    </>
  );
};
