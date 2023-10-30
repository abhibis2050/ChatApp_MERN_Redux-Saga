import { useState } from "react";
import ModalComponent from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileEdit,
  faPen,
  faTrash,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";

const MyProfile = () => {
  const formData = new FormData();
  const dispatch = useDispatch();
  const [openAddBlogModal, setOpenAddBlogModal] = useState(false);
  const [openEditBlogModal, setOpenEditBlogModal] = useState(false);
  const { myBlogs } = useSelector((state) => state.blog);
  const { token } = useSelector((state) => state.auth);
  const [blogImage, setBlogImage] = useState();
  const [blogInput, setBlogInput] = useState({
    title: "",
    description: "",
    category: "",
  });

  // console.log("blogInput",blogInput)
  const handleAddBlog = () => {
    if (blogImage === undefined) {
      formData.append("title", blogInput?.title);
      formData.append("description", blogInput?.description);
      formData.append("category", blogInput?.category);
    } else {
      formData.append("title", blogInput?.title);
      formData.append("description", blogInput?.description);
      formData.append("category", blogInput?.category);
      formData.append("BlogImage", blogImage);
    }

    dispatch({
      type: "CREATE_BLOGS",
      payload: {
        body: formData,
        token: token,
      },
    });

    setOpenAddBlogModal(false);
    setBlogImage(undefined);
    setBlogInput({
      title: "",
      description: "",
      category: "",
    });
  };

  return (
    <>
      <ModalComponent
        isAddBlog={true}
        label={"Add Blog"}
        openModal={openAddBlogModal}
        closeModal={() => {
          setOpenAddBlogModal(false);
          setBlogInput({
            title: "",
            description: "",
            category: "",
          });
        }}
        ButtonlabelTwo={"Cancel"}
        buttonlabel={"Save"}
        onClickButton={() => {
          handleAddBlog();
        }}
        onClickButtonTwo={() => {
          setOpenAddBlogModal(false);
          setBlogInput({
            title: "",
            description: "",
            category: "",
          });
        }}
        titleValue={blogInput?.title}
        titleChange={(e) => {
          setBlogInput({ ...blogInput, title: e.target.value });
        }}
        descriptionValue={blogInput?.description}
        descriptionChange={(e) => {
          setBlogInput({ ...blogInput, description: e.target.value });
        }}
        categoryChange={(e) => {
          setBlogInput({ ...blogInput, category: e.value });
        }}
        fileUploadChange={(e) => {
          // console.log(e.target.files);
          setBlogImage(e.target.files[0]);
        }}
      />
      <div className="h-full rounded-3xl space-y-2">
        <div className="bg-white rounded-3xl h-[9%] flex justify-between px-2 items-center">
          <div></div>
          <div>
            <div
              className="bg-blue-700 text-white px-4 py-1 rounded-full cursor-pointer"
              onClick={() => {
                setOpenAddBlogModal(true);
              }}
            >
              Add Blogs
            </div>
          </div>
        </div>
        <div className="bg-white rounded-3xl h-[90%] space-y-3 p-4">
          <div className="space-y-10 h-full rounded-3xl overflow-auto">
            {myBlogs?.map((singleBlog) => {
              return (
                <>
                  <div className="space-y-3 px-5 py-3 h-fit rounded-3xl">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-3xl font-bold">
                          {" "}
                          {singleBlog?.title.toUpperCase()}
                        </div>
                        <div className="mt-2">
                          {" "}
                          {`Category : ${singleBlog?.category.toUpperCase()}`}
                        </div>
                        <div>{`published on ${moment(
                          singleBlog?.updatedAt
                        ).format("LLLL")}`}</div>
                      </div>
                      <div className="flex">
                        <div
                          className="text-2xl p-4"
                          onClick={() => {
                            setOpenEditBlogModal(true);
                          }}
                        >
                          <FontAwesomeIcon icon={faPen} className="text-green-600 cursor-pointer" />
                        </div>
                        <div
                          className="text-2xl p-4 cursor-pointer"
                          // onClick={() => {
                          //   setOpenEditBlogModal(true);
                          // }}
                        >
                          <FontAwesomeIcon icon={faTrash} className="text-red-600" />
                        </div>
                      </div>
                    </div>
                    <div className="px-28 flex justify-center">
                      <img
                        src={
                          singleBlog?.image?.secure_url
                            ? singleBlog?.image?.secure_url
                            : null
                        }
                      />
                    </div>
                    <div className="text-xl">{singleBlog?.description}</div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
