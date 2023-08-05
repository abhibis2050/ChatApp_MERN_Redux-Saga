import {
  faBell,
  faEnvelope,
  faRightFromBracket,
  faTasks,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../assets/chatlogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Sidebar = () => {
  return (
    <div className=" space-y-3">
      {/* logo */}
      <div className="">
        <img src={Logo} />
      </div>
      {/* all other button */}
      <div className="h-[78vh] py-44">
        <div className="space-y-4">
          <SidebarComponent icon={faEnvelope} value={"Messages"} />
          <SidebarComponent icon={faUsers} value={"Groups"} />
          <SidebarComponent icon={faTasks} value={"Contacts"} />
          <SidebarComponent icon={faBell} value={"Notifications"} />
          <SidebarComponent icon={faUser} value={"Profile"} />
        </div>
      </div>
      {/* logout */}
      <div className="">
        <SidebarComponent icon={faRightFromBracket} value={"Logout"}/>
      </div>
    </div>
  );
};

export default Sidebar;

export const SidebarComponent = ({ icon, value }) => {
  return (
    <div className="flex items-center space-x-4 px-4 py-2 cursor-pointer">
      <FontAwesomeIcon icon={icon} className="text-white text-3xl" />
      <h1 className="text-white text-2xl">{value}</h1>
    </div>
  );
};
