import { useSelector, useDispatch } from "react-redux";
import { useGetBlogsQuery } from "../../../store";
import { useState, useEffect } from "react";
import { addBlog, setPrevData, addPage } from "../../../store";
import Card from "../../../components/card";
import CardSkeleton from "../../../components/cardSkeleton";
import { FaFilter, FaChevronDown, FaChevronLeft } from "react-icons/fa";
import { blogCategories } from "../../../utils/variables";

function BlogsIndex() {
  const { blogs, prevData, currentPage, pageSize } = useSelector((state) => {
    return state.blogs;
  });

  const { data, isFetching } = useGetBlogsQuery({
    page: currentPage,
    pageSize: pageSize,
  });
  const dispatch = useDispatch();

  const [filterNav, setFilterNav] = useState({
    isOpen: false,
    currentCategory: "All",
  });

  useEffect(() => {
    if (data) {
      if (!(JSON.stringify(prevData) === JSON.stringify(data))) {
        dispatch(addBlog(data));
        dispatch(setPrevData(data));
      }
    }
  }, [data, dispatch, prevData]);

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
    <>
      {filterNav.isOpen ? (
        <div className="border shadow-xl p-2 bg-slate-100 rounded-lg flex flex-col gap-2 absolute z-10 md:right-20 right-4 w-80 md:top-16 top-14 md:w-96">
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

      <div className="flex flex-wrap w-full justify-evenly gap-4 mt-4">
        {blogData.map((blog) => {
          return <Card key={blog.id} cardData={blog} />;
        })}
        {filterNav.currentCategory === "All" ? (
          <>
            {isFetching ? (
              <CardSkeleton times={pageSize} />
            ) : (
              <button onClick={handleAddMoreData}>Add more Data</button>
            )}
          </>
        ) : null}
      </div>
    </>
  );
}

export default BlogsIndex;
