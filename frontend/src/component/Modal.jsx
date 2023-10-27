/* eslint-disable react/prop-types */
import Modal from "react-modal";
import { useSelector } from "react-redux";
import Select from "react-select";

const ModalComponent = ({
  label,
  openModal,
  closeModal,
  buttonlabel,
  onClickButton,
  ButtonlabelTwo,

  // adding Group
  isAddGroup,
  // logout
  isLoggedOut,
  // Adding Blog
  isAddBlog,
}) => {
  const { allContacts } = useSelector((state) => state.user);
  return (
    <div>
      <div>
        <Modal
          className=" bg-blue-100 absolute top-[25%] left-[25%] right-auto bottom-auto space-y-4 w-[900px] pb-5 rounded-2xl outline-none"
          isOpen={openModal}
          onRequestClose={closeModal}
          contentLabel="Examp Modal"
        >
          <div className="bg-bluebase text-white text-2xl px-6 py-2 rounded-t-2xl">
            {label}
          </div>
          {isAddGroup && (
            <>
              <div className="space-y-4 px-3">
                <div className="flex space-x-2 items-center">
                  <div className="text-xl w-36">Group Name</div>
                  <input
                    placeholder="Enter Group Name "
                    className="px-4 py-1 outline-none text-xl w-full rounded-xl"
                  />
                </div>
                <div className="">
                  <Select
                    closeMenuOnSelect={false}
                    placeholder="Select Members"
                    isMulti
                    options={allContacts.map((singleContact) => {
                      return {
                        label: `${singleContact?.firstName} ${singleContact?.lastName}`,
                        value: singleContact?._id,
                      };
                    })}
                    onChange={(e) => {}}
                  />
                </div>
              </div>
            </>
          )}

          {isAddBlog && (
            <div className="space-y-3 px-4">
              <div className="flex space-x-2 items-center ">
                <div className="text-xl w-36">Title </div>
                <input
                  placeholder="Enter Blog Title "
                  className="px-4 py-1 outline-none text-xl w-full rounded-xl"
                />
              </div>
              <div className="flex space-x-2 items-center">
                <div className="text-xl w-36">Description </div>
                <textarea
                  placeholder="Enter Blog Title "
                  className="px-4 py-1 outline-none text-xl w-full rounded-xl"
                />
              </div>
              <div className="flex">
                <div className="text-xl w-32">Category </div>
                <Select
                  className="w-48"
                  closeMenuOnSelect={false}
                  placeholder="Select Category"
                  options={[
                    { value: "TECHNOLOGY", label: "TECHNOLOGY" },
                    { value: "FASHION", label: "FASHION" },
                    { value: "TRAVELL", label: "TRAVELL" },
                    { value: "FITNESS", label: "FITNESS" },
                    { value: "BUSINESS", label: "BUSINESS" },
                    { value: "PHOTOGRAPHY", label: "PHOTOGRAPHY" },
                    { value: "ENVIRONMENT", label: "ENVIRONMENT" },
                    { value: "OTHERS", label: "OTHERS" },
                  ]}
                  onChange={(e) => {
                    console.log(e);
                  }}
                />
              </div>

              <div className="flex items-center">
                  <div className="text-xl w-32">Select Image</div>
                <input
                  type="file"
                  id="fileUpload"
                  onChange={(e) => {
                    console.log(e.target.files);
                  }}
                />
              </div>
            </div>
          )}

          {isLoggedOut && (
            <>
              <div>Do you want to logout?</div>
            </>
          )}

          <div className="flex space-x-3 justify-end px-3">
            <button
              onClick={closeModal}
              className="border border-blue-700 px-6 py-2 rounded-full bg-blue-700 text-white font-normal text-base "
            >
              {ButtonlabelTwo}
            </button>
            <button
              onClick={onClickButton}
              className="border border-blue-700 px-6 py-2 rounded-full bg-blue-700 text-white font-normal text-base"
            >
              {buttonlabel}
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ModalComponent;
