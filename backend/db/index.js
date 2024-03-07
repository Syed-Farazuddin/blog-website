const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/blog")
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((e) => {
    console.log(e);
  });
