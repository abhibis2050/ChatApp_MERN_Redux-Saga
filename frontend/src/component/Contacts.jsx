import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../customHooks/SocketHooks";
import { AllContactComponent, ContactComponent } from "../pages/ChatPage";
import Blank from "../assets/blank.png";
import Select from "react-select";
import { setSelectedContact} from "../redux/app/UserSlice";

const Contacts = () => {
  const dispatch = useDispatch();
  const { token, authUser} = useSelector((state) => state.auth);
  const { selectedContact } = useSelector((state) => state.user);
  const { allChats } = useSelector((state) => state.chat);

  console.log("selectedContact---->",selectedContact);

  const [contacts, setContacts] = useState({
    allContact: true,
    myContact: false,
    friendRequestSent: false,
    friendRequestRecieved: false,
  });

  const {
    allContacts,
    allFriendList,
    allFriendRequestSent,
    allFriendRequestRecieved,
    allFriendListId,
    allFriendRequestSentId,
    allFriendRequestRecievedId,
  } = useSelector((state) => state.user);

  
  useEffect(() => {
    dispatch({
      type: "GET_ALL_CONTACTS",
    });

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
  }, [authUser, contacts]);

  useEffect(()=>{
    if(selectedContact!==null){
      dispatch({
        type:"GET_BLOGS_BY_ID",
        payload:{
          userId:selectedContact
        }
      })
    }
  },[selectedContact])

  const addFriendHandler = (friendId) => {
    if (authUser._id) {
      console.log("add button clicked", authUser._id, friendId);
      socket.emit("send_Friend_Request", {
        userId: authUser?._id,
        friendId,
      });
    }
  };

  const acceptFriendHandler = (friendRequestId) => {
    if (authUser._id) {
      console.log("accept button clicked", authUser._id, friendRequestId);
      dispatch({
        type: "ACCEPT_FRIEND_REQUEST",
        payload: {
          userId: authUser?._id,
          friendRequestId,
        },
      });
    }
  };

  const cancelSendFriendRequestHandler = (friendId) => {
    console.log(
      "cancelSendFriendRequestHandler clicked",
      authUser?._id,
      friendId
    );
    if (authUser._id) {
      dispatch({
        type: "CANCEL_FRIENDREQUEST_SENT",
        payload: {
          userId: authUser?._id,
          friendId,
        },
      });
    }
  };

  const cancelRecievedFriendRequestHandler = (friendId) => {
    console.log(
      "cancelRecievedFriendRequestHandler clicked",
      authUser?._id,
      friendId
    );
    if (authUser._id) {
      dispatch({
        type: "CANCEL_FRIENDREQUEST_RECIEVED",
        payload: {
          userId: authUser?._id,
          friendId,
        },
      });
    }
  };

  const unfriendHandler = (unfriendId) => {
    console.log("unfriendHandler clicked", authUser?._id, unfriendId);
    if (authUser._id) {
      dispatch({
        type: "UNFRIEND",
        payload: {
          userId: authUser?._id,
          unfriendId,
        },
      });
    }
  };
  return (
    <>
      <div className="flex text-base justify-between py-2 px-4">
        <div
          className={`py-2 px-3 ${
            contacts.allContact ? "bg-bluebase text-white rounded-full" : ""
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
            contacts.myContact ? "bg-bluebase text-white rounded-full" : ""
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
            className="w-36"
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
      </div>
      <div className="overflow-y-auto h-[70vh] no-scrollbar rounded-b-3xl pt-6">
        {contacts.allContact === true && (
          <>
            <div className="">
              {allContacts?.map((singleContact) => {
                {
                  if (allFriendListId.includes(singleContact?._id) === true) {
                    return (
                      <>
                        <AllContactComponent
                          key={singleContact?._id}
                          name={`${singleContact?.firstName} ${singleContact?.lastName}`}
                          email={singleContact?.email}
                          Pic={
                            singleContact?.avatar
                              ? singleContact?.avatar?.secure_url
                              : Blank
                          }
                          onButtonClick={() =>
                            unfriendHandler(singleContact?._id)
                          }
                          tag={"Unfriend"}
                        />
                      </>
                    );
                  } else if (
                    allFriendRequestSentId.includes(singleContact?._id) === true
                  ) {
                    return (
                      <>
                        <AllContactComponent
                          key={singleContact?._id}
                          name={`${singleContact?.firstName} ${singleContact?.lastName}`}
                          email={singleContact?.email}
                          Pic={
                            singleContact?.avatar
                              ? singleContact?.avatar?.secure_url
                              : Blank
                          }
                          onButtonClick={() =>
                            cancelSendFriendRequestHandler(singleContact?._id)
                          }
                          tag={"Unsend"}
                        />
                      </>
                    );
                  } else if (
                    allFriendRequestRecievedId.includes(singleContact?._id) ===
                    true
                  ) {
                    return (
                      <>
                        <AllContactComponent
                          key={singleContact?._id}
                          name={`${singleContact?.firstName} ${singleContact?.lastName}`}
                          email={singleContact?.email}
                          Pic={
                            singleContact?.avatar
                              ? singleContact?.avatar?.secure_url
                              : Blank
                          }
                          onButtonClick={() =>
                            acceptFriendHandler(singleContact?._id)
                          }
                          tag={"Accept"}
                          tagTwo={"Decline"}
                          onButtonClickTwo={() =>
                            cancelRecievedFriendRequestHandler(
                              singleContact?._id
                            )
                          }
                        />
                      </>
                    );
                  } else {
                    return (
                      <>
                        <AllContactComponent
                          key={singleContact?._id}
                          name={`${singleContact?.firstName} ${singleContact?.lastName}`}
                          email={singleContact?.email}
                          Pic={
                            singleContact?.avatar
                              ? singleContact?.avatar?.secure_url
                              : Blank
                          }
                          onButtonClick={() =>
                            addFriendHandler(singleContact?._id)
                          }
                          tag={"Add"}
                          onContactClick={()=>{
                            dispatch(setSelectedContact({selectedContact:singleContact?._id}))
                          }}
                        />
                      </>
                    );
                  }
                }
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
                      tag={"Message"}
                      onButtonClick={() => {
                        console.log(singleFriend);
                        dispatch({
                          type: "CREATE_CHAT",
                          payload: {
                            body: {
                              userOne: singleFriend?._id,
                              userTwo: authUser?._id,
                            },
                            oppositeId: singleFriend,
                            token,
                          },
                        });
                      }}
                      tagTwo={"Unfriend"}
                      onButtonClickTwo={() =>
                        unfriendHandler(singleFriend?._id)
                      }
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
                      onButtonClick={() =>
                        acceptFriendHandler(singleFriendReq?._id)
                      }
                      tag={"Accept"}
                      tagTwo={"Decline"}
                      onButtonClickTwo={() =>
                        cancelRecievedFriendRequestHandler(singleFriendReq?._id)
                      }
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
                      tag={"Unsent"}
                      onButtonClick={() =>
                        cancelSendFriendRequestHandler(singleFriendReq?._id)
                      }
                    />
                  </>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Contacts;
