import avatar from "../assets/hp.jpg";
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

const ChatPage = () => {
  const dispatch = useDispatch();
  const { token, authUser } = useSelector((state) => state.auth);
  const { sideBarIsActive, allContacts } = useSelector((state) => state.user);
  const { allChats } = useSelector((state) => state.chat);
  const { allSingleChatMessages } = useSelector((state) => state.message);
  const [open, setOpen] = useState(false);
  const [receiverId, setRecieverId] = useState("");
  const [selectedChatId, setSelectedChatId] = useState("");

  // console.log("receiverId------>", receiverId);
  // console.log("selectedChatId------>", selectedChatId);
  // console.log("allSingleChatMessages------>", allSingleChatMessages);
  console.log("allContacts------>", allContacts);

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
    if (selectedChatId !== "") {
      dispatch({
        type: "GET_ALL_ONE_TO_ONE_MESSAGE",
        payload: {
          selectedChatId,
          token,
        },
      });
    }
  }, [dispatch, selectedChatId, token]);

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
            {sideBarIsActive.message && (
              <>
                {allChats?.map((singleChat) => {
                  {
                    /* console.log("singleChat------->", singleChat); */
                  }
                  return (
                    <>
                      <div
                        key={singleChat?._id}
                        onClick={() => {
                          console.log(singleChat?.reciever);
                          console.log(singleChat?.sender);

                          if (singleChat?.sender === authUser?._id) {
                            dispatch({
                              type: "CHAT_SINGLE_USER_DETAIL",
                              payload: {
                                userId: singleChat?.reciever,
                              },
                            });
                          } else {
                            dispatch({
                              type: "CHAT_SINGLE_USER_DETAIL",
                              payload: {
                                userId: singleChat?.sender,
                              },
                            });
                          }
                          setSelectedChatId(singleChat?._id);
                        }}
                      >
                        <EachChatComponent
                          profilePic={
                            singleChat?.reciever?.avatar
                              ? singleChat?.reciever?.avatar?.secure_url
                              : Blank
                          }
                          name={`${singleChat?.reciever?.firstName} ${singleChat?.reciever?.lastName}`}
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
                <div className=" text-xl px-4">All Contacts</div>
                <div className="">
                  {allContacts.map((singleContact) => {
                    return (
                      <>
                        <ContactComponent
                          name={`${singleContact?.firstName} ${singleContact?.lastName}`}
                          email={singleContact?.email}
                          Pic={
                            singleContact?.avatar
                              ? singleContact?.avatar?.secure_url
                              : Blank
                          }
                        />
                      </>
                    );
                  })}
                </div>
              </>
            )}
            {sideBarIsActive.notification && <>notification</>}
          </div>
        </div>
        {/* chat */}
        <div className=" w-4/5 rounded-3xl space-y-3">
          {receiverId === "" ? (
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
                      src={avatar}
                      alt=""
                      className=" w-12 h-12 rounded-full"
                    />
                  </div>
                  <div>
                    <h1>Harry Potter</h1>
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
              <div className="bg-white rounded-3xl py-4 px-4 h-[71vh]">
                {allSingleChatMessages?.map((singleMesssage) => {
                  console.log("single message---------->", singleMesssage);
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
                    />
                  </div>
                </div>
                <div className="flex space-x-4 ">
                  <div className="px-3 py-2 ">
                    <FontAwesomeIcon icon={faFaceSmile} className="text-3xl" />
                  </div>
                  <div className="px-3 flex items-center bg-blue-100 rounded-full">
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

export const ContactComponent = ({ name, Pic, onClick, email, isActive }) => {
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
        <img src={Pic} alt="" className=" w-14 h-12 rounded-full" />
      </div>
      <div className="w-full">
        <div className="flex justify-between w-full">
          <h1>{name}</h1>
          {/* <div>{email}</div> */}
        </div>

        <h1 className="text-sm">{email}</h1>
      </div>
    </div>
  );
};

export const ChatBubble = ({ id, message }) => {
  return (
    <div>
      {id && (
        <>
          <div className="chat chat-start ">
            <div className="chat-bubble bg-purple-800">{message}</div>
          </div>
        </>
      )}
      {id && (
        <>
          <div className={`chat chat-end`}>
            <div className="chat-bubble bg-blue-800">{message}</div>
          </div>
        </>
      )}
    </div>
  );
};
