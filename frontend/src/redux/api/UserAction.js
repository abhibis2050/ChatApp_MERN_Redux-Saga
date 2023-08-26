const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
import axios from "axios";

export const GetSingleUserWithIdAction = async (payload) => {
  const response = await axios.get(
    `${VITE_BASE_URL}/user/getSingleUserDetailsWithId?userId=${payload.userId}`
  );
  return response;
};
