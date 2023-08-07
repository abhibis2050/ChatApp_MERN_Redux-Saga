import Sidebar from "../component/sidebar";
import avatar from "../assets/hp.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faBars,
  faLocationArrow,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

const ChatPage = () => {
  const [open,setOpen] = useState(false)
  return (
    <div className="bg-bluebase w-full h-screen flex fixed">
      {/* sidebar */}
      <div className={`${open?"w-[12%]":"w-[3%]"} mx-3 my-4`}>
        <Sidebar open={open} changeOpen={()=>{
          setOpen(!open)
        }}/>
      </div>
      {/* contact and chat area */}
      <div className={`${open?"w-[88%] ":"w-[97%] "} bg-slate-200 flex space-x-4 rounded-3xl my-4 mr-3 p-4`}>
        {/* contact search and profile */}
        <div className=" w-1/5 rounded-3xl px-2 py-2 bg-white">
          <div className="flex space-x-2 items-center bg-red-200 rounded-full">
            <img src={avatar} alt="" className=" w-12 h-12 rounded-full" />
            <h1>Ron</h1>
          </div>
          <div className="flex items-center rounded-full space-x-2 relative my-2">
            <input
              placeholder="Search Name"
              className="rounded-full w-full  bg-blue-200 py-3 px-4 outline-none"
            />
            <FontAwesomeIcon icon={faSearch} className="absolute right-7" />
          </div>
          <div>Recent Chats</div>
          {/* contat area */}
          <div className="h-[85%] overflow-y-auto space-y-1 pb-4">
            <EachChatComponent />
            <EachChatComponent />
            <EachChatComponent isActive={true} />
            <EachChatComponent />
            <EachChatComponent />
            <EachChatComponent />
            <EachChatComponent />
            <EachChatComponent />
            <EachChatComponent />
            <EachChatComponent />
            <EachChatComponent />
            <EachChatComponent />
            <EachChatComponent />
          </div>
        </div>
        {/* chat */}
        <div className=" w-4/5 rounded-3xl space-y-3">
          {/* header profile */}
          <div className="flex justify-between bg-white  rounded-3xl py-4 px-4">
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
          <div className="bg-white rounded-3xl py-4 px-4 h-[71vh]">hello</div>
          {/* send messgae area*/}
          <div className="flex justify-between items-center bg-white rounded-3xl px-4 py-5">
            <div className="flex space-x-4 w-[90%]">
              <div className="flex items-center px-4 bg-blue-100 rounded-full">
                <FontAwesomeIcon icon={faAdd} className="text-xl" />
              </div>
              <div className=" rounded-full w-full">
                <input
                  placeholder="type message here"
                  className="w-full rounded-full px-5 py-3 outline-none bg-blue-50 text-xl"
                />
              </div>
            </div>
            <div className="flex space-x-4 ">
              <div className="px-3 py-2 ">
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

export const EachChatComponent = ({ isActive }) => {
  return (
    <div
      className={`flex space-x-3 items-center px-2 py-2 ${
        isActive
          ? "bg-blue-500 rounded-full text-white"
          : "hover:bg-blue-100 hover:rounded-full"
      }`}
    >
      <div>
        <img src={avatar} alt="" className=" w-12 h-12 rounded-full" />
      </div>
      <div>
        <h1>Harry Potter</h1>
        <h1 className="text-sm"> last message</h1>
      </div>
    </div>
  );
};
