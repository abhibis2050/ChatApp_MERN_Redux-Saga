import { useDispatch, useSelector } from "react-redux";
import Blank from "../assets/blank.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faEllipsisVertical,
  faRightFromBracket,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { ButtonComponent } from "./button";
import { useState } from "react";
import { setGroupIcon } from "../redux/app/GroupSlice";
import Select from "react-select";

// eslint-disable-next-line react/prop-types
const DetailProfile = ({ button, isMessage, isGroup, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { selectedGroupDetails } = useSelector((state) => state.group);
  const { allContacts } = useSelector((state) => state.user);
  const { selectedSingleChat } = useSelector((state) => state.chat);
  const [groupIconDilogBox, setGroupIconDilogBox] = useState(false);
  const [openGroupAddMembers, setOpenGroupAddMembers] = useState(false);

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
          // setGroupImage(event.target.result);
          dispatch(setGroupIcon({ groupIcon: event.target.result }));
        };
        reader.readAsDataURL(selectedFile);
      }
      onClose();
    }
  };

  return (
    <div>
      <div
        className={
          "fixed overflow-hidden z-10 bg-gray-900 bg-opacity-60 inset-0 transform ease-in-out py-4" +
          (isOpen
            ? " transition-opacity opacity-100 duration-500 translate-x-0  "
            : " transition-all delay-500 opacity-0 translate-x-full  ")
        }
      >
        {openGroupAddMembers ? (
          <>
            <div className="bg-white absolute left-[800px] top-[300px]">
              <Select
                closeMenuOnSelect={false}
                placeholder="Add New Members"
                isMulti
                options={allContacts.map((singleContact) => {
                  return {
                    label: `${singleContact?.firstName} ${singleContact?.lastName}`,
                    value: singleContact?._id,
                  };
                })}
                onChange={(e) => {
                  console.log(e)
                }}
              />
            </div>
          </>
        ) : null}
        <section
          className={
            "rounded-l-3xl overflow-y-hidden overflow-x-hidden w-screen max-w-md right-0 absolute h-[97%] shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
            (isOpen ? " translate-x-0 " : " translate-x-full ")
          }
        >
          <div className="max-w-lg flex flex-col space-y-6 h-full bg-red-200">
            {isMessage && (
              <>
                <div className="h-full bg-blue-200 text-black p-4 ">
                  <div>
                    <div className="bg-white flex flex-col justify-center items-center space-y-3 py-4 rounded-3xl">
                      <div className="">
                        <img
                          className="rounded-full w-56 h-56 relative "
                          src={
                            selectedSingleChat?.oppositeId?.avatar
                              ? selectedSingleChat?.oppositeId?.avatar
                                  ?.secure_url
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
              </>
            )}

            {isGroup && (
              <>
                <div>
                  <>
                    <div className="bg-blue-200 text-black rounded-l-3xl h-screen p-3">
                      <div className=" space-y-3">
                        {/* Group Icon */}
                        <div
                          className="bg-white flex flex-col justify-center items-center space-y-3 py-4 rounded-3xl"
                          onClick={() => {
                            groupIconDilogBox && setGroupIconDilogBox(false);
                          }}
                        >
                          <div className="">
                            <img
                              className="rounded-full w-56 h-56"
                              src={
                                selectedGroupDetails?.GroupAvatar
                                  ? selectedGroupDetails?.GroupAvatar
                                      ?.secure_url
                                  : Blank
                              }
                            />
                            <div className="absolute right-32 top-[200px]">
                              <FontAwesomeIcon
                                icon={faCamera}
                                className="text-3xl text-white bg-bluebase px-2 py-2 rounded-full"
                                onClick={() => {
                                  setGroupIconDilogBox(!groupIconDilogBox);
                                }}
                              />

                              {groupIconDilogBox && (
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
                          <div className="text-2xl font-medium">
                            {selectedGroupDetails?.groupName}
                          </div>
                          <div>
                            {/* Group: {selectedGroupDetails?.groupMembers.length} members */}
                          </div>
                        </div>

                        {/* Group Members */}
                        <div className=" bg-white rounded-3xl px-3 py-2 space-y-1">
                          <div className="flex justify-between items-center py-1">
                            <div className="px-3 text-xl">Members</div>
                            <div
                              className="bg-bluebase text-white px-4 py-1.5 rounded-full cursor-pointer"
                              onClick={() => {
                                setOpenGroupAddMembers(true);
                              }}
                            >
                              Add Member
                            </div>
                          </div>
                          <div>
                            <div className="overflow-y-auto h-[40vh]">
                              {selectedGroupDetails?.groupMembers?.map(
                                (singleMember) => {
                                  console.log(
                                    "single member------------>",
                                    singleMember
                                  );
                                  if (
                                    selectedGroupDetails.groupAdmins.includes(
                                      singleMember?._id
                                    )
                                  ) {
                                    console.log(
                                      "ADMIN------------>",
                                      singleMember
                                    );
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
                                          isGroupAdmin={true}
                                          setAdminClick={() => {}}
                                        />
                                      </>
                                    );
                                  } else {
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
                                          isGroupAdmin={false}
                                        />
                                      </>
                                    );
                                  }
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
                          <ButtonComponent
                            label={"Delete Group"}
                            icon={faTrash}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                </div>
              </>
            )}
          </div>
        </section>
        <section
          className=" w-screen h-full cursor-pointer"
          onClick={() => {
            onClose();
          }}
        ></section>
      </div>
    </div>
  );
};

//
export default DetailProfile;

export const UserDetailComponent = ({
  isActive,
  name,
  profilePic,
  onClick,
  isGroupAdmin,
  setAdminClick,
  removeUserClick,
}) => {
  const [userDilogBox, setUserDilogBox] = useState(false);
  return (
    <div
      onClick={() => {
        userDilogBox && setUserDilogBox(false);
        onClick();
      }}
      className={`flex space-x-3 items-center pl-2 pr-2 py-2 bg-white ${
        isActive
          ? "bg-blue-500 rounded-full text-white"
          : "hover:bg-blue-200 hover:rounded-full"
      }`}
    >
      <div>
        <img src={profilePic} alt="" className=" w-14 h-12 rounded-full" />
      </div>
      <div className="w-full px-1 ">
        <div className="flex justify-between w-full">
          <div className="flex space-x-1">
            <h1>{name}</h1>
            {isGroupAdmin ? (
              <h1 className="text-blue-700 italic">admin</h1>
            ) : null}
          </div>

          <div
            className="px-3"
            onClick={() => {
              setUserDilogBox(!userDilogBox);
            }}
          >
            <FontAwesomeIcon icon={faEllipsisVertical} />
            {userDilogBox ? (
              <div className=" bg-blue-100 absolute right-14 rounded-2xl">
                <h1
                  className="hover:bg-bluebase hover:text-white hover:rounded-2xl px-2 py-1 cursor-pointer"
                  onClick={() => {
                    setAdminClick();
                    // setUserDilogBox(false);
                  }}
                >
                  Set As Admin
                </h1>
                <h1
                  className="hover:bg-bluebase hover:text-white hover:rounded-2xl px-2 py-1 cursor-pointer"
                  onClick={() => {
                    removeUserClick();
                    // setUserDilogBox(false);
                  }}
                >
                  Remove
                </h1>
                <h1
                  className="hover:bg-bluebase hover:text-white hover:rounded-2xl px-2 py-1 cursor-pointer"
                  onClick={() => {
                    removeUserClick();
                    // setUserDilogBox(false);
                  }}
                >
                  Remove As Admin
                </h1>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
