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


export const SendFriendListAction = async (payload) => {
  const response = await axios.get(
    `${VITE_BASE_URL}/user/sendFriendRequest?userId=${payload?.userId}&friendRequestId=${payload?.friendRequestId}`
  );
  return response;
};

export const SendFriendRequestAction = async (payload) => {
  const response = await axios.get(
    `${VITE_BASE_URL}/user/acceptFriendRequest?userId=${payload?.userId}&friendId=${payload?.friendRequestId}`
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



