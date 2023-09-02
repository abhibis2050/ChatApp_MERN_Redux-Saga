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
    if (token!=="" && authUser) {
      dispatch({
        type: "GET_FRIENDLIST",
        payload: {
          userId: authUser?._id,
        },
      });
    }

    if (token!=="" && authUser) {
      dispatch({
        type: "GET_ALL_FRIENDREQUEST_SENT",
        payload: {
          userId: authUser?._id,
        },
      });
    }

    if (token!=="" && authUser) {
      dispatch({
        type: "GET_ALL_FRIENDREQUEST_RECIEVED",
        payload: {
          userId: authUser?._id,
        },
      });
    }
  }, [authUser,token]);

  return (
    <>
      <div>
        <Routes />
      </div>
    </>
  );
}

export default App;
