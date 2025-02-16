/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaChevronDown, FaChevronRight, FaSpinner } from "react-icons/fa";
import { blogCategories } from "../../utils/variables";
import { usePostBlogMutation } from "../../store";
import toast from "react-hot-toast";
import { compressImage } from "../../utils/functions";

function CreateBlog() {
  const [image, setImage] = useState({
    localUrl: "",
    remoteUrl: "",
    file: null,
  });

  const [postBlog, { isLoading }] = usePostBlogMutation();
  const [isOpen, setIsOpen] = useState(false);

  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    category: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      blogData.title === "" ||
      blogData.content === "" ||
      blogData.category === "" ||
      image.file === null
    ) {
      return toast.error("all fields are required !");
    }

    const formData = new FormData();

    formData.append("title", blogData.title);
    formData.append("content", blogData.content);
    formData.append("category", blogData.category);

    // compress image

    const compressedImage = await compressImage(image.file);

    if (!compressedImage)
      return toast.error("image error, select different image");

    // compressed image added to form

    formData.append("photo", compressedImage);

    try {
      const res = await postBlog(formData);
      if (res.data) {
        toast.success("Blog created Successfully");
        // reset form states
        setBlogData({ title: "", content: "", category: "" });
        setImage((prevValue) => {
          return { ...prevValue, file: null };
        });
      }
    } catch (error) {
      toast.error("Error occured creating the blog.");
      console.log(error);
    }
  };

  const handleImageChange = (e) => {
    const choosenFile = e.target.files[0];

    if (choosenFile) {
      const img = URL.createObjectURL(choosenFile);
      setImage((prevValue) => {
        return {
          ...prevValue,
          file: choosenFile,
          localUrl: img,
        };
      });
    } else {
      setImage((prevValue) => {
        return {
          ...prevValue,
          file: "",
          localUrl: "",
        };
      });
    }
  };

  const handleSelect = (category) => {
    setBlogData((prevValue) => {
      return { ...prevValue, category };
    });
  };

  return (
    <>
      <div className="flex flex-col gap-12 py-4 sm:w-11/12 w-screen mx-auto">
        <div className="sm:w-1/2 h-72 w-full mx-auto bg-black rounded-lg">
          <img
            className="h-full w-full object-contain"
            src={
              image.localUrl
                ? image.localUrl
                : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
            }
          />
        </div>

        <div className="flex gap-4 w-fit sm:mx-auto sm:flex-row flex-col sm:px-0 px-4">
          <h1 className="md:text-xl text-gray-700">
            {image.file ? <>Change Image :</> : <>Select an image:</>}
          </h1>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              handleImageChange(e);
            }}
          />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-12">
          <div className="flex items-center gap-4 sm:w-1/2 w-full sm:mx-auto sm:px-0 px-4">
            <label className="font-extrabold text-3xl">Title:</label>

            <input
              type="text"
              required
              placeholder="Add Title"
              id="title"
              className="w-96 p-4 border-2 outline-none rounded-lg"
              value={blogData.title}
              onChange={(e) => {
                setBlogData((prevValue) => {
                  return { ...prevValue, title: e.target.value };
                });
              }}
            />
          </div>

          <div className="flex items-center relative gap-2 py-4">
            <h1 className="sm:w-1/2 w-full sm:mx-auto sm:text-2xl sm:px-0 px-4 font-extrabold text-gray-700">
              Category :
            </h1>
            <div
              className="py-4 px-2 border-2 rounded-lg absolute left-1/2 -translate-x-1/2 top-0 gap-4 flex flex-col w-64 bg-slate-50"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <div className="flex gap-4 justify-between items-center mx-2 cursor-pointer">
                {blogData.category ? blogData.category : <>select a category</>}
                {isOpen ? <FaChevronDown /> : <FaChevronRight />}
              </div>
              {isOpen ? (
                <div className="flex flex-col mt-4 border-2 ">
                  {blogCategories.map((item) => {
                    return (
                      <div key={item.id}>
                        <div
                          onClick={() => handleSelect(item.category)}
                          className="p-2 border-1  hover:bg-slate-100 cursor-pointer"
                        >
                          {item.category}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex sm:w-1/2 w-full sm:mx-auto sm:px-0 px-4 flex-col gap-4">
            <label className="font-extrabold text-3xl">Content:</label>
            <textarea
              rows={8}
              className="border-2 p-4 outline-none rounded-lg"
              value={blogData.content}
              onChange={(e) => {
                setBlogData((prevValue) => {
                  return { ...prevValue, content: e.target.value };
                });
              }}
            ></textarea>
          </div>

          <div className="sm:px-0 px-4">
            <button
              type="submit"
              className="bg-blue-700 p-4 flex justify-center items-center sm:mx-auto text-white text-xl  w-28 uppercase rounded-lg"
            >
              {isLoading ? <FaSpinner className="animate-spin" /> : <>Post</>}
            </button>
          </div>
        </form>
      </div>
      <footer className="flex justify-center items-center h-48 bg-black text-white">
        Footer
      </footer>
    </>
  );
}

export default CreateBlog;
