/* eslint-disable react/prop-types */
import { useState } from "react";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
export const EachChatComponent = ({
  name,
  profilePic,
  onClick,
  groupId,
  isGroup,
  chatId,
  isChat,
}) => {
  const { selectedGroupChatId } = useSelector((state) => state.group);
  const { selectedSingleChat } = useSelector((state) => state.chat);
  return (
    <div>
      {isChat && (
        <>
          <div
            onClick={onClick}
            className={`flex space-x-3 items-center pl-2 pr-12 py-2 ${
              selectedSingleChat?._id === chatId
                ? "bg-blue-500 rounded-full text-white"
                : "hover:bg-blue-100 hover:rounded-full"
            }`}
          >
            <div>
              <img
                src={profilePic}
                alt=""
                className=" w-14 h-12 rounded-full"
              />
            </div>
            <div className="w-full">
              <div className="flex justify-between w-full">
                <h1>{name}</h1>
                <div>6:25</div>
              </div>

              <h1 className="text-sm">last message</h1>
            </div>
          </div>
        </>
      )}

      {isGroup && (
        <>
          <div
            onClick={onClick}
            className={`flex space-x-3 items-center pl-2 pr-12 py-2 ${
              selectedGroupChatId === groupId
                ? "bg-blue-500 rounded-full text-white"
                : "hover:bg-blue-100 hover:rounded-full"
            }`}
          >
            <div>
              <img
                src={profilePic}
                alt=""
                className=" w-14 h-12 rounded-full"
              />
            </div>
            <div className="w-full">
              <div className="flex justify-between w-full">
                <h1>{name}</h1>
                <div>6:25</div>
              </div>

              <h1 className="text-sm">last message</h1>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
