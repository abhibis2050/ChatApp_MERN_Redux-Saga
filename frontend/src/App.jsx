import Routes from "./Routes";
import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

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

  return (
    <>
      <div>
        <Routes />
      </div>
    </>
  );
}

export default App;
