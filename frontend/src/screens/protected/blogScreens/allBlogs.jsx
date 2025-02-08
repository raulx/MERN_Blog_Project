// import { useSelector, useDispatch } from "react-redux";
// import { useGetBlogsQuery } from "../../../store";
// import { useState, useEffect, useRef } from "react";
// import { addBlog, setPrevData } from "../../../store";
// import Card from "../../../components/card";
// import CardSkeleton from "../../../components/cardSkeleton";
// import { FaFilter, FaChevronDown, FaChevronLeft } from "react-icons/fa";
import { blogCategories } from "../../../utils/variables";

import { useLazyGetBlogsQuery } from "../../../store";
import Card from "../../../components/card";
import CardSkeleton from "../../../components/cardSkeleton";
import { useEffect, useState, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { FaFilter, FaChevronDown, FaChevronLeft } from "react-icons/fa";

// function BlogsIndex() {
//   const { blogs, prevData, currentPage, pageSize } = useSelector((state) => {
//     return state.blogs;
//   });

//   const { data, isFetching } = useGetBlogsQuery({
//     page: currentPage,
//     pageSize: pageSize,
//   });
//   const dispatch = useDispatch();
//   const dropDowm = useRef();

//   const [filterNav, setFilterNav] = useState({
//     isOpen: false,
//     currentCategory: "all",
//   });

//   useEffect(() => {
//     const handler = (event) => {
//       if (filterNav.isOpen && !dropDowm.current.contains(event.target)) {
//         setFilterNav((prevValue) => {
//           return { ...prevValue, isOpen: false };
//         });
//       }
//     };
//     document.addEventListener("click", handler, true);

//     return () => {
//       document.removeEventListener("click", handler, true);
//     };
//   }, [filterNav.isOpen]);

//   useEffect(() => {
//     if (data) {
//       if (JSON.stringify(prevData) != JSON.stringify(data.data)) {
//         dispatch(addBlog(data.data));
//         dispatch(setPrevData(data.data));
//       }
//     }
//   }, [data, dispatch, prevData]);

//   let blogData = blogs;

//   if (filterNav.currentCategory != "all") {
//     blogData = blogData.filter((blog) => {
//       return blog.category === filterNav.currentCategory;
//     });
//   }

//   const handleClick = (e) => {
//     const categoryChoosen = e.target.innerText.toLowerCase();
//     setFilterNav((prevValue) => {
//       return {
//         ...prevValue,
//         currentCategory: categoryChoosen,
//         isOpen: !prevValue,
//       };
//     });
//   };

//   return (
//     <>
//       {filterNav.isOpen ? (
//         <div
//           ref={dropDowm}
//           className="border shadow-xl p-2 bg-slate-100 rounded-lg flex flex-col gap-2 absolute z-10 md:right-20 right-4 w-80 md:top-16 top-28 md:w-96"
//         >
//           {blogCategories.map((d) => {
//             return (
//               <p
//                 className={`text-xl  w-full h-full cursor-pointer py-2 capitalize px-4 rounded-xl  ${
//                   d.category === filterNav.currentCategory
//                     ? "bg-slate-600 text-white"
//                     : "hover:bg-slate-500 hover:text-white"
//                 }`}
//                 key={d.id}
//                 onClick={(e) => handleClick(e)}
//               >
//                 {d.category}
//               </p>
//             );
//           })}
//         </div>
//       ) : null}

//       <div className="flex justify-between items-center mt-6 md:mt-4">
//         <h1 className="text-2xl text-gray-400 font-extrabold uppercase">
//           Results
//         </h1>
//         <div
//           className="flex md:gap-6 gap-0 items-center cursor-pointer mr-10 "
//           onClick={() => {
//             setFilterNav((prevValue) => {
//               return { ...prevValue, isOpen: !prevValue.isOpen };
//             });
//           }}
//         >
//           <div className="flex gap-4 items-center p-2">
//             <p className="text-2xl hidden md:block text-gray-400 font-extrabold uppercase">
//               Sort By
//             </p>
//             <FaFilter className="text-2xl" />
//           </div>

//           <div
//             ref={dropDowm}
//             className="h-full border-2 md:w-72 w-60 rounded py-2 px-4 md:text-lg text-base uppercase flex items-center justify-between"
//           >
//             <p>{filterNav.currentCategory}</p>
//             <div>
//               {filterNav.isOpen ? <FaChevronDown /> : <FaChevronLeft />}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-wrap w-full justify-evenly gap-4  gap-y-16 mt-4">
//         {blogData.map((blog, index) => {
//           return <Card key={index} cardData={blog} />;
//         })}
//         {filterNav.currentCategory === "all" ? (
//           <>{isFetching ? <CardSkeleton times={pageSize} /> : null}</>
//         ) : null}
//       </div>
//     </>
//   );
// }

function AllBlogs() {
  const [nextPage, setNextPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const dropDowm = useRef();

  const [blogs, setBlogs] = useState([]);

  const [getBlogs, { isLoading }] = useLazyGetBlogsQuery();
  const [filterNav, setFilterNav] = useState({
    isOpen: false,
    currentCategory: "all",
  });

  const pageLength = 10;

  const fetchMoreBlogs = async () => {
    try {
      const res = await getBlogs({
        page: nextPage,
        pageSize: pageLength,
        category: filterNav.currentCategory,
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
          category: filterNav.currentCategory,
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
  }, []);

  useEffect(() => {
    const handler = (event) => {
      if (filterNav.isOpen && !dropDowm.current.contains(event.target)) {
        setFilterNav((prevValue) => {
          return { ...prevValue, isOpen: false };
        });
      }
    };

    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler, true);
    };
  }, [filterNav.isOpen]);

  const handleClick = async (e) => {
    const categoryChoosen = e.target.innerText.toLowerCase();

    setFilterNav((prevValue) => {
      return {
        ...prevValue,
        currentCategory: categoryChoosen,
        isOpen: !prevValue,
      };
    });

    try {
      const res = await getBlogs({
        page: 1,
        category: categoryChoosen,
        pageSize: pageLength,
      });
      console.log(res);

      if (res.data) {
        setBlogs(res.data.data);
        setHasMore(true);
        setNextPage(2);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col sm:w-11/12 mx-auto gap-4 py-6 h-screen -z-10">
      {filterNav.isOpen ? (
        <div
          ref={dropDowm}
          className="border shadow-xl p-2 bg-slate-100 rounded-lg flex flex-col gap-2 absolute z-10 md:right-20 right-4 w-80 md:w-96"
        >
          {blogCategories.map((d) => {
            return (
              <p
                className={`text-xl  w-full h-full cursor-pointer py-2 capitalize px-4 rounded-xl  ${
                  d.category === filterNav.currentCategory
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

      <div className="flex justify-between items-center mt-6 md:mt-4">
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

          <div
            ref={dropDowm}
            className="h-full border-2 md:w-72 w-60 rounded py-2 px-4 md:text-lg text-base uppercase flex items-center justify-between"
          >
            <p>{filterNav.currentCategory}</p>
            <div>
              {filterNav.isOpen ? <FaChevronDown /> : <FaChevronLeft />}
            </div>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="flex flex-wrap gap-8 justify-between p-4">
          <CardSkeleton times={pageLength} />
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
            return <Card key={index} cardData={blog} />;
          })}
        </InfiniteScroll>
      )}
    </div>
  );
}

export default AllBlogs;
