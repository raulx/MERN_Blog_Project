/* eslint-disable react/prop-types */
import { useState } from "react";
import { usePostImageMutation, usePostBlogMutation } from "../../../store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

const presetKey = import.meta.env.VITE_CLOUDINARY_PRESET;

function CreateBlog() {
  const [postImage] = usePostImageMutation();
  const [postBlog, postBlogResults] = usePostBlogMutation();
  const navigate = useNavigate();
  const [image, setImage] = useState({
    localUrl: "",
    remoteUrl: "",
    file: null,
  });
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    //default category to politics change it after integrating radix-ui
    category: "politics",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image.file);
    formData.append("upload_preset", presetKey);
    if (blogData.category === "") {
      toast.error("Choose a category !");
    } else if (image.file) {
      try {
        const res = await postImage(formData);
        const remoteImageUrl = res.data.secure_url;
        const imagePublicId = res.data.public_id;

        const data = {
          title: blogData.title,
          content: blogData.content,
          category: blogData.category,
          public_id: imagePublicId,
          remote_url: remoteImageUrl,
        };
        await postBlog(data);
        navigate("/");
      } catch (err) {
        console.log(`Error:${err}`);
      }
    } else {
      toast.error("Image not selected !");
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

  return (
    <div className="flex flex-col gap-4 mt-6 px-4">
      <div className="w-full h-96">
        <img
          className="w-full h-full"
          src={
            image.localUrl
              ? image.localUrl
              : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
          }
        />
      </div>
      <div className="flex justify-end px-4 uppercase gap-6 py-2 w-full items-center">
        <h1 className="md:text-xl text-gray-700">
          {image.file ? <>Change Image :</> : <>Select an image:</>}
        </h1>
        <input
          type="file"
          onChange={(e) => {
            handleImageChange(e);
          }}
        />
      </div>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col ">
          <div className="flex flex-col">
            <div>
              <label className="font-extrabold text-3xl">Title:</label>
              <input
                type="text"
                required
                placeholder="Add Title"
                id="title"
                className="w-96 p-4 border-2"
                value={blogData.title}
                onChange={(e) => {
                  setBlogData((prevValue) => {
                    return { ...prevValue, title: e.target.value };
                  });
                }}
              />
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-4">
            <label className="font-extrabold text-3xl">Content:</label>
            <textarea
              rows={20}
              className="border-2 p-4"
              value={blogData.content}
              onChange={(e) => {
                setBlogData((prevValue) => {
                  return { ...prevValue, content: e.target.value };
                });
              }}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-700 p-4 flex justify-center items-center text-white text-xl mt-10 w-28 uppercase rounded-lg"
          >
            {postBlogResults.isLoading ? (
              <FaSpinner className="animate-spin" />
            ) : (
              "Post"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBlog;
