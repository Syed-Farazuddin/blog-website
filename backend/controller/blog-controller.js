const mongoose = require("mongoose");

const Blog = require("../model/Blog");

// Fetch blogs

const fetchBlogs = async (req, res) => {
  let blogList;
  try {
    blogList = await Blog.find();
  } catch (e) {
    console.log(e);
  }

  if (!blogList) {
    return res.status(404).json({ message: "No Blogs found" });
  }

  return res.status(200).json({ blogList });
};

// Add blogs

const createBlog = async (req, res) => {
  console.log("Got a request to create a blog");
  const { title, description } = req.body;
  console.log(title, description);
  const currentDate = new date();
  res.json({ title, description, currentDate });
  // const newBlog = new Blog({
  //   title,
  //   description,
  //   date: currentDate,
  // });
  // try {
  //   await newBlog.save();
  // } catch (e) {
  //   console.log(e);
  // }
  // try {
  //   const session = await mongoose.startSession();
  //   session.startTransaction();
  //   await newBlog.save(session);
  //   session.commitTransaction();
  // } catch (e) {
  //   return res.send(500).json({ message: e });
  // }
  // return res.status(200).json({ newBlog });
};

// Delete blogs

const deleteBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const findCurrBlog = await Blog.findByIdAndDelete(id);
    if (!findCurrBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({ message: "Successfully deleted" });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ message: "Unable to delete! Please try again" });
  }
};

// Update a blog

const UpdateBlog = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  let currBlogToUpdate;
  try {
    currBlogToUpdate = await Blog.findByIdAndUpdate(id, { title, description });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      Message: "Something went wrong while Updating! Please try again",
    });
  }
  if (!currBlogToUpdate) {
    return res.status(500).json({ message: "Unable to update" });
  }
  return res.send(200).json({ currBlogToUpdate });
};

module.exports = { fetchBlogs, createBlog, UpdateBlog, deleteBlog };
