import { useSelector } from "react-redux";
import Blank from "../assets/blank.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const { authUser } = useSelector((state) => state.auth);
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
              <label htmlFor="fileUpload">
                <FontAwesomeIcon
                  icon={faCamera}
                  className="text-3xl text-white bg-bluebase px-2 py-2 rounded-full"
                />
                <input type="file" id="fileUpload" className="hidden" />
              </label>
            </div>
          </div>
          <div className="text-3xl font-semibold">
            {authUser ? `${authUser?.firstName}  ${authUser?.lastName}` : ``}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
