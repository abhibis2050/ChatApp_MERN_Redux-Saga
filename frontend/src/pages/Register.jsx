import { useNavigate } from "react-router-dom";
import background from "../assets/background.png";
import SignupImage from "../assets/signup.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faFile,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = new FormData();
  const [profileImageUpload, setProfileImageUpload] = useState();
  const [userRegister, setUserRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const addUserHandler = () => {
    if (userRegister?.password !== userRegister?.confirmPassword) {
      toast.warning("password and confirm password didnot match");
    }
    if (profileImageUpload === undefined) {
      formData.append("firstName", userRegister?.firstName);
      formData.append("lastName", userRegister?.lastName);
      formData.append("email", userRegister?.email);
      formData.append("password", userRegister?.password);
    } else {
      formData.append("firstName", userRegister?.firstName);
      formData.append("lastName", userRegister?.lastName);
      formData.append("email", userRegister?.email);
      formData.append("password", userRegister?.password);
      formData.append("avatar", profileImageUpload);
    }

    dispatch({
      type: "REGISTER",
      payload: {
        body: formData,
      },
    });

    setUserRegister({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setProfileImageUpload(undefined)
  };

  return (
    <div>
      <div className="fixed">
        <img src={background} className="relative" />
        <div className="flex w-full h-[550px] absolute top-48 px-72 ">
          <div className="flex shadow-2xl shadow-blue-400 w-full bg-red-300 z-10">
            {/* Left Part */}
            <div className="bg-white w-1/2 pt-16 px-10">
              <div>
                <img src={SignupImage} className="" />
              </div>
            </div>
            {/* Right Part */}
            <div className="bg-bluebase w-1/2 py-12 space-y-2">
              <div className="mb-8">
                <h1 className="text-white font-semibold text-5xl mx-20">
                  Sign Up
                </h1>
              </div>
              <form className=" mx-20 flex flex-col space-y-5 pt-2">
                <div className="flex space-x-2">
                  <div className=" relative">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="absolute top-3 left-4"
                    />
                    <input
                      type="text"
                      placeholder="First Name"
                      className="rounded-full py-2 bg-white pr-6 pl-12  outline-none w-full"
                      value={userRegister.firstName}
                      onChange={(e) => {
                        setUserRegister({
                          ...userRegister,
                          firstName: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className=" relative">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="absolute top-3 left-4"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="rounded-full py-2 bg-white pr-6 pl-12  outline-none w-full"
                      value={userRegister.lastName}
                      onChange={(e) => {
                        setUserRegister({
                          ...userRegister,
                          lastName: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className=" relative">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="absolute top-3 left-4"
                  />
                  <input
                    type="text"
                    placeholder="Email"
                    className="rounded-full py-2 bg-white pr-6 pl-12  outline-none w-full"
                    value={userRegister.email}
                    onChange={(e) => {
                      setUserRegister({
                        ...userRegister,
                        email: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="flex space-x-2">
                  <div className=" relative">
                    <FontAwesomeIcon
                      icon={faLock}
                      className="absolute top-3 left-4"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="rounded-full py-2 bg-white pr-6 pl-12  outline-none w-full"
                      value={userRegister.password}
                      onChange={(e) => {
                        setUserRegister({
                          ...userRegister,
                          password: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className=" relative">
                    <FontAwesomeIcon
                      icon={faLock}
                      className="absolute top-3 left-4"
                    />
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      className="rounded-full py-2 bg-white pr-6 pl-12  outline-none w-full"
                      value={userRegister.confirmPassword}
                      onChange={(e) => {
                        setUserRegister({
                          ...userRegister,
                          confirmPassword: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className=" relative">
                  <FontAwesomeIcon
                    icon={faFile}
                    className="absolute top-3 left-4"
                  />
                  <input
                    type="file"
                    placeholder="Enter Your Confirm Password"
                    className="rounded-full py-2 bg-white pr-6 pl-12  outline-none w-full"
                    onChange={(e) => {
                      // console.log(e.target.files[0])
                      setProfileImageUpload(e.target.files[0]);
                    }}
                  />
                </div>
              </form>
              <div className=" mx-20 space-x-4 pt-8">
                <button
                  className="bg-gradButton rounded-full text-gray-800 px-6 py-1"
                  onClick={addUserHandler}
                >
                  Sign Up
                </button>
                <button
                  className=" rounded-full text-white px-8 py-1 border-2 border-white "
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Login Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
