const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
import axios from "axios";

export const GetSingleUserWithIdAction = async (payload) => {
  const response = await axios.get(
    `${VITE_BASE_URL}/user/getSingleUserDetailsWithId?userId=${payload.userId}`
  );
  return response;
};


export const GetAllContactsAction = async () => {
  const response = await axios.get(
    `${VITE_BASE_URL}/user/getAllUsers`
  );
  return response;
};


// export const SendFriendRequestAction = async (payload) => {
//   const response = await axios.get(
//     `${VITE_BASE_URL}/user/sendFriendRequest?userId=${payload?.userId}&friendId=${payload?.friendRequestId}`
//   );
//   return response;
// };

export const AcceptFriendRequestAction = async (payload) => {
  const response = await axios.get(
    `${VITE_BASE_URL}/user/acceptFriendRequest?userId=${payload?.userId}&friendRequestId=${payload?.friendRequestId}`
  );
  return response;
};

export const GetAllFriendListAction = async (payload) => {
  const response = await axios.get(
    `${VITE_BASE_URL}/user/getAllFriendList?userId=${payload?.userId}`
  );
  return response;
};


export const GetAllSentFriendRequestAction = async (payload) => {
  const response = await axios.get(
    `${VITE_BASE_URL}/user/getAllSendFriendRequest?userId=${payload?.userId}`
  );
  return response;
};

export const GetAllRecievedFriendRequestAction = async (payload) => {
  const response = await axios.get(
    `${VITE_BASE_URL}/user/getAllRecivedFriendRequest?userId=${payload?.userId}`
  );
  return response;
};




export const GetAllFriendIdAction = async (payload) => {
  const response = await axios.get(
    `${VITE_BASE_URL}/user/getAllFriendId?userId=${payload?.userId}`
  );
  return response;
};


export const GetAllSentFriendRequestIdAction = async (payload) => {
  const response = await axios.get(
    `${VITE_BASE_URL}/user/getAllSendFriendRequestId?userId=${payload?.userId}`
  );
  return response;
};

export const GetAllRecievedFriendRequestIdAction = async (payload) => {
  const response = await axios.get(
    `${VITE_BASE_URL}/user/getAllRecivedFriendRequestId?userId=${payload?.userId}`
  );
  return response;
};



export const CancelSendFriendRequestAction = async (payload) => {
  const response = await axios.get(
    `${VITE_BASE_URL}/user/CancelSendFriendRequest?userId=${payload?.userId}&friendId=${payload?.friendId}`
  );
  return response;
};


export const CancelRecivedFriendRequestAction = async (payload) => {
  const response = await axios.get(
    `${VITE_BASE_URL}/user/CancelRecivedFriendRequest?userId=${payload?.userId}&friendId=${payload?.friendId}`
  );
  return response;
};

export const UnfriendAction = async (payload) => {
  const response = await axios.get(
    `${VITE_BASE_URL}/user/Unfriend?userId=${payload?.userId}&unfriendId=${payload?.unfriendId}`
  );
  return response;
};


export const uploadProfileIconAction = async (payload) => {
  const response = await axios.patch(
    `${VITE_BASE_URL}/user/updateProfilePicture?userId=${payload?.userId}`,
    payload.body
  );
  return response;
};

