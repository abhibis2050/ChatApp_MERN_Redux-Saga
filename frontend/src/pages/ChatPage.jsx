import Sidebar from "../component/sidebar";
import avatar from "../assets/hp.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faBars,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";

const ChatPage = () => {
  return (
    <div className="bg-bluebase w-full h-screen flex fixed">
      {/* sidebar */}
      <div className=" w-[15%] mx-3 my-4">
        <Sidebar />
      </div>
      {/* contact and chat area */}
      <div className="bg-slate-200 flex space-x-4 w-[85%] rounded-3xl my-4 mr-3 ">
        {/* contact */}
        <div className="bg-white w-1/5 rounded-3xl  mt-4 mb-5 ml-3 px-2 py-2">
          <div className="flex space-x-2 items-center bg-red-200 rounded-full">
            <img src={avatar} alt="" className=" w-12 h-12 rounded-full" />
            <h1>Ron</h1>
          </div>
          <div>
            
          </div>
        </div>
        {/* chat */}
        <div className=" w-4/5 rounded-3xl space-y-3">
          {/* header profile */}
          <div className="flex justify-between bg-white  rounded-3xl py-4 px-4 h-[10%] mt-3 mr-4">
            <div className="flex space-x-2 items-center">
              <div>
                <img src={avatar} alt="" className=" w-12 h-12 rounded-full" />
              </div>
              <div>
                <h1>Harry Potter</h1>
                <h1 className="text-sm">online</h1>
              </div>
            </div>
            <div className="flex items-center mr-4">
              <FontAwesomeIcon icon={faBars} />
            </div>
          </div>
          {/*chat messages area */}
          <div className="bg-white rounded-3xl py-4 px-4 h-[70%] mr-4">
            hello
          </div>
          {/* send messgae area*/}
          <div className="flex justify-between items-center bg-white rounded-3xl px-4 h-[12%] mb-2 mr-4">
            <div className="flex space-x-4 w-[85%]">
              <div className="flex items-center px-4 bg-blue-100 rounded-full">
                <FontAwesomeIcon icon={faAdd} className="text-xl" />
              </div>
              <div className=" rounded-full w-full">
                <input
                  placeholder="type message here"
                  className="w-full rounded-full px-5 py-3 outline-none bg-blue-50"
                />
              </div>
            </div>
            <div className="flex space-x-4 ">
              <div className=" px-3 py-2 ">
                <FontAwesomeIcon icon={faFaceSmile} className="text-3xl" />
              </div>
              <div className="px-3 flex items-center bg-blue-100 rounded-full">
                <FontAwesomeIcon
                  icon={faLocationArrow}
                  className="text-3xl text-[#0059E4]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
