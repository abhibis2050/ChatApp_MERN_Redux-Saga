const Blog = require("../models/Blog");
const User = require("../models/user");
const ObjectId = require("mongodb").ObjectId;
const cloudinary = require("cloudinary");

exports.createBlog = async (req, res) => {
  try {
    console.log("blog controller create-->", req.user);
    let blogingPictureFile;

    if (req.files) {
      if (req.files.BlogImage) {
        blogingPictureFile = await cloudinary.v2.uploader.upload(
          req.files.BlogImage.tempFilePath,
          { folder: "Blog_Images" }
        );
      }
      console.log("blogingPictureFile", blogingPictureFile);
    }

    const blogingImage = blogingPictureFile && {
      id: blogingPictureFile.public_id,
      secure_url: blogingPictureFile.secure_url,
    };

    req.body.image = blogingImage ? blogingImage : "";

    console.log(req.body);

    const createdBlog = await Blog.create(req.body);

    await Blog.findOneAndUpdate(
      { _id: createdBlog._id },
      { user: new ObjectId(req.user._id) }
    );
    await User.findOneAndUpdate(
      { _id: req.user.id },
      { blog: createdBlog._id }
    );
    return res.status(201).send({
      status: true,
      message: "Blog created succefully",
      data: createdBlog,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

// Get my blogs
exports.getMyBlog = async (req, res) => {
  try {
    const findBlog = await Blog.find({ user: new ObjectId(req.user._id) });
    if (!findBlog) {
      return res.status(400).send({ status: false, message: "Blog Not Found" });
    }

    return res.status(200).send({
      status: true,
      message: "Blog Fetched succefully",
      data: findBlog,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

// Get All Blogs Based On Category
exports.getBlogOnCategory = async (req, res) => {
  try {
    const { category } = req.query;
    const findBlogs = await Blog.find({ category: category });
    console.log(findBlogs);
    if (findBlogs == []) {
      return res
        .status(401)
        .send({ status: false, message: "Blogs Not Found" });
    }

    return res.status(200).send({
      status: true,
      message: "Blogs Fetched succefully",
      data: findBlogs,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const { userId } = req.query;
    const findBlogs = await Blog.find({ user: userId });
    if (!findBlogs) {
      return res
        .status(401)
        .send({ status: false, message: "Blogs Not Found" });
    }

    return res.status(200).send({
      status: true,
      message: "Blogs Fetched succefully",
      data: findBlogs,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blogDelete = await Blog.findByIdAndRemove({ _id: req.query.blogId });
    if (!blogDelete) {
      return res
        .status(401)
        .send({ status: false, message: "Blogs Not Found" });
    }
    return res.status(200).send({
      status: true,
      message: "Blog deleted succefully",
      data: blogDelete,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

// comments

exports.addComments = async (req, res) => {
  try {
    const { commentedToId } = req.query;
    const { comment } = req.body;

    const updateComment = await Blog.findOneAndUpdate(
      { _id: commentedToId },
      { $push: { comments: comment } }
    );

    return res.status(200).send({
      status: true,
      message: "Blog deleted succefully",
      data: updateComment,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};



exports.editMyBlog=async(req,res)=>{
  try {
    let blogEditImageFile;
    const{blogId} = req.query
 

    if(req.files){
      if(req.files.BlogImage){
        console.log(req.files.BlogImage)
        blogEditImageFile = await cloudinary.v2.uploader.upload(
          req.files.BlogImage.tempFilePath,
          { folder: "Blog_Images" }
        )
      }
    }

    const blogingImage = blogEditImageFile && {
      id: blogEditImageFile.public_id,
      secure_url: blogEditImageFile.secure_url,
    };

    req.body.image = blogingImage ? blogingImage : "";

    const updateBlog = await Blog.findOneAndUpdate({_id:blogId},req.body,{new:true})
    return res.status(200).send({
      status: true,
      message: "Blog Updated succefully",
      data: updateBlog,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
}
