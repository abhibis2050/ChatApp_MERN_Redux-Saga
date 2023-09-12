import { useDispatch, useSelector } from "react-redux";

import Blank from "../assets/blank.png";
import { setSelectedChat } from "../redux/app/ChatSlice";
import { EachChatComponent } from "./ChatComponent";
const SingleChat = () => {
  const { allChats } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  return (
    <div className="space-y-2">
      {/* Group Chats */}
      <div className="overflow-y-auto h-[70vh] no-scrollbar rounded-b-3xl pt-6">
        {allChats?.map((singleChat) => {
          return (
            <>
              <div
                key={singleChat._id}
                onClick={() => {
                  console.log("single chat id-------->", singleChat?._id);
                  console.log("single chat", singleChat);
                  dispatch(setSelectedChat({ selectedSingleChat: singleChat }));
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
      </div>
    </div>
  );
};

export default SingleChat;
