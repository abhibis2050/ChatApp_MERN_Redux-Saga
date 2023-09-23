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
import { useEffect, useState } from "react";
import { setAllGroupMessages } from "../redux/app/messageSlice";
import socket from "../customHooks/SocketHooks";


const GroupMessages = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.auth);
  const { selectedGroupChatId, selectedGroupDetails, groupIcon } = useSelector(
    (state) => state.group
  );
  const { allGroupMessages } = useSelector((state) => state.message);
  const [sendGroupMessage, setSendGroupMessage] = useState("");
  const [groupDrawerOpen, setGroupDrawerOpen] = useState(false);

  console.log("groupDrawerOpen---------->", groupDrawerOpen);

  // useEffect(() => {
  //   socket.emit("CreatingGroupRoom", selectedGroupChatId);
  //   return () => {
  //     socket.emit("leaveGroup", selectedGroupChatId);
  //   };
  // }, [selectedGroupChatId,sendGroupMessage]);

  useEffect(() => {
    socket.on(
      "adding_new_group_message",
      (messages) => {
        console.log("group message recieved---------->", messages);
        dispatch(
          setAllGroupMessages({
            allGroupMessages: [...allGroupMessages, messages],
          })
        );
      },
      [allGroupMessages, sendGroupMessage]
    );
  });

  const sendGroupMessageHandler = () => {
    if (authUser._id && sendGroupMessage !== "") {
      socket.emit("SendGroupMessage", {
        message: sendGroupMessage,
        groupId: selectedGroupChatId,
        sender: authUser?._id,
        isGroupMessage: true,
      });
      setSendGroupMessage("");
    }
  };

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
        <div className=" rounded-3xl">
          <div className="space-y-3 h-full rounded-3xl ">
            {selectedGroupChatId === "" ? (
              <>
                <div className="rounded-3xl h-full bg-white">
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
                  {groupDrawerOpen === true ? (
                    <DetailProfile
                      isGroup={true}
                      isOpen={groupDrawerOpen}
                      onClose={() => {
                        setGroupDrawerOpen(!groupDrawerOpen);
                      }}
                    />
                  ) : null}
                  <div
                    className="flex items-center mr-4"
                    onClick={() => {
                      setGroupDrawerOpen(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faBars} className="text-xl w-12 " />
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
                                  <div className="pt-7 w-8 h-8">
                                    <img
                                      className=" w-8 h-8 rounded-full "
                                      src={
                                        singleMessage?.sender?.avatar
                                          ? singleMessage?.sender?.avatar
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
                                <div className="pt-7 w-8 h-8">
                                  <img
                                    className=" w-8 h-8 rounded-full "
                                    src={
                                      singleMessage?.sender?.avatar
                                        ? singleMessage?.sender?.avatar
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
                        value={sendGroupMessage}
                        onChange={(e) => {
                          setSendGroupMessage(e.target.value);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && sendGroupMessage !== "") {
                            sendGroupMessageHandler();
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex space-x-4 ">
                    <div className="px-3 py-2 ">
                      <FontAwesomeIcon
                        icon={faFaceSmile}
                        className="text-3xl"
                      />
                    </div>
                    <div
                      className="px-3 flex items-center bg-blue-100 rounded-full"
                      onClick={sendGroupMessageHandler}
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
        </div>
      </>
    </div>
  );
};

export default GroupMessages;
