import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetBlogsQuery } from "../store/api/blogApi";
import { addBlog, addPage } from "../store";
import { useEffect, useState } from "react";
import Card from "../components/card";
import CardSkeleton from "../components/cardSkeleton";
import { FaFilter, FaChevronLeft, FaChevronDown, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const blogCategories = [
  { id: 1, category: "all" },
  { id: 2, category: "politics" },
  { id: 3, category: "sports" },
  {
    id: 4,
    category: "finance & bussiness",
  },
  { id: 5, category: "music" },
  { id: 6, category: "travel" },
  {
    id: 7,
    category: "fashion & lifestyle",
  },
  { id: 8, category: "health" },
  { category: "food" },
  {
    id: 9,
    category: "science & technology",
  },
];

function Blogs() {
  const { blogs, currentPage, pageSize } = useSelector((state) => {
    return state.blogs;
  });

  const { data, isFetching } = useGetBlogsQuery({
    page: currentPage,
    pageSize: pageSize,
  });
  const dispatch = useDispatch();
  const { type } = useParams();

  const [filterNav, setFilterNav] = useState({
    isOpen: false,
    currentCategory: "All",
  });

  useEffect(() => {
    if (data) {
      dispatch(addBlog(data));
    }
  }, [data, dispatch]);

  const handleAddMoreData = () => {
    dispatch(addPage());
  };

  let blogData = blogs;

  if (filterNav.currentCategory != "All") {
    blogData = blogData.filter((blog) => {
      return blog.category === filterNav.currentCategory;
    });
  }
  const handleClick = (e) => {
    const categoryChoosen = e.target.innerText;

    setFilterNav((prevValue) => {
      return {
        ...prevValue,
        currentCategory: categoryChoosen,
        isOpen: !prevValue,
      };
    });
  };
  return (
    <div className="w-full h-full flex flex-col p-4 relative">
      {filterNav.isOpen ? (
        <div className="border shadow-xl p-2 bg-slate-100 rounded-lg flex flex-col gap-2 absolute z-10 md:right-20 right-6 w-80 top-16 md:w-96">
          {blogCategories.map((d) => {
            return (
              <p
                className={`text-xl capitalize w-full h-full cursor-pointer py-2 px-4 rounded-xl  ${
                  d.category === filterNav.currentCategory.toLowerCase()
                    ? "bg-slate-600 text-white"
                    : "hover:bg-slate-500 hover:text-white"
                }`}
                key={d.id}
                onClick={(e) => handleClick(e)}
              >
                {d.category}
              </p>
            );
          })}
        </div>
      ) : null}
      <Link
        to={"/create"}
        className="uppercase md:mr-10 mr-6 text-center self-end flex items-center justify-center gap-4 bg-blue-500 hover:bg-blue-700 transition-all duration-200 rounded-lg text-white w-48 py-2"
      >
        <FaPlus />
        Create Blog
      </Link>
      <div className="flex justify-between items-center my-2">
        <h1 className="text-2xl text-gray-400 font-extrabold uppercase">
          Results
        </h1>
        <div
          className="flex md:gap-6 gap-0 items-center cursor-pointer mr-10 "
          onClick={() => {
            setFilterNav((prevValue) => {
              return { ...prevValue, isOpen: !prevValue.isOpen };
            });
          }}
        >
          <div className="flex gap-4 items-center p-2">
            <p className="text-2xl hidden md:block text-gray-400 font-extrabold uppercase">
              Sort By
            </p>
            <FaFilter className="text-2xl" />
          </div>

          <div className="h-full border-2 md:w-72 w-60 rounded py-2 px-4 md:text-lg text-base uppercase flex items-center justify-between">
            <p>{filterNav.currentCategory}</p>
            <div>
              {filterNav.isOpen ? <FaChevronDown /> : <FaChevronLeft />}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap w-full gap-4 mt-4">
        {blogData.map((blog) => {
          return <Card key={blog.id} cardData={blog} />;
        })}
        {type === "all" ? (
          <>
            {isFetching ? (
              <CardSkeleton times={pageSize} />
            ) : (
              <button onClick={handleAddMoreData}>Add more Data</button>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Blogs;
