import { useDispatch, useSelector } from "react-redux";
import Blank from "../assets/blank.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faC,
  faCake,
  faCamera,
  faCity,
  faEdit,
  faHeart,
  faHome,
  faLocation,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { setUserIcon } from "../redux/app/UserSlice";
import ModalComponent from "./Modal";

const Profile = () => {
  const { authUser } = useSelector((state) => state.auth);
  const [iconDilogBox, setIconDilogBox] = useState(false);
  const [openEditUserModal, setOpenEditUserModal] = useState(false);
  const dispatch = useDispatch();

  const [userEdit, setUserEdit] = useState({
    firstName: authUser.firstName || "",
    lastName: authUser.lastName || "",
    about: authUser.about || "",
    liveIn: authUser.liveIn || "",
    from: authUser.from || "",
    gender: authUser.gender || "",
    DOB: authUser.DOB || "",
    relationshipStatus: authUser.relationshipStatus || "",
    workPlace: authUser.workPlace || [],
    studiedAt: authUser.studiedAt || [],
    languages: authUser.languages || [],
  });

  console.log(userEdit);
  useEffect(() => {
    setUserEdit({
      ...userEdit,
      firstName: authUser.firstName,
      lastName: authUser.lastName,
      about: authUser.about,
      liveIn: authUser.liveIn,
      from: authUser.from,
      gender: authUser.gender,
      DOB: authUser.DOB,
      relationshipStatus: authUser.relationshipStatus,
      workPlace: authUser.workPlace,
      studiedAt: authUser.studiedAt,
      languages: authUser.languages,
    });
  }, [authUser]);

  const fileUploadHandler = (e) => {
    console.log("e---------->", e.target.files[0]);
    if (e.target.files && e.target.files.length > 0) {
      // const reader = new FileReader();
      // reader.readAsDataURL(e.target.files[0]);
      // reader.addEventListener("load", () => {
      //   console.log("result---------->", reader.result);
      //   setGroupIcon(reader.result)
      // });

      const selectedFile = e.target.files[0];
      if (selectedFile) {
        const reader = new FileReader();
        reader.onload = (event) => {
          dispatch(setUserIcon({ userIcon: event.target.result }));
        };
        reader.readAsDataURL(selectedFile);
      }
      setIconDilogBox(false);
    }
  };

  const handleEditUser = () => {};

  return (
    <div className="h-full space-y-2">
      <ModalComponent
        isEditUser={true}
        label={"Edit User Details"}
        openModal={openEditUserModal}
        closeModal={() => {
          setOpenEditUserModal(false);
        }}
        ButtonlabelTwo={"Cancel"}
        buttonlabel={"Save"}
        onClickButton={() => {
          handleEditUser();
        }}
        onClickButtonTwo={() => {
          setOpenEditUserModal(false);
        }}
        editFirstName={userEdit?.firstName}
        editFirstNameChange={(e) => {
          setUserEdit({ ...userEdit, firstName: e.target.value });
        }}
        editLastName={userEdit?.lastName}
        editLastNameChange={(e) => {
          setUserEdit({ ...userEdit, lastName: e.target.value });
        }}
        editFrom={userEdit?.from}
        editFromChange={(e) => {
          setUserEdit({ ...userEdit, from: e.target.value });
        }}
        editLiveIn={userEdit?.liveIn}
        editLiveInChange={(e) => {
          setUserEdit({ ...userEdit, liveIn: e.target.value });
        }}
        editDob={userEdit?.DOB}
        editDobChange={(e) => {
          setUserEdit({ ...userEdit, DOB: e.target.value });
        }}
        editRelationship={userEdit?.relationshipStatus}
        editRelationChange={(e) => {
          setUserEdit({ ...userEdit, relationshipStatus: e.target.value });
        }}
        editGender={userEdit?.gender}
        editGenderChange={(e) => {
          setUserEdit({ ...userEdit, gender: e.target.value });
        }}
        editAbout={userEdit?.about}
        editAboutChange={(e) => {
          setUserEdit({ ...userEdit, about: e.target.value });
        }}
        editWorkPlace={userEdit?.workPlace}
        addWorkInputValue={() => {
          const newWorkInputArray = [...userEdit.workPlace, ""];
          setUserEdit({ ...userEdit, workPlace: newWorkInputArray });
        }}
        changeSingleWorkPlace={(e, index) => {
          const newWorkInputArray = [...userEdit.workPlace];
          newWorkInputArray[index] = e.target.value;
          setUserEdit({ ...userEdit, workPlace: newWorkInputArray });
        }}
        editLanguage={userEdit?.languages}
        addLanguagesInputValue={() => {
          const newLangArr = [...userEdit.languages, ""];
          setUserEdit({ ...userEdit, languages: newLangArr });
        }}
        editLanguagesInputChange={(e, index) => {
          const newLangArr = [...userEdit.languages];
          newLangArr[index] = e.target.value;
          setUserEdit({ ...userEdit, languages: newLangArr });
        }}
        editStudiedAt={userEdit?.studiedAt}
        addStudiedAt={() => {
          const newLangArr = [...userEdit.studiedAt, {}];
          setUserEdit({ ...userEdit, studiedAt: newLangArr });
        }}
        editInstituteNameChange={(e, index) => {
          const instituteNameChangeArray = [...userEdit.studiedAt];
          instituteNameChangeArray[index].instituteName = e.target.value;
          setUserEdit({ ...userEdit, studiedAt: instituteNameChangeArray });
        }}
        editInstituteLocationChange={(e, index) => {
          const instituteNameChangeArray = [...userEdit.studiedAt];
          instituteNameChangeArray[index].locatedAt = e.target.value;
          setUserEdit({ ...userEdit, studiedAt: instituteNameChangeArray });
        }}
      />

      <div className=" rounded-3xl">
        <div className="flex flex-col justify-center items-center space-y-3 py-4 rounded-3xl">
          <div className="">
            <img
              className="rounded-full w-56 h-56 relative"
              src={
                authUser?.avatar?.secure_url
                  ? authUser?.avatar?.secure_url
                  : Blank
              }
            />
            <div className="absolute left-[370px] top-[230px]">
              <FontAwesomeIcon
                icon={faCamera}
                className="text-3xl text-white bg-bluebase px-2 py-2 rounded-full"
                onClick={() => {
                  setIconDilogBox(!iconDilogBox);
                }}
              />
              {iconDilogBox && (
                <div className="bg-blue-100 absolute text-lg  space-y-1 rounded-2xl left-9 top-8">
                  <h1 className="px-5 py-1 hover:bg-bluebase hover:text-white hover:rounded-2xl">
                    Remove
                  </h1>
                  <div className="px-5 py-1 hover:bg-bluebase hover:text-white hover:rounded-2xl">
                    <label>
                      <h1 htmlFor="fileUpload">Change</h1>
                      <input
                        type="file"
                        id="fileUpload"
                        className="hidden"
                        onChange={(e) => {
                          fileUploadHandler(e);
                        }}
                      />
                    </label>
                  </div>
                  <h1 className="px-5 py-1 hover:bg-bluebase hover:text-white hover:rounded-2xl">
                    View
                  </h1>
                </div>
              )}
            </div>
          </div>
          <div className="text-3xl font-semibold">
            {authUser
              ? `${authUser?.firstName}  ${authUser?.lastName}`
              : `User Not Found`}
          </div>
        </div>
      </div>
      <div className="px-2 py-1 space-y-3">
        <div className="text-2xl font-bold pb-1 flex justify-between">
          <h1>Details</h1>
          <div
            className="cursor-pointer"
            onClick={() => {
              setOpenEditUserModal(true);
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </div>
        </div>
        <div>
          <div>
            <div className="text-xl font-bold border-b-2 border-blue-200 pb-1">
              Basic Info
            </div>
            <ProfileDetailComponent
              icon={faAddressBook}
              label={`About`}
              result={authUser?.about}
            />
            <ProfileDetailComponent
              icon={faHeart}
              label={`Relationship`}
              result={authUser?.relationshipStatus}
            />
            <ProfileDetailComponent
              icon={faUser}
              label={`Gender`}
              result={authUser?.gender}
            />
            <ProfileDetailComponent
              icon={faCake}
              label={`Birthday`}
              result={authUser?.DOB}
            />
          </div>
          <div>
            <div className="text-xl font-bold border-b-2 border-blue-200 pb-1">
              Places Lived
            </div>
            <ProfileDetailComponent
              icon={faLocation}
              label={`From`}
              result={authUser?.from}
            />
            <ProfileDetailComponent
              icon={faHome}
              label={`Lives In`}
              result={authUser?.liveIn}
            />
          </div>
          <div>
            <div className="text-xl font-bold border-b-2 border-blue-200 pb-1">
              Work
            </div>

            {authUser?.workPlace?.map((work) => {
              return (
                <>
                  <ProfileDetailComponent
                    icon={faCity}
                    label={`Works At`}
                    result={work}
                  />
                </>
              );
            })}
          </div>
          <div>
            <div className="text-xl font-bold border-b-2 border-blue-200">
              Education
            </div>
            {authUser?.studiedAt?.map((study) => {
              return (
                <>
                  <ProfileDetailComponent
                    icon={faCity}
                    label={`Works At`}
                    result={study}
                  />
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

export const ProfileDetailComponent = ({ icon, label, result }) => {
  return (
    <div>
      <div className="flex space-x-2 text-lg px-2 py-1">
        <div className="text-gray-500">
          <FontAwesomeIcon icon={icon} />
        </div>
        <h1 className="">{label}</h1>
        <h1 className="font-bold">{result}</h1>
      </div>
    </div>
  );
};
