import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetBlogsQuery } from "../store/api/blogApi";
import { addBlog, addPage } from "../store";
import { useEffect, useState } from "react";
import Card from "../components/card";
import CardSkeleton from "../components/cardSkeleton";
import { FaFilter, FaChevronLeft, FaChevronDown } from "react-icons/fa";
import { categoryLinks } from "../router/router";
import { Link } from "react-router-dom";

function Blogs() {
  const [filterNav, setFilterNav] = useState({
    isOpen: false,
    currentCategory: "all",
  });
  const { blogs, currentPage, pageSize } = useSelector((state) => {
    return state.blogs;
  });
  const { data, isFetching } = useGetBlogsQuery({
    page: currentPage,
    pageSize: pageSize,
  });
  const dispatch = useDispatch();
  const { type } = useParams();

  useEffect(() => {
    if (data) {
      dispatch(addBlog(data));
    }
  }, [data, dispatch]);

  const handleAddMoreData = () => {
    dispatch(addPage());
  };

  let blogData = blogs;

  if (type != "all") {
    blogData = blogData.filter((blog) => {
      return blog.category === type;
    });
  }
  const handleClick = (e) => {
    const categoryChoosen = e.target.innerText;
    setFilterNav((prevValue) => {
      return {
        ...prevValue,
        currentCategory: categoryChoosen.toLowerCase(),
        isOpen: !prevValue,
      };
    });
  };
  return (
    <div className="w-full h-full flex flex-col gap-8 p-4 relative">
      {filterNav.isOpen ? (
        <div className="border shadow-xl p-2 bg-slate-100 rounded-lg flex flex-col gap-2 absolute z-10 right-20 top-20 w-96">
          {categoryLinks.map((category) => {
            return (
              <Link
                to={category.url}
                className={`text-xl capitalize w-full h-full cursor-pointer py-2 px-4 rounded-xl  ${
                  category.category === filterNav.currentCategory
                    ? "bg-slate-600 text-white"
                    : "hover:bg-slate-500 hover:text-white"
                }`}
                key={category.category}
                onClick={(e) => handleClick(e)}
              >
                {category.category}
              </Link>
            );
          })}
        </div>
      ) : null}

      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-gray-400 font-extrabold uppercase">
          Results
        </h1>
        <div
          className="flex gap-6 items-center cursor-pointer mr-10 "
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

          <div className="h-full border-2 w-72 rounded py-2 px-4 text-lg uppercase flex items-center justify-between">
            <p>{filterNav.currentCategory}</p>
            <div>
              {filterNav.isOpen ? <FaChevronDown /> : <FaChevronLeft />}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap w-full gap-4 ">
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
