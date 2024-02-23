import React from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
function BlogCard({ id, title, description }) {
  async function handleDelete(id) {
    console.log(id);
    const response = await axios.delete(
      `http://localhost:4000/api/blogs/delete/${id}`
    );
    const result = await response.data;
    console.log(result);
  }
  async function handleUpdate(id) {
    console.log(id);
  }

  return (
    <div className="bg-white w-[350px] flex flex-col justify-start items-center p-4 gap-2 relative">
      <div className="flex justify-start items-center gap-10">
        <h1 className="text-emerald-700 text-xl font-bold font-serif">
          {title}
        </h1>
        <ul className="flex justify-center items-center  gap-4">
          <button
            onClick={() => {
              handleUpdate(id);
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
  );
}

export default BlogCard;
