import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
function Homepage() {
  const navigate = useNavigate();

  const { blogList, setFormData, setBlogList, setIsEdit, loading, setLoading } =
    useContext(GlobalContext);

  console.log("blogList", blogList);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:4000");
      const result = await response.data;
      console.log(result);
      setLoading(false);
      if (result && result.blogList && result.blogList.length) {
        setBlogList(result.blogList);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  async function handleDelete(id) {
    console.log(id);
    const response = await axios.delete(`http://localhost:4000/delete/${id}`);
    const result = await response.data;
    console.log(result);
    if (result?.message) {
      fetchBlogs();
    }
  }

  async function handleUpdate(item) {
    console.log(item._id);
    const title = item.title;
    const description = item.description;
    const id = item._id;
    navigate("/addblog", { state: { title, id, description } });
  }

  useEffect(() => {
    fetchBlogs();
  }, [handleDelete, handleUpdate]);

  return (
    <div className="p-10 flex justify-center items-center gap-10 bg-emerald-50 min-h-screen ">
      {loading ? (
        <>
          <RotatingLines
            visible={true}
            height="96"
            width="96"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </>
      ) : (
        <div className="mt-10 flex flex-wrap gap-10 ">
          {blogList.length > 0 ? (
            blogList.map((item) => (
              <div
                className="bg-white w-[350px] flex flex-col justify-start items-center p-4 gap-2 relative border-slate-300 border-2 "
                key={item._id}
              >
                <div className="flex justify-start items-center gap-10">
                  <h1 className="text-emerald-700 text-xl font-bold font-serif">
                    {item.title}
                  </h1>
                  <ul className="flex justify-center items-center  gap-4">
                    <button
                      onClick={(e) => {
                        setIsEdit(false);
                        handleUpdate(item);
                        console.log(e);
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
                        handleDelete(item._id);
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
                <p className="text-slate-700 font-[400]">{item.description}</p>
                <button className="bg-emerald-600 text-white p-2 font-bold font-serif rounded-lg self-end hover:bg-black mt-2">
                  Read full blog
                </button>
              </div>
            ))
          ) : (
            <>
              <div className="flex flex-col justify-center items-center gap-1 w-full h-full">
                <h1 className="text-2xl font-serif font-semibold">
                  There are no currently no Blogs
                </h1>
                <br />
                <Link
                  className="bg-red-400 text-black font-bold text-lg p-2 rounded-md cursor-pointer"
                  onClick={() => {
                    // navigate("/addblog");
                    setFormData({
                      title: " ",
                      description: " ",
                    });
                    setIsEdit(true);
                  }}
                  to={"/addblog"}
                >
                  Create your first Blog
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Homepage;
