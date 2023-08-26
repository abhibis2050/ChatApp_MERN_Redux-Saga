const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
import axios from "axios";

export const createChatAction = async (payload) => {
  const response = await axios.post(
    `${VITE_BASE_URL}/chat/createChat`,
    payload.body
  );
  return response;
};

export const GetAllChatsActions = async (payload) => {
  const response = await axios.get(`${VITE_BASE_URL}/chat/getAllChats`, {
    headers: {
      Authorization: payload.token,
    },
  });
  return response;
};
