import { useState } from "react";
import ModalComponent from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import Blank from "../assets/blank.png";
import { setSelectedGroupChatId } from "../redux/app/GroupSlice";
import { EachChatComponent } from "./ChatComponent";

const Group = () => {
  const dispatch = useDispatch();
  const { allGroups } = useSelector((state) => state.group);

  const [groupModalOpen, setGroupModalOpen] = useState(false);
  const [groupAvatar, setGroupAvatar] = useState(false);
  const [createGroup, , setCreateGroup] = useState({
    groupName: "",
    groupMembers: [],
  });

  console.log(createGroup);

  const addGroupHandler = () => {};

  return (
    <div className="space-y-2">
      <ModalComponent
        isAddGroup={true}
        label={"Add Group"}
        openModal={groupModalOpen}
        closeModal={() => {
          setGroupModalOpen(false);
        }}
        ButtonlabelTwo={"Cancel"}
        buttonlabel={"Save"}
        onClickButton={addGroupHandler}
        onClickButtonTwo={() => {
          setGroupModalOpen(false);
        }}
        groupNameValue={createGroup?.groupName}
        groupNameChange={(e)=>{
          setCreateGroup({...createGroup,groupName:e.target.value})
        }}
        groupIconUploadChange={(e) => {
          setGroupAvatar(e.target.files[0]);
        }}
        addGroupMemberChange={(e) => {
          setCreateGroup({ ...createGroup, groupMembers: e });
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
          return (
            <>
              <div
                key={singleGroup._id}
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
                }}
              >
                <EachChatComponent
                  isGroup={true}
                  profilePic={
                    singleGroup?.GroupAvatar
                      ? singleGroup?.GroupAvatar?.secure_url
                      : Blank
                  }
                  name={singleGroup?.groupName}
                  groupId={singleGroup?._id}
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
