const express = require("express");
const cors = require("cors");
const {
  fetchBlogs,
  UpdateBlog,
  deleteBlog,
  createBlog,
} = require("./controller/blog-controller");
// const blogRouter = require("./routes/blog-routes");

require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", fetchBlogs);
app.post("/add", createBlog);
app.delete("/delete/:id", deleteBlog);
app.post("/update/:id", UpdateBlog);
// app.use("api/v1", blogRouter);

app.listen(4000, () => {
  console.log("Server startedd on 4000");
});
