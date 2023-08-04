import Logo from "../assets/chatlogo.png";

const Sidebar = () => {
  return (
    <div className="border border-white">
      {/* logo */}
      <div>
        <img src={Logo} />
      </div>
      {/* all other button */}
      <div className="border border-white">all other button</div>
      {/* logout */}
      <div className="border border-white">logout</div>
    </div>
  );
};

export default Sidebar;
