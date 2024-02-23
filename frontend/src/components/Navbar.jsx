import React, { useContext, useState } from "react";
import { FaHome, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context";
function Navbar() {
  const { setIsEdit, setFormData } = useContext(GlobalContext);
  return (
    <div className="bg-emerald-400  text-purple-800 p-2 flex items-center justify-between">
      <Link to={"/"}>
        <h1 className="font-extrabold font-serif p-2 text-black text-3xl">
          Blogger World
        </h1>
      </Link>
      <ul className="flex items-center justify-around gap-10">
        <Link to={"/"}>
          <li className="text-lg flex items-center gap-2 ">
            <span className="bg-white rounded-full p-2 text-black hover:text-purple-800">
              <FaHome />
            </span>
          </li>
        </Link>
        <Link
          onClick={() => {
            setIsEdit(true);
            setFormData({
              title: " ",
              description: " ",
            });
          }}
          to={"/addblog"}
        >
          <li className="text-lg flex items-center gap-2 ">
            <span className="bg-white rounded-full p-2 text-black hover:text-purple-800">
              <FaPlus />
            </span>
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default Navbar;
