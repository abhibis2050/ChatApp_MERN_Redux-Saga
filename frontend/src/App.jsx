import Routes from "./Routes";
import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const { token, authUser } = useSelector((state) => state.auth);

  useEffect(() => {
    const email = localStorage.getItem("User_email");
    if (email) {
      dispatch({
        type: "ACCESS_TOKEN",
        payload: email,
      });
    }
  }, []);

  useEffect(() => {
    const email = localStorage.getItem("User_email");
    if (email) {
      dispatch({
        type: "AUTH_USER",
        payload: {
          token,
        },
      });
    }
  }, [token, dispatch]);

  useEffect(() => {
    dispatch({
      type: "GET_ALL_CONTACTS",
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: "GET_ALL_MY_BLOGS",
      payload: {
        token,
      },
    });
  }, []);

  useEffect(() => {
    if (token !== "" && authUser) {
      dispatch({
        type: "GET_FRIENDLIST",
        payload: {
          userId: authUser?._id,
        },
      });

      dispatch({
        type: "GET_ALL_FRIENDREQUEST_SENT",
        payload: {
          userId: authUser?._id,
        },
      });

      dispatch({
        type: "GET_ALL_FRIENDREQUEST_RECIEVED",
        payload: {
          userId: authUser?._id,
        },
      });
      dispatch({
        type: "GET_FRIENDLIST_ID",
        payload: {
          userId: authUser?._id,
        },
      });
      dispatch({
        type: "GET_ALL_FRIENDREQUEST_SENT_ID",
        payload: {
          userId: authUser?._id,
        },
      });
      dispatch({
        type: "GET_ALL_FRIENDREQUEST_RECIEVED_ID",
        payload: {
          userId: authUser?._id,
        },
      });
      dispatch({
        type: "GET_ALL_GROUPS",
        payload: {
          userId: authUser?._id,
        },
      });
      dispatch({
        type: "GET_ALL_MY_BLOGS",
        payload: {
          token,
        },
      });
    }
  }, [authUser, token]);

  return (
    <>
      <div>
        <Routes />
      </div>
    </>
  );
}

export default App;
