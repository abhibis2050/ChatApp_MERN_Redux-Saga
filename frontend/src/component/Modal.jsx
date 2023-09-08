import React from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import Select from "react-select";

const ModalComponent = ({
  isAddGroup,
  label,
  openModal,
  closeModal,
  buttonlabel,
  onClickButton,
}) => {
  const { allContacts } = useSelector((state) => state.user);
  return (
    <div>
      {isAddGroup && (
        <div>
          <Modal
            className=" bg-blue-100 absolute top-[25%] left-[25%] right-auto bottom-auto px-6 py-3 space-y-4 w-[1000px]"
            isOpen={openModal}
            // onRequestClose={closeModal}
            contentLabel="Examp Modal"
          >
            <div className="bg-bluebase text-white text-2xl px-6 py-2">
              {label}
            </div>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <div className="text-xl">Group Name</div>
                <input
                  placeholder="Enter Group Name "
                  className="px-4 py-1 outline-none text-xl w-[87%]"
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
                  onChange={(e)=>{
                    
                  }
                  }
                />
              </div>
            </div>
            <div className="flex space-x-3 justify-end">
              <button
                onClick={closeModal}
                className="border border-blue-700 px-8 py-3 rounded-full bg-blue-700 text-white font-normal text-xl "
              >
                Close
              </button>
              <button
                onClick={onClickButton}
                className="border border-blue-700 px-8 py-3 rounded-full bg-blue-700 text-white font-normal text-xl"
              >
                {buttonlabel}
              </button>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default ModalComponent;
