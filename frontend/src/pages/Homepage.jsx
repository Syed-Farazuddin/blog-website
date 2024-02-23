import React, { useContext, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import { GlobalContext } from "../context";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();

  const { blogList, setBlogList, setIsEdit, loading, setLoading } =
    useContext(GlobalContext);

  const id = 21;
  console.log(blogList);

  const fetchBlogs = async () => {
    setLoading(true);
    const response = await axios.get("http://localhost:4000/api/blogs");
    const result = await response.data;
    console.log(result);
    setLoading(false);
    if (result && result.blogList && result.blogList.length) {
      setBlogList(result.blogList);
    }
  };

  async function handleDelete(id) {
    console.log(id);
    const response = await axios.delete(
      `http://localhost:4000/api/blogs/delete/${id}`
    );
    const result = await response.data;
    console.log(result);
    if (result?.message) {
      fetchBlogs();
    }
  }

  async function handleUpdate(id) {
    console.log(id);
    navigate("/addblog", { state: { title, description } });
  }

  const title = "blogs";
  const description =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dictaquaerat provident esse officiis excepturi laboriosam delectus ab atquasi maiores, minima mollitia recusandae cupiditate. Nobis quisquam,corrupti neque voluptates eum accusantium sunt a. Ipsam molestiae quoassumenda, saepctio consequatur debitis, ducimus dolore maxime error cumlaborum quidem, quibusdam libero obcaecati voluptatem nulla quod.";

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="p-10 flex justify-start items-start gap-10 bg-emerald-50 min-h-screen ">
      <div className="mt-10 flex flex-wrap gap-10 ">
        <div
          className="bg-white w-[350px] flex flex-col justify-start items-center p-4 gap-2 relative border-slate-300 border-2 "
          key={id}
        >
          <div className="flex justify-start items-center gap-10">
            <h1 className="text-emerald-700 text-xl font-bold font-serif">
              {title}
            </h1>
            <ul className="flex justify-center items-center  gap-4">
              <button
                onClick={(e) => {
                  setIsEdit(false);
                  handleUpdate(e.detail);
                }}
              >
                <li className="text-lg flex items-center gap-2">
                  <span className="bg-emerald-200  rounded-full p-2 text-black hover:text-white hover:bg-emerald-700 ">
                    <FaEdit />
                  </span>
                </li>
              </button>
              <button
                onClick={() => {
                  handleDelete(id);
                }}
              >
                <li className="text-lg flex items-center gap-2 ">
                  <span className="bg-emerald-200 rounded-full p-2 text-black hover:text-white hover:bg-emerald-700 ">
                    <FaTrash />
                  </span>
                </li>
              </button>
            </ul>
          </div>
          <p className="text-slate-700 font-[400]">{description}</p>
          <button className="bg-emerald-600 text-white p-2 font-bold font-serif rounded-lg self-end hover:bg-black mt-2">
            Read full blog
          </button>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
