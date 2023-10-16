import BlogsIndex from "./allBlogs";
import UserBlogs from "./userBlogs";
import TrendingBlogs from "./trendingBlogs";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import CreateBlog from "./createBlog";

const allBlogScreens = [
  { name: "all", element: <BlogsIndex /> },
  { name: "trending", element: <TrendingBlogs /> },
  { name: "your blogs", element: <UserBlogs /> },
];
function BlogScreen() {
  const [currentScreen, setCurrentScreen] = useState("all");
  return (
    <div className="w-full h-full flex flex-col px-4 ">
      <div className="flex md:justify-center justify-between items-center relative rounded-xl text-green-800 w-full bg-green-100">
        <ul className="p-4  gap-6 flex">
          {allBlogScreens.map((screen) => {
            return (
              <li
                key={screen.name}
                onClick={() => {
                  setCurrentScreen(screen.name);
                }}
                className={`uppercase border-b font-bold rounded sm:text-xl text-xs cursor-pointer ${
                  screen.name === currentScreen
                    ? " border-b-lime-800"
                    : " border-b-0"
                }`}
              >
                {screen.name}
              </li>
            );
          })}
        </ul>
        <div
          className="flex items-center md:text-xl text-xs  md:gap-4 gap-2 uppercase rounded-lg justify-center py-2 md:px-6 px-4 bg-blue-600 text-white absolute top-1/2 cursor-pointer -translate-y-1/2 md:right-16 right-2 hover:bg-blue-700 transition-all duration-200"
          onClick={() => setCurrentScreen("create")}
        >
          <FaPlus />
          create blog
        </div>
      </div>
      <div className="overflow-y-scroll relative grow" key={screen.name}>
        {allBlogScreens.map((screen) => {
          const newScreen =
            screen.name === currentScreen ? <>{screen.element}</> : null;
          return newScreen;
        })}
        {currentScreen === "create" ? <CreateBlog /> : null}
      </div>
    </div>
  );
}

export default BlogScreen;
