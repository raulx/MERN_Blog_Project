import BlogsIndex from "./allBlogs";
import CreateBlog from "./createBlog";
import { useState } from "react";

const allBlogScreens = [
  { name: "blogs", element: <BlogsIndex /> },
  { name: "create", element: <CreateBlog /> },
];
function BlogScreen() {
  const [currentScreen, setCurrentScreen] = useState("blogs");
  return (
    <div className="w-full h-full flex flex-col p-4 relative">
      <div className="flex justify-center items-center w-full">
        <ul className="p-4 flex gap-6">
          {allBlogScreens.map((screen) => {
            return (
              <li
                key={screen.name}
                onClick={() => {
                  setCurrentScreen(screen.name);
                }}
                className={`uppercase  border-b font-bold text-3xl cursor-pointer ${
                  screen.name === currentScreen ? " border-b-2" : " border-b-0"
                }`}
              >
                {screen.name}
              </li>
            );
          })}
        </ul>
      </div>
      {allBlogScreens.map((screen) => {
        const newScreen =
          screen.name === currentScreen ? <>{screen.element}</> : null;

        return newScreen;
      })}
    </div>
  );
}

export default BlogScreen;
