import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addPage } from "../../../store";
import { Link, Outlet } from "react-router-dom";

const allBlogScreens = [
  { name: "explore", url: "/content" },
  { name: "your blogs", url: "/content/blog/me" },
];

function BlogScreen() {
  const [currentScreen, setCurrentScreen] = useState("explore");
  const containerRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const container = containerRef.current;
    const handleScroll = () => {
      if (
        container.scrollHeight - container.scrollTop ===
        container.clientHeight
      ) {
        dispatch(addPage());
      }
    };
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch]);

  return (
    <div className="w-full h-full flex flex-col px-4">
      <div className="flex md:justify-center justify-between md:items-center relative  z-10  md:rounded-xl text-green-800 md:w-full w-custom  bg-green-100">
        <ul className="p-4 gap-6 flex">
          {allBlogScreens.map((screen) => {
            return (
              <Link
                key={screen.name}
                onClick={() => {
                  setCurrentScreen(screen.name);
                }}
                to={screen.url}
                className={`uppercase border-b font-bold rounded sm:text-xl text-xs cursor-pointer ${
                  screen.name === currentScreen
                    ? " border-b-lime-800"
                    : " border-b-0"
                }`}
              >
                {screen.name}
              </Link>
            );
          })}
        </ul>
        <Link
          className="flex items-center md:text-xl text-xs md:gap-4 gap-2 uppercase rounded-lg justify-center py-2 md:px-6 px-4 bg-blue-600 text-white absolute top-1/2 cursor-pointer -translate-y-1/2 md:right-16 right-2 hover:bg-blue-700 transition-all duration-200"
          onClick={() => setCurrentScreen("create")}
          to={"/content/blog/create"}
        >
          <FaPlus />
          create blog
        </Link>
      </div>
      <div
        className="overflow-y-scroll relative grow md:mt-0 h-[42rem]"
        ref={containerRef}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default BlogScreen;
