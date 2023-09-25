import { useDispatch, useSelector } from "react-redux";
import Blank from "../assets/blank.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { setUserIcon } from "../redux/app/UserSlice";

const Profile = () => {
  const { authUser } = useSelector((state) => state.auth);
  const [iconDilogBox, setIconDilogBox] = useState(false);
  const dispatch = useDispatch();
  const fileUploadHandler = (e) => {
    console.log("e---------->", e.target.files[0]);
    if (e.target.files && e.target.files.length > 0) {
      // const reader = new FileReader();
      // reader.readAsDataURL(e.target.files[0]);
      // reader.addEventListener("load", () => {
      //   console.log("result---------->", reader.result);
      //   setGroupIcon(reader.result)
      // });

      const selectedFile = e.target.files[0];
      if (selectedFile) {
        const reader = new FileReader();
        reader.onload = (event) => {
          dispatch(setUserIcon({ userIcon: event.target.result }));
        };
        reader.readAsDataURL(selectedFile);
      }
      setIconDilogBox(false)
    }
  };

  return (
    <div>
      <div>
        <div className="bg-white flex flex-col justify-center items-center space-y-3 py-4 rounded-3xl">
          <div className="">
            <img
              className="rounded-full w-56 h-56 relative"
              src={
                authUser?.avatar?.secure_url
                  ? authUser?.avatar?.secure_url
                  : Blank
              }
            />
            <div className="absolute left-[370px] top-[230px]">
              <FontAwesomeIcon
                icon={faCamera}
                className="text-3xl text-white bg-bluebase px-2 py-2 rounded-full"
                onClick={() => {
                  setIconDilogBox(!iconDilogBox);
                }}
              />
              {iconDilogBox && (
                <div className="bg-blue-100 absolute text-lg  space-y-1 rounded-2xl left-9 top-8">
                  <h1 className="px-5 py-1 hover:bg-bluebase hover:text-white hover:rounded-2xl">
                    Remove
                  </h1>
                  <div className="px-5 py-1 hover:bg-bluebase hover:text-white hover:rounded-2xl">
                    <label>
                      <h1 htmlFor="fileUpload">Change</h1>
                      <input
                        type="file"
                        id="fileUpload"
                        className="hidden"
                        onChange={(e) => {
                          fileUploadHandler(e);
                        }}
                      />
                    </label>
                  </div>
                  <h1 className="px-5 py-1 hover:bg-bluebase hover:text-white hover:rounded-2xl">
                    View
                  </h1>
                </div>
              )}
            </div>
          </div>
          <div className="text-3xl font-semibold">
            {authUser ? `${authUser?.firstName}  ${authUser?.lastName}` : `User Not Found`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
