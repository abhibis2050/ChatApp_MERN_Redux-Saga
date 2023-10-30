import { useSelector } from "react-redux";
import ContactImage from "../assets/contact.png";
import moment from "moment";
import noPost from "../assets/no_post.jpg";

const ContactProfile = () => {
  const { selectedContact } = useSelector((state) => state.user);
  const { singleContactBlogs } = useSelector((state) => state.blog);
  console.log(singleContactBlogs);
  return (
    <>
      <div className="h-full bg-white space-y-2 rounded-3xl p-2">
        {selectedContact === null ? (
          <div className="h-full flex justify-center">
            <img src={ContactImage} className="h-full" />
          </div>
        ) : (
          <>
            <div className="bg-blue-200 rounded-3xl h-[9%] flex justify-between px-4 items-center">
              <div>other details</div>
              <div>
                <div>buttons</div>
              </div>
            </div>
            <div className="rounded-3xl h-[90%]">
              {singleContactBlogs.length===0 ? (
                <div className="rounded-3xl h-full">
                  <img src={noPost} className=""/>
                </div>
              ) : (
                <>
                  {singleContactBlogs?.map((singleBlog) => {
                    return (
                      <>
                        <div className="space-y-3 bg-white px-5 py-3 h-full rounded-3xl overflow-auto">
                          <div className="flex justify-between">
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
                          <div className="text-xl">
                            {singleBlog?.description}
                          </div>
                        </div>
                      </>
                    );
                  })}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ContactProfile;
