import { useSelector } from "react-redux";
import Blank from "../assets/blank.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faRightFromBracket,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { ButtonComponent } from "./button";
// eslint-disable-next-line react/prop-types
const DetailProfile = ({ button, isMessage, isGroup }) => {
  const { selectedGroupDetails } = useSelector((state) => state.group);
  const { selectedSingleChat } = useSelector((state) => state.chat);

  return (
    <div>
      {isMessage && (
        <>
          <div className="drawer drawer-end z-20">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label htmlFor="my-drawer-4" className="drawer-button">
                {button}
              </label>
            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
              <div className="menu p-4 w-[450px] h-[96%] bg-blue-100 text-black mt-4 rounded-l-3xl">
                <div>
                  <div className="bg-white flex flex-col justify-center items-center space-y-3 py-4 rounded-3xl">
                    <div className="">
                      <img
                        className="rounded-full w-56 h-56 relative"
                        src={
                          selectedSingleChat?.oppositeId?.avatar
                            ? selectedSingleChat?.oppositeId?.avatar?.secure_url
                            : Blank
                        }
                      />
                    </div>
                    <div className="text-2xl font-medium">
                      {selectedSingleChat
                        ? `${selectedSingleChat?.oppositeId?.firstName} ${selectedSingleChat?.oppositeId?.lastName}`
                        : ``}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {isGroup && (
        <>
          <div className="drawer drawer-end z-20">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label htmlFor="my-drawer-4" className="drawer-button">
                {button}
              </label>
            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
              <div className="menu p-4 w-[450px] h-[96%] bg-blue-100 text-black mt-4 rounded-l-3xl">
                <div className=" space-y-3">
                  {/* Group Icon */}
                  <div className="bg-white flex flex-col justify-center items-center space-y-3 py-4 rounded-3xl">
                    <div className="">
                      <img
                        className="rounded-full w-56 h-56"
                        src={
                          selectedGroupDetails?.GroupAvatar
                            ? selectedGroupDetails?.GroupAvatar?.secure_url
                            : Blank
                        }
                      />
                      <div className="absolute right-32 top-[200px]">
                        <label htmlFor="fileUpload">
                          <FontAwesomeIcon
                            icon={faCamera}
                            className="text-3xl text-white bg-bluebase px-2 py-2 rounded-full"
                          />
                          <input
                            type="file"
                            id="fileUpload"
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                    <div className="text-2xl font-medium">
                      {selectedGroupDetails?.groupName}
                    </div>
                    <div>
                      {/* Group: {selectedGroupDetails?.groupMembers.length} members */}
                    </div>
                  </div>

                  {/* Group Members */}
                  <div className=" bg-white rounded-3xl px-3 py-2 space-y-1">
                    <div className="px-3 text-base">Members</div>
                    <div>
                      <div className="overflow-y-auto h-[40vh]">
                        {selectedGroupDetails?.groupMembers?.map(
                          (singleMember) => {
                            return (
                              <>
                                <UserDetailComponent
                                  key={singleMember._id}
                                  name={
                                    singleMember
                                      ? `${singleMember?.firstName} ${singleMember?.lastName}`
                                      : ``
                                  }
                                  profilePic={
                                    singleMember?.avatar
                                      ? singleMember?.avatar?.secure_url
                                      : Blank
                                  }
                                />
                              </>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Basic Functions */}
                  <div className="flex flex-col bg-white rounded-3xl py-2 px-3">
                    <ButtonComponent
                      label={"Exit Group"}
                      icon={faRightFromBracket}
                    />
                    <ButtonComponent label={"Delete Group"} icon={faTrash} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailProfile;

export const UserDetailComponent = ({
  isActive,
  name,
  profilePic,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex space-x-3 items-center pl-2 pr-12 py-2 bg-white ${
        isActive
          ? "bg-blue-500 rounded-full text-white"
          : "hover:bg-blue-100 hover:rounded-full"
      }`}
    >
      <div>
        <img src={profilePic} alt="" className=" w-14 h-12 rounded-full" />
      </div>
      <div className="w-full">
        <div className="flex justify-between w-full">
          <h1>{name}</h1>
          {/* <div>6:25</div> */}
        </div>
      </div>
    </div>
  );
};
