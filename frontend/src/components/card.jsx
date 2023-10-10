/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FaTag } from "react-icons/fa";

function Card({ cardData }) {
  return (
    <>
      <div className="md:w-96 md:h-96 w-full h-96 border-2">
        <img
          src={cardData.imageUrl}
          className="w-full h-1/2 object-cover object-center rounded-lg"
        />
        <div className="flex flex-col p-4">
          <h1 className="font-bold text-2xl">{cardData.title}</h1>
          <p>
            {cardData.content.substring(0, 100)}...
            <Link to={"/blog"} className="text-blue-500">
              Read More
            </Link>
          </p>
          <p className="rounded bg-gray-200 py-2 px-4 w-2/3 mt-4 flex justify-start items-center gap-4">
            <FaTag />
            {cardData.category}
          </p>
        </div>
      </div>
    </>
  );
}

export default Card;
