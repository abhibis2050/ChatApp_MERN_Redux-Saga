const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
import axios from "axios";

export const CreateGroupAction = async (payload) => {
  const response = await axios.post(
    `${VITE_BASE_URL}/group/createGroup`,
    payload.body,
    {
      headers: {
        Authorization: payload.token,
      },
    }
  );
  return response;
};

export const UsersNotPresentInGroupAction = async (payload) => {
  const response = await axios.patch(
    `${VITE_BASE_URL}/group/UsersNotPresentInGroup?groupId=64d4c39e028e89525aed0d88`,
    payload.body,
    {
      headers: {
        Authorization: payload.token,
      },
    }
  );
  return response;
};

export const AddGroupMembersAction = async (payload) => {
  const response = await axios.patch(
    `${VITE_BASE_URL}/group/addGroupMembers?groupId=64d4c39e028e89525aed0d88`,
    payload.body,
    {
      headers: {
        Authorization: payload.token,
      },
    }
  );
  return response;
};

export const UpdateAsGroupAdminAction = async (payload) => {
  const response = await axios.patch(
    `${VITE_BASE_URL}/group/updateAsGroupAdmin?groupId=64d4c39e028e89525aed0d88&userId=64d21e65d1a365dd8e846146`,
    payload.body,
    {
      headers: {
        Authorization: payload.token,
      },
    }
  );
  return response;
};

export const RemovefromGroupAdminAction = async (payload) => {
    const response = await axios.patch(
      `${VITE_BASE_URL}/group/RemovefromGroupAdmin?groupId=64d4c39e028e89525aed0d88&userId=64d21e65d1a365dd8e846146`,
      payload.body,
      {
        headers: {
          Authorization: payload.token,
        },
      }
    );
    return response;
  };

  
  export const GetAllGroupsAction = async (payload) => {
    const response = await axios.get(
      `${VITE_BASE_URL}/group/getAllGroups?userId=${payload?.userId}`,
    );
    return response;
  };


   
  export const GetGroupsByIdAction = async (payload) => {
    const response = await axios.get(
      `${VITE_BASE_URL}/group/getGroupById?groupId=${payload?.groupId}`,      
    );
    return response;
  };



export const uploadGroupProfileIconAction = async (payload) => {
  const response = await axios.patch(
    `${VITE_BASE_URL}/group/updateGroupProfilePicture?groupId=${payload?.groupId}`,
    payload.body
  );
  return response;
};