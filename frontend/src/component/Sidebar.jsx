import {
  faBell,
  faContactBook,
  faEnvelope,
  faRightFromBracket,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../assets/smily.png";
import Chatzi from "../assets/Chatzi.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { setSideBarIsActive } from "../redux/app/UserSlice";
import { useState } from "react";
import ModalComponent from "./Modal";

// eslint-disable-next-line react/prop-types
const Sidebar = ({ open, changeOpen}) => {
  const dispatch = useDispatch();
  const { sideBarIsActive } = useSelector((state) => state.user);
  const[logOutModalOpen,setLogOutModalOpen]=useState(false)

  return (
    <div className="space-y-3">

    {logOutModalOpen&&(
      <div>
      <ModalComponent
        isLoggedOut={true}
        label={"Logout"}
        openModal={logOutModalOpen}
        closeModal={()=>{
          setLogOutModalOpen(false)
        }}
        ButtonlabelTwo={"Cancel"}
        buttonlabel={"Logout"}
      />
      </div>
    )}
      {/* logo */}
      <div className="h-20">
        {!open ? (
          <div onClick={changeOpen}>
            <img src={Logo} className="w-14 h-12" />
          </div>
        ) : (
          <div className="flex items-center space-x-2 " onClick={changeOpen}>
            <img src={Logo} className="w-14 h-12" />
            <img src={Chatzi} className="w-32 h-9" />
          </div>
        )}
      </div>
      {/* all other button */}
      <div className="h-[78vh] py-44">
        <div className="space-y-4">
          <SidebarComponent
            icon={faEnvelope}
            value={"Messages"}
            isActive={sideBarIsActive?.message ? true : false}
            onClick={() => {
              console.log("message Clicked");
              dispatch(
                setSideBarIsActive({
                  message: true,
                  group: false,
                  contact: false,
                  notification: false,
                  profile: false,
                })
              );
            }}
          />
          <SidebarComponent
            icon={faUsers}
            value={"Groups"}
            isActive={sideBarIsActive?.group ? true : false}
            onClick={() => {
              dispatch(
                setSideBarIsActive({
                  message: false,
                  group: true,
                  contact: false,
                  notification: false,
                  profile: false,
                })
              );
            }}
          />
          <SidebarComponent
            icon={faContactBook}
            value={"Contacts"}
            isActive={sideBarIsActive?.contact ? true : false}
            onClick={() => {
              dispatch(
                setSideBarIsActive({
                  message: false,
                  group: false,
                  contact: true,
                  notification: false,
                  profile: false,
                })
              );
            }}
          />
          <SidebarComponent
            icon={faBell}
            value={"Notifications"}
            isActive={sideBarIsActive?.notification ? true : false}
            onClick={() => {
              dispatch(
                setSideBarIsActive({
                  message: false,
                  group: false,
                  contact: false,
                  notification: true,
                  profile: false,
                })
              );
            }}
          />
          <SidebarComponent
            icon={faUser}
            value={"Profile"}
            isActive={sideBarIsActive?.profile ? true : false}
            onClick={() => {
              dispatch(
                setSideBarIsActive({
                  message: false,
                  group: false,
                  contact: false,
                  notification: false,
                  profile: true,
                })
              );
            }}
          />
        </div>
      </div>
      {/* logout */}
      <div className="">
        <SidebarComponent icon={faRightFromBracket} value={"Logout"} 
          onClick={()=>{
            setLogOutModalOpen(true)
          }}
        />
      </div>
    </div>
  );
};

export default Sidebar;

// eslint-disable-next-line react/prop-types
export const SidebarComponent = ({ icon, value, onClick, isActive }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center space-x-10 py-2 px-4 cursor-pointer group hover:bg-white hover:rounded-full ${
        isActive ? "group bg-white rounded-full" : ""
      }`}
    >
      <FontAwesomeIcon
        icon={icon}
        className={` text-3xl text-center group-hover:text-blue-700 ${
          isActive ? "text-blue-700" : "text-white"
        }`}
      />
      <h1
        className={`text-2xl group-hover:text-blue-700 ${
          isActive ? "text-blue-700" : "text-white"
        }`}
      >
        {value}
      </h1>
    </div>
  );
};
