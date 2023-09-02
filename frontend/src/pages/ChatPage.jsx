import Blank from "../assets/blank.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faBars,
  faLocationArrow,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import FriendProfile from "../component/FriendProfile";
import Sidebar from "../component/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { setAllSingleChatMessages } from "../redux/app/messageSlice";
import Select from "react-select";
const socket = io("http://localhost:8080");

const ChatPage = () => {
  const dispatch = useDispatch();
  const { token, authUser } = useSelector((state) => state.auth);
  const {
    sideBarIsActive,
    allContacts,
    allFriendList,
    allFriendRequestSent,
    allFriendRequestRecieved,
  } = useSelector((state) => state.user);
  const { allChats } = useSelector((state) => state.chat);
  const { allSingleChatMessages } = useSelector((state) => state.message);
  const [open, setOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(undefined);
  const [sendMessage, setSendMessage] = useState("");
  const [contacts, setContacts] = useState({
    allContact: true,
    myContact: false,
    friendRequestSent: false,
    friendRequestRecieved: false,
  });

  console.log("Contacts--------->", contacts);

  // console.log("allFriendList--------->", allFriendList);
  // console.log("allFriendRequest--------->", allFriendRequest);

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

  // console.log("allChats------>", allChats);
  // console.log("selectedChat------>", selectedChat);
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
    if (token !== "" && authUser) {
      dispatch({
        type: "GET_FRIENDLIST",
        payload: {
          userId: authUser?._id,
        },
      });
    }
    if (token !== "" && authUser) {
      dispatch({
        type: "GET_ALL_FRIENDREQUEST_SENT",
        payload: {
          userId: authUser?._id,
        },
      });
      if (token !== "" && authUser) {
        dispatch({
          type: "GET_ALL_FRIENDREQUEST_RECIEVED",
          payload: {
            userId: authUser?._id,
          },
        });
      }
    }
  }, [authUser, contacts.friendRequest, contacts.myContact]);

  useEffect(() => {
    if (selectedChat?._id !== "") {
      dispatch({
        type: "GET_ALL_ONE_TO_ONE_MESSAGE",
        payload: {
          selectedChatId: selectedChat?._id,
          token,
        },
      });
    }
  }, [dispatch, selectedChat, token]);

  const sendMessageHandler = () => {
    if (authUser._id && sendMessage !== "") {
      // console.log("send mesage handler clicked")
      socket.emit("Send-Message", {
        sender: authUser?._id,
        message: sendMessage,
        reciever: selectedChat?.oppositeId._id,
        chatId: selectedChat?._id,
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
      <div
        className={`${
          open ? "w-[88%]" : "w-[97%]"
        } bg-slate-200 flex space-x-4 rounded-3xl my-4 mr-3 p-4`}
      >
        {/* contact search and profile */}

        <div className=" w-1/5 rounded-3xl px-2 py-2 bg-white">
          <div className="flex space-x-2 items-center rounded-full">
            <img
              src={
                authUser?.avatar?.secure_url
                  ? authUser?.avatar?.secure_url
                  : Blank
              }
              alt=""
              className=" w-12 h-12 rounded-full"
            />
            <h1>
              {authUser?.firstName} {authUser?.lastName}
            </h1>
          </div>
          <div className="flex items-center rounded-full space-x-2 relative my-2">
            <input
              placeholder="Search Name"
              className="rounded-full w-full bg-slate-200 py-3 px-4 outline-none"
            />
            <FontAwesomeIcon icon={faSearch} className="absolute right-7" />
          </div>
          <div className="my-2">Recent Chats</div>
          {/* contat area */}

          <div className="h-[80%] overflow-y-auto no-scrollbar space-y-1 pt-4 rounded-3xl ">
            {sideBarIsActive?.message && (
              <>
                {allChats?.map((singleChat) => {
                  {
                    /* console.log("singleChat------->", singleChat);  */
                  }

                  return (
                    <>
                      <div
                        key={singleChat?._id}
                        onClick={() => {
                          console.log(
                            "single chat id-------->",
                            singleChat?._id
                          );
                          console.log("single chat", singleChat);
                          setSelectedChat(singleChat);
                        }}
                      >
                        <EachChatComponent
                          profilePic={
                            singleChat?.oppositeId?.avatar
                              ? singleChat?.oppositeId?.avatar?.secure_url
                              : Blank
                          }
                          name={`${singleChat?.oppositeId?.firstName} ${singleChat?.oppositeId?.lastName}`}
                        />
                      </div>
                    </>
                  );
                })}
              </>
            )}
            {sideBarIsActive.group && <>group</>}
            {sideBarIsActive.contact && (
              <>
                <div className="flex text-sm justify-evenly mb-2">
                  <div
                    className={`py-2 px-3 ${
                      contacts.allContact
                        ? "bg-bluebase text-white rounded-full"
                        : ""
                    } cursor-default`}
                    onClick={(e) => {
                      e.preventDefault();
                      setContacts({
                        ...contacts,
                        allContact: true,
                        myContact: false,
                        friendRequestSent: false,
                        friendRequestRecieved: false,
                      });
                    }}
                  >
                    Contacts
                  </div>
                  <div
                    className={`py-2 px-3 ${
                      contacts.myContact
                        ? "bg-bluebase text-white rounded-full"
                        : ""
                    } cursor-default`}
                    onClick={(e) => {
                      e.preventDefault();
                      setContacts({
                        ...contacts,
                        allContact: false,
                        myContact: true,
                        friendRequestSent: false,
                        friendRequestRecieved: false,
                      });
                    }}
                  >
                    Friends
                  </div>
                  <div>
                    <Select
                    className="w-32"
                      placeholder={"FriendRequest"}
                      options={[
                        { value: "Send", label: "Send" },
                        { value: "recieved", label: "Recieved" },
                      ]}
                      onChange={(e) => {
                        console.log("friend req", e);
                        if (e.label === "Send") {
                          setContacts({
                            ...contacts,
                            allContact: false,
                            myContact: false,
                            friendRequestSent: true,
                            friendRequestRecieved: false,
                          });
                        } else {
                          setContacts({
                            ...contacts,
                            allContact: false,
                            myContact: false,
                            friendRequestSent: false,
                            friendRequestRecieved: true,
                          });
                        }
                      }}
                    />
                  </div>
                  {/* <div
                    className={`py-2 px-3 ${
                      contacts.friendRequest
                        ? "bg-bluebase text-white rounded-full"
                        : ""
                    } cursor-default`}
                    onClick={(e) => {
                      e.preventDefault();
                      setContacts({
                        ...contacts,
                        allContact: false,
                        myContact: false,
                        friendRequest: true,
                      });
                    }}
                  >
                    Friend Request
                  </div> */}
                </div>
                {contacts.allContact === true && (
                  <>
                    <div className="">
                      {allContacts?.map((singleContact) => {
                        return (
                          <>
                            <ContactComponent
                              key={singleContact?._id}
                              name={`${singleContact?.firstName} ${singleContact?.lastName}`}
                              email={singleContact?.email}
                              Pic={
                                singleContact?.avatar
                                  ? singleContact?.avatar?.secure_url
                                  : Blank
                              }
                              tag={"Add"}
                            />
                          </>
                        );
                      })}
                    </div>
                  </>
                )}
                {contacts.myContact == true && (
                  <>
                    <div>
                      {allFriendList?.map((singleFriend) => {
                        return (
                          <>
                            <ContactComponent
                              key={singleFriend?._id}
                              name={`${singleFriend?.firstName} ${singleFriend?.lastName}`}
                              email={singleFriend?.email}
                              Pic={
                                singleFriend?.avatar
                                  ? singleFriend?.avatar?.secure_url
                                  : Blank
                              }
                              tag={"Friends"}
                            />
                          </>
                        );
                      })}
                    </div>
                  </>
                )}
                {contacts.friendRequestRecieved === true && (
                  <>
                    <div>
                      {allFriendRequestRecieved?.map((singleFriendReq) => {
                        return (
                          <>
                            <ContactComponent
                              key={singleFriendReq?._id}
                              name={`${singleFriendReq?.firstName} ${singleFriendReq?.lastName}`}
                              email={singleFriendReq?.email}
                              Pic={
                                singleFriendReq?.avatar
                                  ? singleFriendReq?.avatar?.secure_url
                                  : Blank
                              }
                              tag={"Accept"}
                            />
                          </>
                        );
                      })}
                    </div>
                  </>
                )}
                {contacts.friendRequestSent === true && (
                  <>
                    <div>
                      {allFriendRequestSent?.map((singleFriendReq) => {
                        return (
                          <>
                            <ContactComponent
                              key={singleFriendReq?._id}
                              name={`${singleFriendReq?.firstName} ${singleFriendReq?.lastName}`}
                              email={singleFriendReq?.email}
                              Pic={
                                singleFriendReq?.avatar
                                  ? singleFriendReq?.avatar?.secure_url
                                  : Blank
                              }
                              tag={"Sent"}
                            />
                          </>
                        );
                      })}
                    </div>
                  </>
                )}
              </>
            )}
            {sideBarIsActive.notification && <>notification</>}
          </div>
        </div>
        {/* chat */}
        <div className=" w-4/5 rounded-3xl space-y-3">
          {selectedChat === undefined ? (
            <>
              <div className="bg-red-300">select chat</div>
            </>
          ) : (
            <>
              {/* header profile */}
              <div className="flex justify-between bg-white  rounded-3xl py-4 px-4">
                <div className="flex space-x-2 items-center">
                  <div>
                    <img
                      src={
                        selectedChat?.oppositeId?.avatar
                          ? selectedChat?.oppositeId?.avatar?.secure_url
                          : Blank
                      }
                      alt=""
                      className=" w-12 h-12 rounded-full"
                    />
                  </div>
                  <div>
                    <h1>
                      {selectedChat
                        ? `${selectedChat?.oppositeId?.firstName} ${selectedChat?.oppositeId?.lastName}`
                        : ``}
                    </h1>
                    <h1 className="text-sm">online</h1>
                  </div>
                </div>
                <div className="flex items-center mr-4">
                  <FriendProfile
                    button={
                      <FontAwesomeIcon
                        icon={faBars}
                        className="text-xl w-12 "
                      />
                    }
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
                    <FontAwesomeIcon icon={faFaceSmile} className="text-3xl" />
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
      </div>
    </div>
  );
};

export default ChatPage;

// eslint-disable-next-line react/prop-types
export const EachChatComponent = ({ isActive, name, profilePic, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex space-x-3 items-center pl-2 pr-12 py-2 ${
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
          <div>6:25</div>
        </div>

        <h1 className="text-sm">last message</h1>
      </div>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
export const ContactComponent = ({
  name,
  Pic,
  onClick,
  email,
  isActive,
  onButtonClick,
  tag,
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
    </div>
  );
};
