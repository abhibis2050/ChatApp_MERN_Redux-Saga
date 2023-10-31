import { useEffect, useState } from "react";
import ModalComponent from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { setSelectBlogForAction } from "../redux/app/blogSlice";

const MyProfile = () => {
  const formData = new FormData();
  const dispatch = useDispatch();
  const [openAddBlogModal, setOpenAddBlogModal] = useState(false);
  const [openEditBlogModal, setOpenEditBlogModal] = useState(false);
  const [openDeleteBlogModal, setOpenDeleteBlogModal] = useState(false);
  const { myBlogs, selectedBlogForAction } = useSelector((state) => state.blog);
  const { token } = useSelector((state) => state.auth);
  const [blogImage, setBlogImage] = useState();
  const [editBlogImage, setEditBlogImage] = useState();
  const [blogInput, setBlogInput] = useState({
    title: "",
    description: "",
    category: "",
  });

  const [blogEdit, setBlogEdit] = useState({
    title: selectedBlogForAction?.title,
    description: selectedBlogForAction?.description,
    image: selectedBlogForAction?.image,
  });

  useEffect(() => {
    setBlogEdit({
      ...blogEdit,
      title: selectedBlogForAction?.title,
      description: selectedBlogForAction?.description,
      image: selectedBlogForAction?.image,
    });
  }, [selectedBlogForAction]);

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

  const handleEditBlog = () => {
    if (editBlogImage === undefined) {
      formData.append("title", blogEdit?.title);
      formData.append("description", blogEdit?.description);
      formData.append("image", blogEdit?.image);
    } else {
      formData.append("title", blogEdit?.title);
      formData.append("description", blogEdit?.description);
      formData.append("BlogImage", editBlogImage);
    }

    dispatch({
      type: "EDIT_MY_BLOGS",
      payload: {
        body: formData,
        blogId: selectedBlogForAction?._id,
      },
    });
    setOpenEditBlogModal(false);
    setEditBlogImage(undefined);
    dispatch(setSelectBlogForAction({ selectedBlogForAction: null }));
  };

  const handleDeleteBlog = () => {
    dispatch({
      type: "DELETE_MY_BLOGS",
      payload: {
        blogId: selectedBlogForAction?._id,
      },
    });
    setOpenDeleteBlogModal(false);
    dispatch(setSelectBlogForAction({ selectedBlogForAction: null }));
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
          setBlogImage(e.target.files[0]);
        }}
      />

      <ModalComponent
        isEditBlog={true}
        label={"Edit Blog"}
        openModal={openEditBlogModal}
        closeModal={() => {
          setOpenEditBlogModal(false);
          dispatch(setSelectBlogForAction({ selectedBlogForAction: null }));
        }}
        ButtonlabelTwo={"Cancel"}
        buttonlabel={"Save"}
        onClickButton={() => {
          handleEditBlog();
        }}
        onClickButtonTwo={() => {
          setOpenEditBlogModal(false);
          dispatch(setSelectBlogForAction({ selectedBlogForAction: null }));
        }}
        editTitleValue={blogEdit?.title}
        editdescriptionValue={blogEdit?.description}
        editTitleChange={(e) => {
          setBlogEdit({ ...blogEdit, title: e.target.value });
        }}
        editdescriptionChange={(e) => {
          setBlogEdit({ ...blogEdit, description: e.target.value });
        }}
        editfileUploadChange={(e) => {
          setEditBlogImage(e.target.files[0]);
        }}
      />

      <ModalComponent
        isDeleteBlog={true}
        label={"Delete Blog"}
        openModal={openDeleteBlogModal}
        closeModal={() => {
          setOpenDeleteBlogModal(false);
          dispatch(setSelectBlogForAction({ selectedBlogForAction: null }));
        }}
        ButtonlabelTwo={"Cancel"}
        buttonlabel={"Delete"}
        onClickButton={() => {
          handleDeleteBlog();
        }}
        onClickButtonTwo={() => {
          setOpenDeleteBlogModal(false);
          dispatch(setSelectBlogForAction({ selectedBlogForAction: null }));
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
                          {singleBlog?.title.toUpperCase()}
                        </div>
                        <div className="mt-2">
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
                            dispatch(
                              setSelectBlogForAction({
                                selectedBlogForAction: singleBlog,
                              })
                            );
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faPen}
                            className="text-green-600 cursor-pointer"
                          />
                        </div>
                        <div
                          className="text-2xl p-4 cursor-pointer"
                          onClick={() => {
                            setOpenDeleteBlogModal(true);
                            dispatch(
                              setSelectBlogForAction({
                                selectedBlogForAction: singleBlog,
                              })
                            );
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="text-red-600"
                          />
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
