import { useEffect, useState } from "react";
import ModalComponent from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import Blank from "../assets/blank.png";
import { setSelectedGroupChatId } from "../redux/app/GroupSlice";
import { EachChatComponent } from "./ChatComponent";
import { createTracing } from "trace_events";

const Group = () => {
  const dispatch = useDispatch();
  const formData = new FormData();
  const { allGroups } = useSelector((state) => state.group);
  const { token } = useSelector((state) => state.auth);

  const [groupModalOpen, setGroupModalOpen] = useState(false);
  const [groupAvatar, setGroupAvatar] = useState(undefined);
  const [createGroup, setCreateGroup] = useState({
    groupName: "",
    groupMembers: [],
  });

  console.log(createGroup);

  const addGroupHandler = () => {
    if (groupAvatar === undefined) {
      formData.append("groupName", createGroup?.groupName);
      formData.append("groupMembers", createGroup?.groupMembers);
    } else {
      formData.append("groupName", createGroup?.groupName);
      formData.append("groupMembers", createGroup?.groupMembers);
      formData.append("groupAvatar", groupAvatar);
    }

    dispatch({
      type: "CREATE_GROUP",
      payload: {
        body: formData,
        token: token,
      },
    });

    setGroupModalOpen(false);
    setGroupModalOpen(false);
    setGroupAvatar(undefined);
  };

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
          setCreateGroup({
            groupName: "",
            groupMembers: [],
          });
        }}
        groupNameValue={createGroup?.groupName}
        groupNameChange={(e) => {
          setCreateGroup({ ...createGroup, groupName: e.target.value });
        }}
        groupIconUploadChange={(e) => {
          setGroupAvatar(e.target.files[0]);
        }}
        addGroupMemberChange={(e) => {
          console.log(e);
          e.map((singleGroupMember) => {
            // console.log(singleGroupMember)
            if (
              createGroup.groupMembers.includes(singleGroupMember.value) ===
              false
            ) {
              createGroup.groupMembers.push(singleGroupMember.value);
            }
          });
          console.log("2---->",createGroup.groupMembers);


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
