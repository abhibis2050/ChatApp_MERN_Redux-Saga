import Blank from "../assets/blank.png";
import NoChat from "../assets/home.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faBars,
  faLocationArrow,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useRef, useState } from "react";
import Sidebar from "../component/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { setAllSingleChatMessages } from "../redux/app/messageSlice";
import {
  setAllFriendListId,
  setAllFriendRequestRecieved,
  setAllFriendRequestRecievedId,
  setAllFriendRequestSentId,
} from "../redux/app/UserSlice";
import Group from "../component/Group";
import DetailProfile from "../component/DetailProfile";
import GroupMessages from "../component/GroupMessages";

import socket from "../customHooks/SocketHooks";
import SingleChat from "../component/SingleChat";
import Contacts from "../component/Contacts";
import SearchAndProfile from "../component/SearchAndProfile";
import Profile from "../component/Profile";
import { ImageCrop } from "../component/ImageCrop";

const ChatPage = () => {
  const dispatch = useDispatch();
  const { token, authUser } = useSelector((state) => state.auth);
  const { selectedSingleChat } = useSelector((state) => state.chat);
  const { allSingleChatMessages } = useSelector((state) => state.message);
  const {
    sideBarIsActive,
    allFriendRequestRecieved,
    allFriendListId,
    allFriendRequestSentId,
    allFriendRequestRecievedId,
  } = useSelector((state) => state.user);

  const messageScrollRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [sendMessage, setSendMessage] = useState("");
  const [singleMessageDrawerOpen, setSingleMessageDrawerOpen] = useState(false);
  const { groupIcon } = useSelector((state) => state.group);
  useEffect(() => {
    if (authUser?._id) {
      socket.emit("user_connected", { UserId: authUser?._id });
    }
  }, [authUser?._id]);

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      // console.log("recieve_message-------->", data);
      dispatch(
        setAllSingleChatMessages({
          allSingleChatMessages: [...allSingleChatMessages, data],
        })
      );
    });
  }, [allSingleChatMessages, sendMessage]);

  useEffect(() => {
    socket.on("after_add_friend", (data) => {
      console.log("after_add_friend-------->", data);
      dispatch(
        setAllFriendRequestSentId({
          allFriendRequestSentId: [...allFriendRequestSentId, data],
        })
      );
    });
  }, [allFriendRequestSentId]);

  useEffect(() => {
    socket.on("accept_friend_request", (data) => {
      console.log("accept_friend_request-------->", data);
      dispatch(
        setAllFriendRequestRecievedId({
          allFriendRequestRecievedId: allFriendRequestRecievedId.filter(
            (singleId) => {
              singleId !== data?.friendRequestId;
            }
          ),
        })
      );

      dispatch(
        setAllFriendListId({
          allFriendListId: [...allFriendListId, data?.friendRequestId],
        })
      );

      dispatch(
        setAllFriendRequestRecieved({
          allFriendRequestRecieved: allFriendRequestRecieved.filter(
            (singleReqRecieved) => {
              singleReqRecieved._id !== data?.friendRequestId;
            }
          ),
        })
      );
    });
  }, [
    allFriendRequestRecieved,
    allFriendRequestRecievedId,
    allFriendRequestSentId,
  ]);

  // console.log("allChats------>", allChats);
  console.log("selectedSingleChat------>", selectedSingleChat);
  // console.log("sendMessage------>", sendMessage);
  // console.log("allSingleChatMessages------>", allSingleChatMessages);
  // console.log("allContacts------>", allContacts);

  useEffect(() => {
    dispatch({
      type: "GET_ALL_CHAT",
      payload: {
        token,
      },
    });
  }, [token, dispatch]);

  useEffect(() => {
    dispatch({
      type: "GET_ALL_CONTACTS",
    });
  }, []);

  useEffect(() => {
    if (selectedSingleChat?._id !== "") {
      dispatch({
        type: "GET_ALL_ONE_TO_ONE_MESSAGE",
        payload: {
          selectedChatId: selectedSingleChat?._id,
          token,
        },
      });
    }
  }, [dispatch, selectedSingleChat, token]);

  const scroll = () => {
    console.log("scroll called");
    messageScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessageHandler = () => {
    if (authUser._id && sendMessage !== "") {
      // console.log("send mesage handler clicked")
      socket.emit("Send-Message", {
        sender: authUser?._id,
        message: sendMessage,
        reciever: selectedSingleChat?.oppositeId._id,
        chatId: selectedSingleChat?._id,
      });
      setSendMessage("");
    }
  };

  return (
    <div className="bg-bluebase w-full h-screen flex fixed">
      {/* sidebar */}
      <div className={`${open ? "w-[12%]" : "w-[3%]"} mx-3 my-4`}>
        <Sidebar
          open={open}
          changeOpen={() => {
            setOpen(!open);
          }}
        />
      </div>
      {/* contact and chat area */}
      <div className="z-20 absolute ">
        {groupIcon !== null ? (
          <div className="">
            <ImageCrop pic={groupIcon} />
          </div>
        ) : null}
      </div>
      <div
        className={`${
          open ? "w-[88%]" : "w-[97%]"
        } bg-blue-100 flex space-x-4 rounded-3xl my-4 mr-3 p-4`}
      >
        {/* contact search and profile */}
        <div className=" w-1/4 rounded-3xl px-4 py-2 bg-white">
          <SearchAndProfile />
          {/* contat area */}

          <div className="h-[80%]  space-y-1 rounded-3xl">
            <div>
              {sideBarIsActive?.message && (
                <>
                  <SingleChat />
                </>
              )}
            </div>
            <div>
              {sideBarIsActive.group && (
                <>
                  <Group />
                </>
              )}
            </div>
            {sideBarIsActive.contact && (
              <>
                <Contacts />
              </>
            )}
            {sideBarIsActive.notification && <>notification</>}
            {sideBarIsActive.profile && (
              <>
                <Profile />
              </>
            )}
          </div>
        </div>
        {/* chat */}
        <div className=" w-3/4 rounded-3xl">
          {/********************************************************SINGLE MESSAGE CHAT ********************************************************/}
          {sideBarIsActive?.message && (
            <>
              <div className="space-y-3 h-full rounded-3xl ">
                {selectedSingleChat === undefined ? (
                  <>
                    <div className="rounded-3xl h-full bg-white">
                      <img
                        src={NoChat}
                        alt=""
                        className="rounded-3xl h-full mx-auto"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {/* header profile */}
                    <div className="flex justify-between bg-white  rounded-3xl py-4 px-4">
                      <div className="flex space-x-2 items-center">
                        <div>
                          <img
                            src={
                              selectedSingleChat?.oppositeId?.avatar
                                ? selectedSingleChat?.oppositeId?.avatar
                                    ?.secure_url
                                : Blank
                            }
                            alt=""
                            className=" w-12 h-12 rounded-full"
                          />
                        </div>
                        <div>
                          <h1>
                            {selectedSingleChat
                              ? `${selectedSingleChat?.oppositeId?.firstName} ${selectedSingleChat?.oppositeId?.lastName}`
                              : ``}
                          </h1>
                          <h1 className="text-sm">online</h1>
                        </div>
                      </div>
                      {singleMessageDrawerOpen === true ? (
                        <DetailProfile
                          isMessage={true}
                          isOpen={singleMessageDrawerOpen}
                          onClose={() => {
                            setSingleMessageDrawerOpen(
                              !singleMessageDrawerOpen
                            );
                          }}
                        />
                      ) : null}
                      <div
                        className="flex items-center mr-4"
                        onClick={() => {
                          setSingleMessageDrawerOpen(true);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faBars}
                          className="text-xl w-12 "
                        />
                      </div>
                    </div>
                    {/*chat messages area */}

                    <div className="bg-white rounded-3xl py-4 px-4 h-[71vh] overflow-y-auto no-scrollbar">
                      {allSingleChatMessages?.map((singleMesssage) => {
                        {
                          /* console.log("single message---------->", singleMesssage); */
                        }
                        if (singleMesssage.sender === authUser?._id) {
                          return (
                            <>
                              <div className="chat chat-end ">
                                <div className="chat-bubble bg-blue-800">
                                  {singleMesssage?.message}
                                </div>
                              </div>
                            </>
                          );
                        } else {
                          return (
                            <>
                              <div className="chat chat-start ">
                                <div className="chat-bubble bg-purple-800">
                                  {singleMesssage?.message}
                                </div>
                              </div>
                            </>
                          );
                        }
                      })}
                      <div ref={messageScrollRef}></div>
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
                            value={sendMessage}
                            onChange={(e) => {
                              setSendMessage(e.target.value);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && sendMessage !== "") {
                                sendMessageHandler();
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
                          onClick={sendMessageHandler}
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
          )}

          {/* ****************************************************GROUP MESSAGE CHAT*******************************************************/}
          {sideBarIsActive.group && (
            <div>
              <GroupMessages />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

// eslint-disable-next-line react/prop-types
export const ContactComponent = ({
  name,
  Pic,
  onClick,
  email,
  isActive,
  onButtonClick,
  tag,
  tagTwo,
  onButtonClickTwo,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex space-x-3 items-center pl-2 pr-2 py-2 ${
        isActive
          ? "bg-blue-500 rounded-full text-white"
          : "hover:bg-blue-100 hover:rounded-full"
      }`}
    >
      <div>
        <img src={Pic} alt="" className=" w-14 h-8 rounded-full" />
      </div>
      <div className="w-full">
        <div className="flex justify-between w-full text-lg">
          <h1>{name}</h1>
          {/* <div>{email}</div> */}
        </div>

        <h1 className="text-base">{email}</h1>
      </div>
      <div onClick={onButtonClick}>
        <button className="bg-bluebase text-white text-sm rounded-full px-3 py-2">
          {tag}
        </button>
      </div>
      {tagTwo && (
        <div onClick={onButtonClickTwo}>
          <button className="bg-bluebase text-white text-sm rounded-full px-3 py-2">
            {tagTwo}
          </button>
        </div>
      )}
    </div>
  );
};

// eslint-disable-next-line react/prop-types
export const AllContactComponent = ({
  name,
  Pic,
  onClick,
  email,
  isActive,
  onButtonClick,
  tag,
  tagTwo,
  onButtonClickTwo,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex space-x-3 items-center pl-2 pr-2 py-2 ${
        isActive
          ? "bg-blue-500 rounded-full text-white"
          : "hover:bg-blue-100 hover:rounded-full"
      }`}
    >
      <div>
        <img src={Pic} alt="" className=" w-14 h-8 rounded-full" />
      </div>
      <div className="w-full">
        <div className="flex justify-between w-full text-lg">
          <h1>{name}</h1>
          {/* <div>{email}</div> */}
        </div>

        <h1 className="text-base">{email}</h1>
      </div>
      <div onClick={onButtonClick}>
        <button className="bg-bluebase text-white text-sm rounded-full px-5 py-2">
          {tag}
        </button>
      </div>
      {tagTwo && (
        <div onClick={onButtonClickTwo}>
          <button className="bg-bluebase text-white text-sm rounded-full px-5 py-2">
            {tagTwo}
          </button>
        </div>
      )}
    </div>
  );
};
