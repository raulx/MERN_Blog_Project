import { blogCategories } from "../../utils/variables";
import { useLazyGetBlogsQuery } from "../../store";
import Card from "../../components/card";
import CardSkeleton from "../../components/cardSkeleton";
import { useEffect, useState, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  FaFilter,
  FaChevronDown,
  FaChevronLeft,
  FaSpinner,
} from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

function AllBlogs() {
  const [nextPage, setNextPage] = useState(2);

  const [hasMore, setHasMore] = useState(true);

  const dropDowm = useRef();

  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "all";

  const encodedCategory = encodeURIComponent(category);

  const [blogs, setBlogs] = useState([]);

  const [getBlogs, { isLoading, isFetching }] = useLazyGetBlogsQuery();
  const [isOpen, setIsOpen] = useState(false);

  const pageLength = 12;

  const fetchMoreBlogs = async () => {
    try {
      const res = await getBlogs({
        page: nextPage,
        pageSize: pageLength,
        category: encodedCategory,
      });
      if (res.data) {
        setBlogs((prevValue) => [...prevValue, ...res.data.data]);
        setNextPage(nextPage + 1);

        if (res.data.data.length === 0) setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // fetch the initial blog data
  useEffect(() => {
    const fetchInitialBlogs = async () => {
      try {
        const res = await getBlogs({
          page: 1,
          pageSize: pageLength,
          category: encodedCategory,
        });
        if (res.data) {
          setBlogs(() => [...res.data.data]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchInitialBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  // eventlistener for dropdown component
  useEffect(() => {
    const handler = (event) => {
      if (isOpen && !dropDowm.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler, true);
    };
  }, [isOpen]);

  const handleCategoryChange = async (category) => {
    const params = new URLSearchParams(searchParams);
    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    setSearchParams(params);

    setIsOpen(!isOpen);

    setHasMore(true); // reset infinite-scroll-component
    setNextPage(2); // reset nextpage from start
  };

  return (
    <div className="flex flex-col sm:w-11/12 mx-auto gap-4 py-6 h-screen -z-10">
      {isOpen ? (
        <div
          ref={dropDowm}
          className="border shadow-xl p-2 bg-slate-100 rounded-lg flex flex-col gap-2 absolute z-10 md:right-20 right-4 w-80 md:w-96"
        >
          {blogCategories.map((d) => {
            return (
              <p
                className={`text-xl  w-full h-full cursor-pointer py-2 capitalize px-4 rounded-xl  ${
                  d.category === category
                    ? "bg-slate-600 text-white"
                    : "hover:bg-slate-500 hover:text-white"
                }`}
                key={d.id}
                onClick={() => handleCategoryChange(d.category)}
              >
                {d.category}
              </p>
            );
          })}
        </div>
      ) : null}

      <div className="flex justify-between items-center mt-6 md:mt-4">
        <h1 className="text-2xl text-gray-400 font-extrabold uppercase">
          Results
        </h1>

        <div
          className="flex md:gap-6 gap-0 items-center cursor-pointer mr-10 "
          onClick={() => {
            setIsOpen((prevValue) => {
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

          <div
            ref={dropDowm}
            className="h-full border-2 md:w-72 w-60 rounded py-2 px-4 md:text-lg text-base uppercase flex items-center justify-between"
          >
            <p>{category}</p>
            <div>{isOpen ? <FaChevronDown /> : <FaChevronLeft />}</div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-wrap gap-8 justify-between p-4">
          <CardSkeleton times={pageLength * (nextPage - 1)} />
        </div>
      ) : (
        <InfiniteScroll
          dataLength={blogs.length}
          next={fetchMoreBlogs}
          className="flex flex-wrap gap-8 justify-between items-center sm:px-0 px-4"
          hasMore={hasMore}
          endMessage={
            <p className="w-screen justify-center flex items-center">
              You have seen it all !
            </p>
          }
        >
          {blogs.map((blog, index) => {
            return (
              <Card
                key={index}
                cardData={blog}
                afterDelete={() => {
                  setBlogs((prevValue) => {
                    return prevValue.filter((b) => b._id != blog._id);
                  });
                }}
              />
            );
          })}
        </InfiniteScroll>
      )}

      {isFetching && (
        <div className="mx-auto py-2 text-center">
          <FaSpinner className="animate-spin" />
        </div>
      )}
    </div>
  );
}

export default AllBlogs;
