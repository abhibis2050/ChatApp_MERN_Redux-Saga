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

// eslint-disable-next-line react/prop-types
const Sidebar = ({ open, changeOpen,SidebarClick }) => {
  return (
    <div className="space-y-3">
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
          <SidebarComponent icon={faEnvelope} value={"Messages"} />
          <SidebarComponent icon={faUsers} value={"Groups"} />
          <SidebarComponent icon={faContactBook} value={"Contacts"} />
          <SidebarComponent icon={faBell} value={"Notifications"} />
          <SidebarComponent icon={faUser} value={"Profile"} />
        </div>
      </div>
      {/* logout */}
      <div className="">
        <SidebarComponent icon={faRightFromBracket} value={"Logout"} />
      </div>
    </div>
  );
};

export default Sidebar;

// eslint-disable-next-line react/prop-types
export const SidebarComponent = ({ icon, value, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center space-x-10 py-2 px-4 cursor-pointer group hover:bg-white hover:rounded-full"
    >
      <FontAwesomeIcon
        icon={icon}
        className={`text-white text-3xl text-center group-hover:text-blue-700`}
      />
      <h1 className="text-white text-2xl group-hover:text-blue-700">{value}</h1>
    </div>
  );
};
