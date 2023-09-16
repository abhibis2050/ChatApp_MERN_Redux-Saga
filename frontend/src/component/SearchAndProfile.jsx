import { useSelector } from "react-redux";
import Blank from "../assets/blank.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchAndProfile = () => {
  const { sideBarIsActive } = useSelector((state) => state.user);
  const { token, authUser } = useSelector((state) => state.auth);
  return (
    <div>
      {sideBarIsActive.message && (
        <>
          <div className="">
            <div className="flex space-x-2 items-center rounded-full ">
              <img
                src={
                  authUser?.avatar?.secure_url
                    ? authUser?.avatar?.secure_url
                    : Blank
                }
                alt=""
                className=" w-12 h-12 rounded-full"
              />
              <h1>
                {authUser?.firstName} {authUser?.lastName}
              </h1>
            </div>
            <div className="flex items-center rounded-full space-x-2 relative my-2">
              <input
                placeholder="Search Name"
                className="rounded-full w-full bg-slate-200 py-3 px-4 outline-none"
              />
              <FontAwesomeIcon icon={faSearch} className="absolute right-7" />
            </div>
            <div className="my-2">Recent Chats</div>
          </div>
        </>
      )}
      {sideBarIsActive.group && (
        <>
          <div className="">
            <div className="flex space-x-2 items-center rounded-full ">
              <img
                src={
                  authUser?.avatar?.secure_url
                    ? authUser?.avatar?.secure_url
                    : Blank
                }
                alt=""
                className=" w-12 h-12 rounded-full"
              />
              <h1>
                {authUser?.firstName} {authUser?.lastName}
              </h1>
            </div>
            <div className="flex items-center rounded-full space-x-2 relative my-2">
              <input
                placeholder="Search Group"
                className="rounded-full w-full bg-slate-200 py-3 px-4 outline-none"
              />
              <FontAwesomeIcon icon={faSearch} className="absolute right-7" />
            </div>
            <div className="my-2">All Groups</div>
          </div>
        </>
      )}
      {sideBarIsActive.contact && (
        <>
          <div className="">
            <div className="flex space-x-2 items-center rounded-full ">
              <img
                src={
                  authUser?.avatar?.secure_url
                    ? authUser?.avatar?.secure_url
                    : Blank
                }
                alt=""
                className=" w-12 h-12 rounded-full"
              />
              <h1>
                {authUser?.firstName} {authUser?.lastName}
              </h1>
            </div>
            <div className="flex items-center rounded-full space-x-2 relative my-2">
              <input
                placeholder="Search Contact"
                className="rounded-full w-full bg-slate-200 py-3 px-4 outline-none"
              />
              <FontAwesomeIcon icon={faSearch} className="absolute right-7" />
            </div>
            <div className="my-2">All Contacts</div>
          </div>
        </>
      )}
      {sideBarIsActive.notification && (
        <>
          <div className="">
            <div className="flex space-x-2 items-center rounded-full ">
              <img
                src={
                  authUser?.avatar?.secure_url
                    ? authUser?.avatar?.secure_url
                    : Blank
                }
                alt=""
                className=" w-12 h-12 rounded-full"
              />
              <h1>
                {authUser?.firstName} {authUser?.lastName}
              </h1>
            </div>
            {/* <div className="flex items-center rounded-full space-x-2 relative my-2">
          <input
            placeholder="Search Group"
            className="rounded-full w-full bg-slate-200 py-3 px-4 outline-none"
          />
          <FontAwesomeIcon icon={faSearch} className="absolute right-7" />
        </div> */}
            <div className="my-2">All Notifications</div>
          </div>
        </>
      )}
      {/* {sideBarIsActive.profile && <>profile</>} */}
    </div>
  );
};

export default SearchAndProfile;
