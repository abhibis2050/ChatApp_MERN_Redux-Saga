const FriendProfile = ({ button}) => {
  return (
    <div>
      <div className="drawer drawer-end z-20">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer-4" className="drawer-button">
            {button}
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
          <div className="menu p-4 w-[450px] h-[96%] bg-white text-black mt-4 rounded-l-3xl">
            <div>Hello</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendProfile;
