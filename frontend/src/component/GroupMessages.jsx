import {
  faAdd,
  faBars,
  faFaceSmile,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import DetailProfile from "./DetailProfile";
import NoGroup from "../assets/groupTwo.png";
import Blank from "../assets/blank.png";
import { useEffect } from "react";

const GroupMessages = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.auth);
  const { selectedGroupChatId, selectedGroupDetails } = useSelector(
    (state) => state.group
  );
  const { allGroupMessages } = useSelector((state) => state.message);

  useEffect(() => {
    if (selectedGroupChatId) {
      dispatch({
        type: "GET_ALL_GROUP_MESSAGE",
        payload: {
          groupId: selectedGroupChatId,
        },
      });
    }
  }, [selectedGroupChatId]);

  return (
    <div>
      <>
        <div className="space-y-3 h-full rounded-3xl">
          {selectedGroupChatId === "" ? (
            <>
              <div className="rounded-3xl h-full bg-white">
                <div></div>
                <img
                  //   src={NoGroup}
                  alt=""
                  className="rounded-3xl h-full mx-auto"
                />
              </div>
            </>
          ) : (
            <>
              {/* header profile */}
              <div className="flex justify-between bg-white  rounded-3xl py-4 px-4">
                <div className="flex space-x-4 items-center">
                  <div>
                    <img
                      src={
                        selectedGroupDetails?.GroupAvatar
                          ? selectedGroupDetails?.GroupAvatar?.secure_url
                          : Blank
                      }
                      alt=""
                      className=" w-12 h-12 rounded-full"
                    />
                  </div>
                  <div className=" text-xl">
                    <h1>{selectedGroupDetails?.groupName}</h1>
                  </div>
                </div>
                <div className="flex items-center mr-4">
                  <DetailProfile
                    button={
                      <FontAwesomeIcon
                        icon={faBars}
                        className="text-xl w-12 "
                      />
                    }
                    isGroup={true}
                  />
                </div>
              </div>
              {/*chat messages area */}

              <div className="bg-white rounded-3xl py-4 px-4 h-[71vh] overflow-y-auto no-scrollbar">
                {allGroupMessages?.map((singleMessage) => {
                  if (singleMessage.sender) {
                    if (singleMessage?.sender?._id === authUser?._id) {
                      return (
                        <>
                          <div>
                            <div className="chat chat-end">
                              <div className="flex space-x-5">
                                <div className="chat-bubble bg-blue-800">
                                  <h1 className="text-sm">{`${singleMessage?.sender?.firstName}`}</h1>
                                  <p className="text-base">
                                    {singleMessage?.message}
                                  </p>
                                </div>
                                <div className="pt-7">
                                  <img
                                    className=" w-18 h-8 rounded-full "
                                    src={
                                      selectedGroupDetails?.GroupAvatar
                                        ? selectedGroupDetails?.GroupAvatar
                                            ?.secure_url
                                        : Blank
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <div className="chat chat-start ">
                            <div className="flex space-x-5">
                              <div className="">
                                <img
                                  className=" w-18 h-8 rounded-full "
                                  src={
                                    selectedGroupDetails?.GroupAvatar
                                      ? selectedGroupDetails?.GroupAvatar
                                          ?.secure_url
                                      : Blank
                                  }
                                />
                              </div>
                              <div className="chat-bubble bg-purple-800 ">
                                <h1 className="text-sm">{`${singleMessage?.sender?.firstName}`}</h1>
                                <p className="text-base">
                                  {singleMessage?.message}
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    }
                  }
                })}
              </div>

              {/* send messgae area*/}
              <div className="flex justify-between items-center bg-white rounded-3xl px-4 py-5">
                <div className="flex space-x-4 w-[90%]">
                  <div className="flex items-center px-4 bg-blue-100 rounded-full">
                    <FontAwesomeIcon icon={faAdd} className="text-xl" />
                  </div>
                  <div className=" rounded-full w-full">
                    <input
                      placeholder="type message here"
                      className="w-full rounded-full px-5 py-3 outline-none bg-blue-50 text-xl"
                      // value={sendMessage}
                      onChange={(e) => {
                        //   setSendMessage(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        //   if (e.key === "Enter" && sendMessage !== "") {
                        //     sendMessageHandler();
                        //   }
                      }}
                    />
                  </div>
                </div>
                <div className="flex space-x-4 ">
                  <div className="px-3 py-2 ">
                    <FontAwesomeIcon icon={faFaceSmile} className="text-3xl" />
                  </div>
                  <div
                    className="px-3 flex items-center bg-blue-100 rounded-full"
                    //   onClick={sendMessageHandler}
                  >
                    <FontAwesomeIcon
                      icon={faLocationArrow}
                      className="text-3xl text-[#0059E4]"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </>
    </div>
  );
};

export default GroupMessages;
