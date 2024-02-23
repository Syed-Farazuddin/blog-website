const express = require("express");

const blogRouter = express.Router();

const {
  fetchBlogs,
  createBlog,
  UpdateBlog,
  deleteBlog,
} = require("../controller/blog-controller");

blogRouter.get("/", fetchBlogs);

blogRouter.post("/add", createBlog);

blogRouter.put("/update/:id", UpdateBlog);

blogRouter.delete("/delete/:id", deleteBlog);

module.exports = blogRouter;
