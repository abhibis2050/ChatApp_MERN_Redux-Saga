import { useState } from "react";
import ModalComponent from "./Modal";
import { useSelector } from "react-redux";
import moment from "moment";

const MyProfile = () => {
  const [openAddBlogModal, setOpenAddBlogModal] = useState(false);
  const { myBlogs } = useSelector((state) => state.blog);
  return (
    <>
      <ModalComponent
        isAddBlog={true}
        label={"Add Blog"}
        openModal={openAddBlogModal}
        closeModal={() => {
          setOpenAddBlogModal(false);
        }}
        ButtonlabelTwo={"Cancel"}
        buttonlabel={"Save"}
        onClickButtonTwo={() => {
          setOpenAddBlogModal(false);
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
          {myBlogs?.map((singleBlog) => {
            {
              /* console.log(singleBlog) */
            }
            return (
              <>
                <div className="space-y-3 bg-white px-5 py-3 h-full rounded-3xl overflow-auto">
                  <div className="flex justify-between">
                   <div>
                   <div className="text-3xl font-bold"> {singleBlog?.title.toUpperCase()}</div>
                   <div className="mt-2"> {`Category : ${singleBlog?.category.toUpperCase()}`}</div>
                   <div>{`published on ${moment(singleBlog?.updatedAt).format('LLLL')}`}</div>
                   </div>
                   <div>edit</div>
                  </div>
                  <div className="px-28">
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
    </>
  );
};

export default MyProfile;
