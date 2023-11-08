/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FaTag, FaEye } from "react-icons/fa";
import classNames from "classnames";
import Avatar from "@mui/material/Avatar";

function Card({ cardData }) {
  const category = cardData.category;

  const classes = classNames(
    "rounded bg-gray-200 px-4 py-1 w-4/5  mt-4 flex justify-start uppercase text-white rounded-3xl items-center gap-4",
    {
      "bg-red-900": category === "food",
      "bg-orange-400": category === "fashion & lifestyle",
      "bg-violet-900": category === "travel",
      "bg-green-600": category === "music",
      "bg-yellow-500": category === "science & technology",
      "bg-teal-900": category === "sports",
      "bg-lime-600": category === "finance & bussiness",
      "bg-slate-400": category === "politics",
    }
  );

  return (
    <>
      <div className="md:w-96  w-full h-[48rem] border-2 rounded-lg  shadow-lg">
        <img
          src={cardData.image.remote_url}
          className="w-full h-1/2 object-cover object-center "
        />
        <div className="flex flex-col p-4 gap-2 h-full">
          <div className="flex justify-between items-end">
            <div className={classes}>
              <FaTag />
              {cardData.category}
            </div>

            <div className="flex gap-2 items-center ">
              <FaEye />
              <>{cardData.views}</>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-4">
            <h1 className=" font-extrabold text-2xl capitalize my-2">
              {cardData.title}
            </h1>
            <p className="w-full overflow-hidden">
              {cardData.content.substring(0, 150)}...
              <Link
                to={`/blog/?authorId=${cardData.created_by.id}&blogId=${cardData._id}`}
                className="text-blue-700 font-bold"
              >
                Read More
              </Link>
            </p>
          </div>

          <div className="flex gap-4 mt-6">
            <Avatar
              alt="creator-image"
              src={cardData.created_by.profile_pic}
              className="border-2 "
            />
            <div>
              <div className="capitalize font-extrabold">
                {cardData.created_by.name}
              </div>
              <div>{cardData.createdAt}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
