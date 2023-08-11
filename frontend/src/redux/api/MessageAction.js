const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
import axios from "axios";



export const SendOneToOneMessageAction = async (payload) => {
    const response = await axios.post(`${VITE_BASE_URL}/message/sendOneToOneMessage`, {
      headers: {
        Authorization: payload.token,
      },
    });
    return response;
  };

  
export const SendGroupMessageAction = async (payload) => {
    const response = await axios.post(`${VITE_BASE_URL}/message/sendGroupMessage`, {
      headers: {
        Authorization: payload.token,
      },
    });
    return response;
};

export const GetAllGroupMessagesAction = async (payload) => {
    const response = await axios.get(`${VITE_BASE_URL}/message/getAllGroupMessages`, {
      headers: {
        Authorization: payload.token,
      },
    });
    return response;
};

export const getAlloneToOneMessagesAction = async (payload) => {
    const response = await axios.get(`${VITE_BASE_URL}/message/getAlloneToOneMessages`, {
      headers: {
        Authorization: payload.token,
      },
    });
    return response;
};