import React, { useContext, useEffect } from "react";
import axios from "axios";
import { GlobalContext } from "../context";
import { useNavigate, useLocation } from "react-router-dom";

function AddBlog() {
  const location = useLocation();
  const navigate = useNavigate();

  const { formData, setFormData, isEdit, setIsEdit } =
    useContext(GlobalContext);

  const handleSubmit = async () => {
    const response = isEdit
      ? await axios.post("http://localhost:4000/api/blogs/add", {
          title: formData?.title,
          description: formData?.description,
        })
      : axios.put(
          `http://localhost:4000/api/blogs/update/${location?.state?._id}`,
          {
            title: formData.title,
            description: formData.description,
          }
        );
    const result = await response.data;
    console.log(result);
    if (result) {
      setIsEdit(false);
      setFormData({
        title: "",
        description: "",
      });
      navigate("/");
    }
  };

  useEffect(() => {
    console.log(location);
    // setIsEdit(true);
    console.log(isEdit);
    setFormData({
      title: location?.state?.title,
      description: location?.state?.description,
    });
  }, []);
  // f0fdf4,c6f6d5,9ae6b4,6ed8a4,48c9a3
  return (
    <div className="bg-emerald-50 flex justify-center items-center min-h-[88vh]">
      {/* <!-- component --> */}
      <div className="relative mt-12 w-full max-w-lg sm:mt-10">
        <div className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-sky-700 to-transparent"></div>
        <div className="mx-5 border dark:border-b-slate-500 dark:border-slate-400 border-slate-400 sm:border-t-slate-200 shadow-[20px_0_20px_20px] shadow-slate-500/10 dark:shadow-white/20 rounded-lg border-white/20 border-l-slate-200 border-r-slate-200 sm:shadow-sm lg:rounded-xl lg:shadow-none">
          <div className="flex flex-col p-6">
            <h3 className="text-xl font-bold font-serif text-[#1bb46a]">
              {isEdit ? "Create a new blog" : "Update your blog"}
            </h3>
            <p className="mt-1.5 text-sm font-medium text-slate-500">
              Hello user, Input ur title and description to{" "}
              {isEdit ? "create a new blog" : "update your blog"}
            </p>
          </div>
          <div className="p-6 pt-0">
            <form>
              <div>
                <div>
                  <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter your title"
                      className="block w-full border-0 bg-transparent p-1 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                      value={formData.title}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          title: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div>
                  <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div className="flex items-center">
                      <textarea
                        type="text"
                        rows={"5"}
                        name="text"
                        className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground"
                        placeholder="Enter your description"
                        value={formData.description}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-end gap-x-2">
                <button
                  className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-emerald-600 text-white h-10 px-4 py-2"
                  type="submit"
                  onClick={(event) => {
                    event.preventDefault();
                    handleSubmit();
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBlog;
