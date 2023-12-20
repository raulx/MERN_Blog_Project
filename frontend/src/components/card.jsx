/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FaTag, FaEye } from "react-icons/fa";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { useDeleteBlogMutation } from "../store";
import { removeBlog } from "../store";
import { useDispatch } from "react-redux";
import { FaSync, FaTrash } from "react-icons/fa";
import { filterDate } from "../utils/functions";

function Card({ cardData }) {
  const category = cardData.category;
  const { userData } = useSelector((state) => {
    return state.user;
  });
  const [deleteBlog, results] = useDeleteBlogMutation();
  const dispatch = useDispatch();

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
      "bg-slate-600": category === "politics",
      "bg-purple-600": category === "health",
    }
  );

  const handleDelete = async () => {
    try {
      await deleteBlog(cardData._id);
    } catch (error) {
      console.log(error);
    }

    dispatch(removeBlog(cardData._id));
  };
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

          <div className="flex justify-between">
            <div className="flex gap-4 mt-6">
              <img
                alt="creator-image"
                src={cardData.created_by.profile_pic}
                className="border-2 w-16 h-12 "
              />
              <div>
                <div className="capitalize font-extrabold">
                  {cardData.created_by.name}
                </div>
                <div className=" font-bold text-gray-400">
                  {filterDate(cardData.createdAt)}
                </div>
              </div>
            </div>
            {userData._id === cardData.created_by.id ? (
              <>
                <div className="justify-center items-center flex gap-4 text-white">
                  <button
                    className="p-4 rounded  bg-red-600"
                    onClick={handleDelete}
                    disabled={results.isLoading}
                  >
                    {" "}
                    {results.isLoading ? (
                      <FaSync className="animate-spin" />
                    ) : (
                      <FaTrash />
                    )}
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
