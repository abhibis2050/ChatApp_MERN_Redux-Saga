import React from "react";
import Modal from "react-modal";

const ModalComponent = ({
  isAddGroup,
  label,
  openModal,
  closeModal,
  buttonlabel,
  onClickButton,
}) => {
  return (
    <div>
      {isAddGroup && (
        <div>
          <Modal
            className=" bg-white absolute top-[45%] left-1/2 right-auto bottom-auto px-6 py-3 "
            isOpen={openModal}
            // onRequestClose={closeModal}
            contentLabel="Examp Modal"
          >
            <div className="bg-bluebase text-white text-xl">{label}</div>
            <div>Add Group Content</div>
            <div className="flex space-x-3 justify-end">
              <button onClick={closeModal}>close</button>
              <button onClick={onClickButton}>{buttonlabel}</button>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default ModalComponent;
