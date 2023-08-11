const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
import axios from "axios";

export const registerUserAction = async (payload) => {
  const response = await axios.post(
    `${VITE_BASE_URL}/user/register`,
    payload.body
  );
  return response;
};

export const loginUserAction = async (payload) => {
  const response = await axios.post(
    `${VITE_BASE_URL}/user/login`,
    payload.body
  );
  return response;
};

export const AccessTokenAction = async (payload) => {
  const response = await axios.get(
    `${VITE_BASE_URL}/user/accessToken?email=ab@email.com`
  );
  return response;
};

export const AuthUserAction = async (payload) => {
  const response = await axios.get(`${VITE_BASE_URL}/user/authUser`, {
    headers: {
      Authorization: payload.token,
    },
  });
  return response;
};
