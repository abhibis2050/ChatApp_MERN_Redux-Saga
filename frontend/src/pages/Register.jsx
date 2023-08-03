import { useNavigate } from "react-router-dom";
import background from "../assets/background.png";
import SignupImage from "../assets/signup.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";


const Register = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="fixed">
        <img src={background} className="relative" />
        <div className="flex w-full h-[500px] absolute top-28 px-72 ">
          <div className="flex shadow-2xl shadow-blue-400 w-full bg-red-300 z-10">
            {/* Left Part */}
            <div className="bg-white w-1/2 pt-24 px-10">
              <div>
                <img src={SignupImage} className="mt-4 " />
              </div>
            </div>
            {/* Right Part */}
            <div className="bg-bluebase w-1/2 py-12 space-y-3">
              <div className="mb-8">
                <h1 className="text-white font-semibold text-5xl mx-20">
                Sign Up
                </h1>
              </div>
              <form className=" mx-20 flex flex-col space-y-5 pt-2">
              <div className=" relative">
                <FontAwesomeIcon icon={faUser} className="absolute top-3 left-4"/>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  className="rounded-full py-2 bg-white pr-6 pl-12  outline-none w-full"
                />
                </div>
                <div className=" relative">
                <FontAwesomeIcon icon={faEnvelope} className="absolute top-3 left-4"/>
                <input
                  type="text"
                  placeholder="Enter Your Email"
                  className="rounded-full py-2 bg-white pr-6 pl-12  outline-none w-full"
                />
                </div>
                <div className=" relative">
                <FontAwesomeIcon icon={faLock} className="absolute top-3 left-4"/>
                <input
                  type="text"
                  placeholder="Enter Your Password"
                  className="rounded-full py-2 bg-white pr-6 pl-12  outline-none w-full"
                />
                </div>
                <div className=" relative">
                <FontAwesomeIcon icon={faLock} className="absolute top-3 left-4"/>
                <input
                  type="text"
                  placeholder="Enter Your Confirm Password"
                  className="rounded-full py-2 bg-white pr-6 pl-12  outline-none w-full"
                />
                </div>
                
              </form>
              <div className=" mx-20 space-x-4 pt-8">
                <button className="bg-gradButton rounded-full text-gray-800 px-6 py-1">
                  Sign Up
                </button>
                <button className=" rounded-full text-white px-8 py-1 border-2 border-white " onClick={() => {
                    navigate("/");
                  }}>
                  Login Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register