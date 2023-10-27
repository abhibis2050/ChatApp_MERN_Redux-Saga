/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import { useDispatch, useSelector } from "react-redux";
import { setGroupIcon } from "../../redux/app/GroupSlice";
import { getCroppedImage } from "./getCroppedImage";
import UrlToFile from "./DataUrlToFile";
import { setUserIcon } from "../../redux/app/UserSlice";

export const ImageCrop = ({ pic, isGroup, isSingle }) => {
  const formData = new FormData();
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const { selectedGroupDetails } = useSelector((state) => state.group);
  const { authUser } = useSelector((state) => state.auth);
  useEffect(() => {
    setImage(pic);
  }, [pic]);
  console.log("image---------->", image);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const UploadHandler = async () => {
    const croppedImageBase64 = await getCroppedImage(image, croppedArea);
    const CroppedFile = await UrlToFile(croppedImageBase64, "cropped.jpeg");
    formData.append("updateAvatar", CroppedFile);
    dispatch({
      type: "UPLOAD_PROFILE_ICON",
      payload: {
        body: formData,
        userId: authUser?._id,
      },
    });
    dispatch(setUserIcon({ userIcon: null }));
  };

  const UploadGroupHandler = async () => {
    const croppedImageBase64 = await getCroppedImage(image, croppedArea);
    const CroppedFile = await UrlToFile(croppedImageBase64, "cropped.jpeg");
    formData.append("updateAvatar", CroppedFile);
    dispatch({
      type: "UPLOAD_GROUP_PROFILE_ICON",
      payload: {
        body: formData,
        groupId: selectedGroupDetails?._id,
      },
    });

    dispatch(setGroupIcon({ groupIcon: null }));
  };

  return (
    <div className="h-[100vh] w-[100vw] rounded-3xl ">
      <div className="h-[90%] relative ">
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
      <div className="flex space-x-3 bg-white h-[10%] items-end justify-center py-2">
        {/* <CropButton label={"Crop"} /> */}
        <CropButton
          label={"Cancel"}
          onButtonClick={() => {
            dispatch(setGroupIcon({ groupIcon: null }));
            console.log("cancel button clicked");
          }}
        />
        {isGroup && (
          <CropButton
            label={"Upload Group Icon"}
            onButtonClick={() => {
              UploadGroupHandler();
              console.log("Group upload button clicked");
            }}
          />
        )}

        {isSingle && (
          <CropButton
            label={"Upload"}
            onButtonClick={() => {
              UploadHandler();
              console.log("upload button clicked");
            }}
          />
        )}
      </div>
    </div>
  );
};

export const CropButton = ({ label, onButtonClick }) => {
  return (
    <>
      <div
        className="bg-blue-700 text-white px-4 py-2 rounded-full cursor-pointer"
        onClick={onButtonClick}
      >
        {label}
      </div>
    </>
  );
};
