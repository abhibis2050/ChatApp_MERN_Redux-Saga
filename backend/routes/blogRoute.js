const express = require("express");

const router=express.Router()
const { createBlog, getMyBlog, deleteBlog, getBlogOnCategory, getBlogById, editMyBlog } = require("../controller/blogController");
const auth = require("../middlewares/auth");

router.route("/createBlog").post(auth,createBlog);
router.route("/getMyBlogs").get(auth,getMyBlog);
router.route("/getBlogOnCategory").get(getBlogOnCategory);
router.route("/getBlogById").get(getBlogById);
router.route("/remove").delete(deleteBlog);
router.route("/editMyBlog").patch(editMyBlog);

module.exports= router