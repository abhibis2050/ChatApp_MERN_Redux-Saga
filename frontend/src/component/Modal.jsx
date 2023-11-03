/* eslint-disable react/prop-types */
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  onClickButtonTwo,
  // adding Group
  isAddGroup,
  groupNameValue,
  groupNameChange,
  groupIconUploadChange,
  addGroupMemberChange,
  // logout
  isLoggedOut,
  // Adding Blog
  isAddBlog,
  titleValue,
  titleChange,
  descriptionValue,
  descriptionChange,
  categoryChange,
  fileUploadChange,

  // Edit Blog
  isEditBlog,
  editTitleValue,
  editTitleChange,
  editdescriptionValue,
  editdescriptionChange,
  editfileUploadChange,

  // Delete Blog
  isDeleteBlog,
  // Edit USer
  isEditUser,
  editFirstName,
  editFirstNameChange,
  editLastName,
  editLastNameChange,
  editFrom,
  editFromChange,
  editLiveIn,
  editLiveInChange,
  editDob,
  editDobChange,
  editRelationship,
  editRelationChange,
  editGender,
  editGenderChange,
  editAbout,
  editAboutChange,
  editWorkPlace,
  addWorkInputValue,
  changeSingleWorkPlace,
  editLanguage,
  addLanguagesInputValue,
  editLanguagesInputChange,
  editStudiedAt,
  addStudiedAt,
  editInstituteLocationChange,
  editInstituteNameChange,
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
                  <div className="text-xl w-36">Group Icon</div>
                  <input
                    type="file"
                    className="px-4 py-1 outline-none text-xl w-full rounded-xl"
                    onChange={groupIconUploadChange}
                  />
                </div>
                <div className="flex space-x-2 items-center">
                  <div className="text-xl w-36">Group Name</div>
                  <input
                    placeholder="Enter Group Name "
                    className="px-4 py-1 outline-none text-xl w-full rounded-xl"
                    value={groupNameValue}
                    onChange={groupNameChange}
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
                    onChange={addGroupMemberChange}
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
                  value={titleValue}
                  onChange={titleChange}
                />
              </div>
              <div className="flex space-x-2 items-center">
                <div className="text-xl w-36">Description </div>
                <textarea
                  placeholder="Enter Blog Description "
                  className="px-4 py-1 outline-none text-xl w-full rounded-xl"
                  value={descriptionValue}
                  onChange={descriptionChange}
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
                  onChange={categoryChange}
                />
              </div>

              <div className="flex items-center">
                <div className="text-xl w-32">Select Image</div>
                <input
                  type="file"
                  id="fileUpload"
                  onChange={fileUploadChange}
                />
              </div>
            </div>
          )}

          {isEditBlog && (
            <div className="space-y-3 px-4">
              <div className="flex space-x-2 items-center ">
                <div className="text-xl w-36">Title </div>
                <input
                  placeholder="Enter Blog Title "
                  className="px-4 py-1 outline-none text-xl w-full rounded-xl"
                  value={editTitleValue}
                  onChange={editTitleChange}
                />
              </div>
              <div className="flex space-x-2 items-center">
                <div className="text-xl w-36">Description </div>
                <textarea
                  placeholder="Enter Blog Description "
                  className="px-4 py-1 outline-none text-xl w-full rounded-xl"
                  value={editdescriptionValue}
                  onChange={editdescriptionChange}
                />
              </div>
              <div className="flex items-center">
                <div className="text-xl w-32">Edit Image</div>
                <input
                  type="file"
                  id="fileUpload"
                  onChange={editfileUploadChange}
                />
              </div>
            </div>
          )}

          {isDeleteBlog && (
            <>
              <div className="px-5 text-xl ">
                Are You Sure You Want to Delete The Blog?
              </div>
            </>
          )}

          {isEditUser && (
            <>
              <div className="px-2">
                <div className="bg-red-300 space-y-2">
                  <div className="text-2xl border-b-2 border-b-blue-700">
                    Basic
                  </div>
                  <div className="flex space-x-8">
                    <div className="flex space-x-2">
                      <h1 className="w-20">Firstname</h1>
                      <input
                        placeholder="Enter your First Name"
                        value={editFirstName}
                        onChange={editFirstNameChange}
                      />
                    </div>
                    <div>
                      <div className="flex space-x-2">
                        <h1 className="w-20">Lastname</h1>
                        <input
                          placeholder="Enter your Last Name"
                          value={editLastName}
                          onChange={editLastNameChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-8">
                    <div className="flex space-x-2">
                      <h1 className="w-20">From</h1>
                      <input
                        placeholder="From"
                        value={editFrom}
                        onChange={editFromChange}
                      />
                    </div>
                    <div>
                      <div className="flex space-x-2">
                        <h1 className="w-20">Live In</h1>
                        <input
                          placeholder="Live In"
                          value={editLiveIn}
                          onChange={editLiveInChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-8">
                    <div className="flex space-x-2">
                      <h1 className="w-20">DOB</h1>
                      <input
                        placeholder="DOB"
                        value={editDob}
                        onChange={editDobChange}
                      />
                    </div>
                    <div>
                      <div className="flex space-x-s">
                        <h1 className="w-20">Relation</h1>
                        <input
                          placeholder="Relation"
                          value={editRelationship}
                          onChange={editRelationChange}
                        />
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <h1 className="w-20">Gender</h1>
                      <input
                        placeholder="Gender"
                        value={editGender}
                        onChange={editGenderChange}
                      />
                    </div>
                  </div>
                  <div className="flex space-x-8">
                    <div className="flex space-x-2 w-full">
                      <h1 className="w-20 mr-2">About</h1>
                      <textArea
                        placeholder="Enter About yourself"
                        className="w-full outline-none"
                        value={editAbout}
                        onChange={editAboutChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-purple-500 space-x-2 flex justify-between">
                  <div className="bg-yellow-200 w-[65%]">
                    <div className="flex justify-between text-2xl border-b-2 border-b-blue-700">
                      <h1> Work Place</h1>
                      <div
                        className="px-1 bg-white cursor-pointer"
                        onClick={addWorkInputValue}
                      >
                        <FontAwesomeIcon icon={faAdd} />
                      </div>
                    </div>
                    <div>
                      <div className="space-y-3">
                        {editWorkPlace?.map((singleWorkPlace, index) => {
                          {
                            /* console.log(singleWorkPlace,"index-------------->",index) */
                          }
                          return (
                            <>
                              <div className="flex space-x-2 w-full">
                                <div>Worked At </div>
                                <input
                                  value={singleWorkPlace}
                                  onChange={(e) => {
                                    changeSingleWorkPlace(e, index);
                                  }}
                                />
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="bg-yellow-200 w-[34%]">
                    <div className="flex justify-between text-2xl border-b-2 border-b-blue-700">
                      <h1> Language</h1>
                      <div
                        className="px-1 bg-white cursor-pointer"
                        onClick={addLanguagesInputValue}
                      >
                        <FontAwesomeIcon icon={faAdd} />
                      </div>
                    </div>
                    <div>
                      <div className="space-y-3">
                        {editLanguage?.map((singleLanguage, index) => {
                          return (
                            <>
                              <div className="flex space-x-2 w-full">
                                <input
                                  value={singleLanguage}
                                  onChange={(e) => {
                                    editLanguagesInputChange(e, index);
                                  }}
                                />
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-orange-400">
                  <div className="flex justify-between text-2xl border-b-2 border-b-blue-700">
                    <div>Education</div>
                    <div
                      className="px-1 bg-white cursor-pointer"
                      onClick={addStudiedAt}
                    >
                      <FontAwesomeIcon icon={faAdd} />
                    </div>
                  </div>
                  <div className="">
                    {editStudiedAt?.map((singleStudiedAt, index) => {
                      console.log(singleStudiedAt);
                      return (
                        <div
                          key={singleStudiedAt?._id}
                          className="flex justify-between"
                        >
                          <div className="bg-yellow-200 flex space-x-2 w-[65%]">
                            <h1>Institute</h1>
                            <input
                              placeholder="Add Insitute Name"
                              value={singleStudiedAt?.instituteName}
                              onChange={(e) => {
                                editInstituteNameChange(e, index);
                              }}
                            />
                          </div>
                          <div className="flex space-x-2 w-[35%] bg-yellow-200">
                            <h1>Located At</h1>
                            <input
                              placeholder="Add Insitute Location"
                              value={singleStudiedAt?.locatedAt}
                              onChange={(e) => {
                                editInstituteLocationChange(e, index);
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
          {isLoggedOut && (
            <>
              <div className="px-5 text-xl ">
                Are You Sure You Want to Logout?
              </div>
            </>
          )}

          <div className="flex space-x-3 justify-end px-3">
            <button
              onClick={onClickButtonTwo}
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
