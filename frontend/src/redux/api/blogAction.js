const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
import axios from "axios";

export const createBlogAction = async (payload) => {
  const response = await axios.post(
    `${VITE_BASE_URL}/blog/createBlog`,
    payload.body,
    {
      headers: {
        Authorization: payload.token,
      },
    }
  );
  return response;
};

export const getAllBlogsBasedOnCategoryActions = async (payload) => {
  const response = await axios.get(`${VITE_BASE_URL}/blog/getBlogOnCategory?category=${payload.category}`, {
    headers: {
      Authorization: payload.token,
    },
  });
  return response;
};


export const getAllBlogsbyIdActions = async (payload) => {
  const response = await axios.get(`${VITE_BASE_URL}/blog/getBlogById?userId=${payload.userId}`, {
    headers: {
      Authorization: payload.token,
    },
  });
  return response;
};

export const GetAllMyBlogsActions = async (payload) => {
  const response = await axios.get(`${VITE_BASE_URL}/blog/getMyBlogs`, {
    headers: {
      Authorization: payload.token,
    },
  });
  return response;
};