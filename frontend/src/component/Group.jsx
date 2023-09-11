import { useState } from "react";
import ModalComponent from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { EachChatComponent } from "../pages/ChatPage";
import Blank from "../assets/blank.png";
import { setSelectedGroupChatId } from "../redux/app/GroupSlice";
import { io } from "socket.io-client";
const socket = io("http://localhost:8080");

const Group = () => {
  const dispatch = useDispatch();
  const { allGroups } = useSelector((state) => state.group);

  const [groupModalOpen, setGroupModalOpen] = useState(false);

  return (
    <div className="space-y-2">
      <ModalComponent
        isAddGroup={true}
        label={"Add Group"}
        openModal={groupModalOpen}
        closeModal={() => {
          setGroupModalOpen(false);
        }}
        buttonlabel={"Save"}
        onClickButton={() => {
          setGroupModalOpen(false);
        }}
      />

      {/* ADD Group */}
      <div className="flex justify-end">
        <button
          className="bg-bluebase text-white text-base rounded-full px-5 py-2"
          onClick={() => {
            setGroupModalOpen(true);
          }}
        >
          Add Group
        </button>
      </div>

      {/* Group Chats */}
      <div className="overflow-y-auto h-[70vh] no-scrollbar rounded-b-3xl pt-6">
        {allGroups.map((singleGroup) => {
          {
            /* console.log("singleGroup--------->",singleGroup) */
          }
          return (
            <>
              <div
                key={singleGroup?._id}
                onClick={() => {
                  dispatch(
                    setSelectedGroupChatId({
                      selectedGroupChatId: singleGroup?._id,
                    })
                  );
                  dispatch({
                    type: "GET_GROUP_DETAIL_BY_ID",
                    payload: {
                      groupId: singleGroup?._id,
                    },
                  });
                  socket.emit("joinGroup", singleGroup?._id);
                }}
              >
                <EachChatComponent
                  profilePic={
                    singleGroup?.GroupAvatar
                      ? singleGroup?.GroupAvatar?.secure_url
                      : Blank
                  }
                  name={singleGroup?.groupName}
                />
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Group;
