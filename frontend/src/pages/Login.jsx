import { useNavigate } from "react-router-dom";
import background from "../assets/background.png";
import LoginImage from "../assets/login.png";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch } from "react-redux";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  // console.log(userLogin);

  const handleLogin = (e) => {
    e.preventDefault();
    const loginPayload = {
      email: userLogin?.email,
      password: userLogin?.password,
    };
    // console.log("login payload",loginPayload);
    dispatch({
      type: "LOGIN",
      payload: {
        body: loginPayload,
        navigate,
      },
    });
  };

  return (
    <div>
      <div className="fixed">
        <img src={background} className="relative" />
        <div className="flex w-full h-[500px] absolute top-72 px-80">
          <div className="flex shadow-2xl shadow-blue-400 w-full z-10">
            {/* Left Part */}
            <div className="bg-white w-1/2">
              <div className="">
                <img src={LoginImage} className="mt-4" />
              </div>
            </div>
            {/* Right Part */}
            <div className="bg-bluebase w-1/2 py-24 space-y-3">
              <div className="mb-10">
                <h1 className="text-white font-semibold text-5xl mx-20 flex justify-center">
                  Login
                </h1>
              </div>
              <form className=" mx-20 flex flex-col space-y-4 py-4">
                <div className=" relative">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="absolute top-3 left-4"
                  />
                  <input
                    type="text"
                    placeholder="Enter Your Email"
                    className="rounded-full py-2 bg-white pr-6 pl-12 outline-none w-full"
                    value={userLogin.email}
                    onChange={(e) => {
                      setUserLogin({ ...userLogin, email: e.target.value });
                    }}
                  />
                </div>

                <div className=" relative">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="absolute top-3 left-4"
                  />
                  <input
                    type="text"
                    placeholder="Enter Your Password"
                    className="rounded-full py-2 bg-white pr-6 pl-12  outline-none w-full"
                    value={userLogin.password}
                    onChange={(e) => {
                      setUserLogin({ ...userLogin, password: e.target.value });
                    }}
                  />
                </div>
              </form>
              <div className=" mx-20 space-x-4 pt-4">
                <button
                  className="bg-gradButton rounded-full text-gray-800 px-8 py-1"
                  onClick={handleLogin}
                >
                  Sign In
                </button>
                <button
                  className="border-2 border-white  rounded-full text-white px-4 py-1 "
                  onClick={() => {
                    navigate("/signUp");
                  }}
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
