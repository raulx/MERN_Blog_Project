/* eslint-disable react/prop-types */
import { useState } from "react";
import { usePostImageMutation, usePostBlogMutation } from "../../../store";
import { Spinner } from "baseui/spinner";
import { nanoid } from "nanoid";
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import { blogCategories } from "../../../utils/variables";
import { useNavigate } from "react-router-dom";

const presetKey = import.meta.env.VITE_CLOUDINARY_PRESET;
function CreateBlog() {
  const [postImage] = usePostImageMutation();
  const [postBlog, postBlogResults] = usePostBlogMutation();
  const navigate = useNavigate();
  const { id } = JSON.parse(localStorage.getItem("user"));
  const [image, setImage] = useState({
    localUrl: "",
    remoteUrl: "",
    file: null,
  });
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    category: "science & technology",
  });
  function pad(number) {
    return number < 10 ? "0" + number : number;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image.file);
    formData.append("upload_preset", presetKey);

    try {
      const res = await postImage(formData);
      const remoteImageUrl = res.data.secure_url;
      const imagePublicId = res.data.public_id;
      const currentDate = new Date();
      let day = currentDate.getDate();
      let month = currentDate.getMonth() + 1;
      let year = currentDate.getFullYear();
      var formattedDate = year + "-" + pad(month) + "-" + pad(day) + "";

      const data = {
        id: nanoid(),
        title: blogData.title,
        content: blogData.content,
        likes: 0,
        category: blogData.category,
        date: formattedDate,
        comments: [],
        creatorId: id,
        image: { publicId: imagePublicId, remote_url: remoteImageUrl },
      };
      await postBlog(data);
      navigate("/");
    } catch (err) {
      console.log(`Error:${err}`);
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
        <h1 className="text-xl text-gray-700 ">
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
          <div className="flex justify-between items-center">
            <div>
              <label className=" font-extrabold text-3xl">Title:</label>
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
            <div className="mr-10 font-extrabold">
              <FormControl variant="standard" sx={{ minWidth: 150, m: 1 }}>
                <InputLabel id="choose-category" className="uppercase text-2xl">
                  Choose Category
                </InputLabel>
                <Select
                  labelId="choose-category"
                  label="choose category"
                  value={blogData.category}
                  className="uppercase"
                  onChange={(e) => {
                    setBlogData((d) => {
                      return { ...d, category: e.target.value };
                    });
                  }}
                >
                  {blogCategories.map((d) => {
                    return (
                      <MenuItem
                        key={d.id}
                        value={d.category}
                        className="uppercase"
                      >
                        {d.category}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="mt-20 flex flex-col gap-4">
            <label className=" font-extrabold text-3xl">Content:</label>
            <textarea
              rows={20}
              className=" border-2 p-4"
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
            {postBlogResults.isLoading ? <Spinner /> : "Post"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBlog;
